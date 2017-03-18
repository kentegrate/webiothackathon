const log = require('./log.js');

var ADC121 = function(i2cPort, slaveAddress){
    this.i2cPort = i2cPort;
    this.slaveAddress = slaveAddress;
};

module.exports = (i2cPort) => {
    var adc121 = new ADC121(i2cPort, 0x50);
    adc121.init().then(function(){
	log("init");
	setInterval(function(){
	    adc121.read().then(function(v){
		console.log("voltage: ", v);
	    });
	}, 1000);
    });
}
    

ADC121.prototype = {
    sleep: function(ms, generator){
	setTimeout(function(){generator.next()}, ms);
    },

    init: function(){
	var self = this;
	return new Promise(function(resolve, reject){
	    self.i2cPort.open(self.slaveAddress)
	    .then(function(i2cSlave){
		var thread = (function* (){
		    i2cSlave.write8(0x02, 0x20);
		    resolve();
		})();
		thread.next();
	    });
	});
    },

    read: function(){
	var self = this;
	return new Promise(function(resolve, reject){
	    self.i2cPort.open(self.slaveAddress)
		.then(function(i2cSlave){
		    var thread = (function* (){
			i2cSlave.write8(0x02, 0x20);
			yield self.sleep(10, thread);
			i2cSlave.read16(0x00).then(function(raw){
			    raw = raw & 0x0fff;
			    var voltage = raw * 0.00244140625;
			    resolve(voltage);
			}).catch(reject);
		    })();
		    thread.next();
		});
	});
    }

};
		     
	    
