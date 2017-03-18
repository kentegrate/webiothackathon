/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = (text) => {
	console.log(text);
	textarea.value += `${text}\n`;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const log = __webpack_require__(0);

module.exports = (gpio) => {
	const port2 = gpio.ports.get(193);
	port2.export('in').then(() => {
		console.log('port:', port2);
		port2.read().then((value) => {
			log(value);
		});
	});
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const log = __webpack_require__(0);

module.exports = (gpio) => {
	const buttonPort = gpio.ports.get(199);
	buttonPort.export('in').then(() => {
		buttonPort.onchange = function(state2) {
			log(state2 ? 'a' : 'b');
			document.body.style.backgroundColor = state2 ? 'blue' : 'white';
			state2 != state2;
		}
	});
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const log = __webpack_require__(0);

module.exports = (gpio) => {
	let state = false;
	const port = gpio.ports.get(244);
	port.export('out').then(() => {
		console.log('port:', port);
		port.write(1);
		document.body.style.backgroundColor = 'red';
		setInterval(() => {
			state = !state;
			port.write(state ? 1 : 0);
			log(state ? 'on' : 'off');
			document.body.style.backgroundColor = state ? 'red' : 'white';
		}, 1000);
	});
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const port244 = __webpack_require__(3)
const port193 = __webpack_require__(1)
const port199 = __webpack_require__(2)

const textarea = document.getElementById('textarea');

window.addEventListener('load', () => {
	navigator.requestGPIOAccess().then((gpio) => {
		console.log('gpio taken:', gpio);

		port244(gpio);
		port193(gpio);
		port199(gpio);
	});
});


/***/ })
/******/ ]);