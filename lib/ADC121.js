const log = require('./log.js');

var ADC121 = function(i2cPort, slaveAddress){
    this.i2cPort = i2cPort;
    this.slaveAddress = slaveAddress;
};

module.exports = (i2cPort) => {
    var adc121 = new ADC121(i2cPort, 0x50);
    return adc121.init().then(function(){
	log("init");
	setInterval(function(){
	    adc121.updateFilter();
	}, 50);
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
			var raw_v = ((v1 & 0x0f) << 8) | v2;
			var voltage = raw_v * 0.00244140625;
			self.filteredValue = factor * voltage + (1.0 - factor) * self.filteredValue;
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
		     
	    
