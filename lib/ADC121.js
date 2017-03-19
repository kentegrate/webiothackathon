const log = require('./log.js');

var ADC121 = function(i2cPort, slaveAddress){
    this.i2cPort = i2cPort;
    this.slaveAddress = slaveAddress;
    this.factor = 0.6
    this.filteredValue = 0;
};

module.exports = (i2cPort) => {
    var adc121 = new ADC121(i2cPort, 0x50);
    return adc121.init().then(function(){
	log("init");
	setInterval(function(){
	    adc121.updateFilter();
	}, 1000);
	return adc121;
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

    updateFilter: function(){
	var self = this;
	self.i2cPort.open(self.slaveAddress)
	    .then(function(i2cSlave){
		var thread = (function* (){
		    i2cSlave.write8(0x02, 0x20);
		    yield self.sleep(10, thread);
		    i2cSlave.read16(0x00).then(function(raw){
			var v1 = raw >> 8;
			var v2 = raw & 0xff;
			var raw_v1 = ((v1 & 0x0f) << 8) | v2;
			var voltage1 = raw_v1 / 40960.0

			var raw_v2 = ((v2 & 0x0f) << 8) | v1;
			var voltage2 = raw_v2 / 40960.0
			self.filteredValue = self.factor * voltage + (1.0 - self.factor) * self.filteredValue;
			console.log("raw value1: ", voltage1);
			console.log("raw value2: ", voltage2);
		    });
		})();
		thread.next();
	    });
    },
    read: function(){
	var self = this;
	return self.filteredValue;
    }

};
		     
	    
