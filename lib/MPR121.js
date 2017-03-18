const log = require('./log.js');

var MPR121 = function(i2cPort, slaveAddress, interval){
  this.i2cPort = i2cPort;
  this.slaveAddress = slaveAddress;
  this.interval = interval || 100;
  this.state = [false, false, false, false, false, false, false, false, false, false, false, false];
  this.device = false;
  this.timer = false;
};

module.exports = (i2cPort) => {
  var mpr121 = new MPR121(i2cPort, 0x5A);
  mpr121.init().then(() => {
    log("init mpr121");
  });
  setInterval(() => {
    for(let i = 0; i < 12; i++) {
      if(mpr121.isTouched(i)) {
        log(i.toString() + " pin is Touched");
      }
    }
  });
};

const MPR121_I2CADDR_DEFAULT = 0x5A,
  MPR121_TOUCHSTATUS_L   = 0x00,
  MPR121_TOUCHSTATUS_H   = 0x01,
  MPR121_FILTDATA_0L     = 0x04,
  MPR121_FILTDATA_0H     = 0x05,
  MPR121_BASELINE_0      = 0x1E,
  MPR121_MHDR            = 0x2B,
  MPR121_NHDR            = 0x2C,
  MPR121_NCLR            = 0x2D,
  MPR121_FDLR            = 0x2E,
  MPR121_MHDF            = 0x2F,
  MPR121_NHDF            = 0x30,
  MPR121_NCLF            = 0x31,
  MPR121_FDLF            = 0x32,
  MPR121_NHDT            = 0x33,
  MPR121_NCLT            = 0x34,
  MPR121_FDLT            = 0x35,
  MPR121_TOUCHTH_0       = 0x41,
  MPR121_RELEASETH_0     = 0x42,
  MPR121_DEBOUNCE        = 0x5B,
  MPR121_CONFIG1         = 0x5C,
  MPR121_CONFIG2         = 0x5D,
  MPR121_CHARGECURR_0    = 0x5F,
  MPR121_CHARGETIME_1    = 0x6C,
  MPR121_ECR             = 0x5E,
  MPR121_AUTOCONFIG0     = 0x7B,
  MPR121_AUTOCONFIG1     = 0x7C,
  MPR121_UPLIMIT         = 0x7D,
  MPR121_LOWLIMIT        = 0x7E,
  MPR121_TARGETLIMIT     = 0x7F,
  MPR121_GPIODIR         = 0x76,
  MPR121_GPIOEN          = 0x77,
  MPR121_GPIOSET         = 0x78,
  MPR121_GPIOCLR         = 0x79,
  MPR121_GPIOTOGGLE      = 0x7A,
  MPR121_SOFTRESET       = 0x80;



MPR121.prototype = {
  sleep: function(ms, generator) {
    setTimeout(function(){generator.next()}, ms);
  },
  configure: function(i2cSlave) {
    var self = this;

    return self.setThresholds(12, 6, i2cSlave)
      .then(() => i2cSlave.write8(MPR121_MHDR, 0x01))
      .then(() => i2cSlave.write8(MPR121_NHDR, 0x01))
      .then(() => i2cSlave.write8(MPR121_NCLR, 0x0E))
      .then(() => i2cSlave.write8(MPR121_FDLR, 0x00))
      .then(() => i2cSlave.write8(MPR121_MHDF, 0x01))
      .then(() => i2cSlave.write8(MPR121_NHDF, 0x05))
      .then(() => i2cSlave.write8(MPR121_NCLF, 0x01))
      .then(() => i2cSlave.write8(MPR121_FDLF, 0x00))
      .then(() => i2cSlave.write8(MPR121_NHDT, 0x00))
      .then(() => i2cSlave.write8(MPR121_NCLT, 0x00))
      .then(() => i2cSlave.write8(MPR121_FDLT, 0x00))
      .then(() => i2cSlave.write8(MPR121_DEBOUNCE, 0))
      .then(() => i2cSlave.write8(MPR121_CONFIG1, 0x10)) // default, 16uA charge current
      .then(() => i2cSlave.write8(MPR121_CONFIG2, 0x20)) // 0.5uS encoding, 1ms period
      .then(() => {
        this.ready = true;
        log('MPR121 ready');
      });
  },

  init: function() {
    var self = this;

    return new Promise(function(resolve, reject) {
      self.i2cPort.open(self.slaveAddress)
        .then(function(i2cSlave) {
          var thread = (function * () {
            i2cSlave.write8(MPR121_SOFTRESET, 0x63);
            yield self.sleep(10, thread);
            i2cSlave.write8(MPR121_ECR, 0x00);
            yield self.sleep(10, thread);
            self.configure(i2cSlave)
            .then(self.startPolling);
          })();
          thread.next();
        });
    });
  },

  setThresholds: function(touch, release, i2cSlave) { 
    if(touch < 0 || touch > 255) return Promise.reject();
    if(release < 0 || release > 255) return Promise.reject();

    let promises = [];

    for(let i = 0; i<=12; i++) {
      promises.push(i2cSlave.write8(MPR121_TOUCHTH_0 + 2 * i, touch));
      promises.push(i2cSlave.write8(MPR121_RELEASETH_0 + 2 * i, release));
    }

    return Promise.all(promises); //微妙...
  },

  startPolling: function() {
    //if(! self.ready) return self.on('ready', self.startPolling); //わからん
    if(! self.interval) return; 

    self.timer = setInterval(() => {
      self.touched().then(self.updateState());
    }, self.interval);
  },

  stopPolling: function() {
    var self = this;

    if(! self.interval) return; 
    clearInterval(self.timer);
    this.timer = false;
  },

  touched: function() {
    return self.read16(MPR121_TOUCHSTATUS_L).then((v) => Promise.resolve(v & 0x0FFF)); 
  },

  isTouched: function(pin) {
    var self = this;
    if(! self.ready) return false;
    if(pin < 0 || pin >= 12) return false;

    return self.state[pin];
  },

  updateState: function(touched) {
    var self = this;
    self.state.forEach((previous, i) => {
      const current = (touched & ( 1 << i)) > 0;
      if(previous === current) return;
      this.state[i] = current;

      if(current) {
        console.log('touch: '+i.toString());
      } else {
        console.log('release: '+i.toString());
      }
      console.log(i.toString()+current.toString());
    });
  },

 baselineData: function(pin) {
   if(pin < 0 || pin >= 12) return Promise.reject();
   return self.read8(MPR121_BASELINE_0 + pin)
    .then((bl) => {
      return Promise.resolve(bl << 2);
    });
 } 
};
