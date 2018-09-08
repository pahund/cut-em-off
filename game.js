/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bomb/Bombs.js":
/*!***************************!*\
  !*** ./src/bomb/Bombs.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pubsub */ "./src/pubsub/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/bomb/constants.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! . */ "./src/bomb/index.js");




/* harmony default export */ __webpack_exports__["default"] = (class {
    constructor(map) {
        this.map = map;
        this.bombs = [];
        _pubsub__WEBPACK_IMPORTED_MODULE_0__["pubsub"].subscribe(_pubsub__WEBPACK_IMPORTED_MODULE_0__["DROP_BOMB"], mapCoords => this.dropBomb(mapCoords));
    }
    dropBomb(mapCoords) {
        this.bombs.push(Object(___WEBPACK_IMPORTED_MODULE_2__["createBomb"])(this.map, mapCoords));
    }
    update() {
        this.bombs = this.bombs.filter(bomb => {
            bomb.update();
            return bomb.status !== _constants__WEBPACK_IMPORTED_MODULE_1__["EXPLODED"];
        });
    }
    render() {
        this.bombs.forEach(bomb => bomb.render());
    }
});


/***/ }),

/***/ "./src/bomb/constants.js":
/*!*******************************!*\
  !*** ./src/bomb/constants.js ***!
  \*******************************/
/*! exports provided: FUSE_BURNING, EXPLODING, EXPLODED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FUSE_BURNING", function() { return FUSE_BURNING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPLODING", function() { return EXPLODING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPLODED", function() { return EXPLODED; });
const FUSE_BURNING = 0;
const EXPLODING = 1;
const EXPLODED = 2;


/***/ }),

/***/ "./src/bomb/createBomb.js":
/*!********************************!*\
  !*** ./src/bomb/createBomb.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! . */ "./src/bomb/index.js");
/* global kontra */






/* harmony default export */ __webpack_exports__["default"] = ((map, { row, col }) => {
    const { x, y } = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["transformMapCoordinates"])(map, { row, col });
    return kontra.sprite({
        x,
        y,
        collisionRadius: _config__WEBPACK_IMPORTED_MODULE_0__["collisionRadius"],
        fuseLength: 100,
        status: ___WEBPACK_IMPORTED_MODULE_2__["FUSE_BURNING"],
        shrapnel: [],
        explosionDuration: 0,
        map,
        mapX: (col - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"],
        mapY: (row - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"],
        row,
        col,
        update() {
            ({
                status: this.status,
                fuseLength: this.fuseLength,
                explosionDuration: this.explosionDuration,
                x: this.x,
                y: this.y
            } = Object(___WEBPACK_IMPORTED_MODULE_2__["updateBomb"])(this));
        },
        render() {
            Object(___WEBPACK_IMPORTED_MODULE_2__["drawBomb"])(this);
        }
    });
});


/***/ }),

/***/ "./src/bomb/createShrapnel.js":
/*!************************************!*\
  !*** ./src/bomb/createShrapnel.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! . */ "./src/bomb/index.js");
/* global kontra */




/* harmony default export */ __webpack_exports__["default"] = (({ x, y }) => {
    const dir = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInt"])(0, 360);
    const speed = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInt"])(5, 15);
    return kontra.sprite({
        x,
        y,
        dx: Math.cos(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(dir)) * speed,
        dy: Math.sin(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(dir)) * speed,
        rotation: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInt"])(0, 360),
        rotationDir: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInt"])(-10, -1), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInt"])(1, 10)][Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInt"])(0, 1)],
        update() {
            this.advance();
            this.rotation += this.rotationDir;
        },
        render() {
            Object(___WEBPACK_IMPORTED_MODULE_1__["drawShrapnel"])(this);
        }
    });
});


/***/ }),

/***/ "./src/bomb/drawBomb.js":
/*!******************************!*\
  !*** ./src/bomb/drawBomb.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/bomb/constants.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! . */ "./src/bomb/index.js");



/* harmony default export */ __webpack_exports__["default"] = (sprite => {
    const { status, shrapnel } = sprite;
    switch (status) {
        case _constants__WEBPACK_IMPORTED_MODULE_0__["FUSE_BURNING"]:
            Object(___WEBPACK_IMPORTED_MODULE_1__["drawBombWithFuse"])(sprite);
            break;
        case _constants__WEBPACK_IMPORTED_MODULE_0__["EXPLODING"]:
            shrapnel.forEach(s => s.render());
            break;
        default:
    }
});


/***/ }),

/***/ "./src/bomb/drawBombWithFuse.js":
/*!**************************************!*\
  !*** ./src/bomb/drawBombWithFuse.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");




/* harmony default export */ __webpack_exports__["default"] = (sprite => {
    const { context: ctx, x, y, fuseLength } = sprite;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(-45));

    ctx.lineWidth = 3;
    ctx.strokeStyle = _config__WEBPACK_IMPORTED_MODULE_0__["lightBlue"];
    ctx.fillStyle = _config__WEBPACK_IMPORTED_MODULE_0__["darkBlue"];

    /* bomb */
    ctx.beginPath();
    ctx.moveTo(23, -10);
    ctx.lineTo(40, -10);
    ctx.lineTo(40, 10);
    ctx.lineTo(23, 10);
    ctx.arc(0, 0, 25, Object(_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(19), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(341));
    ctx.fill();
    ctx.stroke();

    /* fuse */
    const fuseRad = 25; // radius of the fuse arc
    const fuseDeg = (fuseLength / 100) * 90; // length of the fuse arc in degrees
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.arc(40, 25, fuseRad, Object(_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(270), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(270 + fuseDeg));
    ctx.stroke();

    /* sparks */
    const sparkCX = Math.cos(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(fuseDeg - 90)) * fuseRad + 40; // X-coord of sparks center
    const sparkCY = Math.sin(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(fuseDeg - 90)) * fuseRad + 25; // Y-coord of sparks centers
    const sparkRad = 15; // radius of the sparks circle
    ctx.fillStyle = _config__WEBPACK_IMPORTED_MODULE_0__["lightRed"];
    for (let i = 0; i < 10; i++) {
        const sparkX = Math.cos(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(0, 360))) * Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(0, sparkRad) + sparkCX;
        const sparkY = Math.sin(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(0, 360))) * Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(0, sparkRad) + sparkCY;
        ctx.fillRect(sparkX - 1, sparkY - 1, 3, 3);
    }

    ctx.restore();
});


/***/ }),

/***/ "./src/bomb/drawShrapnel.js":
/*!**********************************!*\
  !*** ./src/bomb/drawShrapnel.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");



/* harmony default export */ __webpack_exports__["default"] = (sprite => {
    const { context: ctx, x, y, rotation } = sprite;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(rotation));
    ctx.lineWidth = 3;
    ctx.strokeStyle = _config__WEBPACK_IMPORTED_MODULE_0__["lightBlue"];
    ctx.fillStyle = _config__WEBPACK_IMPORTED_MODULE_0__["darkBlue"];
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(10, 5);
    ctx.lineTo(-10, 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
});


/***/ }),

/***/ "./src/bomb/index.js":
/*!***************************!*\
  !*** ./src/bomb/index.js ***!
  \***************************/
/*! exports provided: createBomb, drawBomb, drawBombWithFuse, updateBomb, drawShrapnel, createShrapnel, Bombs, FUSE_BURNING, EXPLODING, EXPLODED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createBomb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createBomb */ "./src/bomb/createBomb.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createBomb", function() { return _createBomb__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _drawBomb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawBomb */ "./src/bomb/drawBomb.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawBomb", function() { return _drawBomb__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _drawBombWithFuse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawBombWithFuse */ "./src/bomb/drawBombWithFuse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawBombWithFuse", function() { return _drawBombWithFuse__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _updateBomb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateBomb */ "./src/bomb/updateBomb.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateBomb", function() { return _updateBomb__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _drawShrapnel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./drawShrapnel */ "./src/bomb/drawShrapnel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawShrapnel", function() { return _drawShrapnel__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _createShrapnel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createShrapnel */ "./src/bomb/createShrapnel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createShrapnel", function() { return _createShrapnel__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Bombs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Bombs */ "./src/bomb/Bombs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bombs", function() { return _Bombs__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constants */ "./src/bomb/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FUSE_BURNING", function() { return _constants__WEBPACK_IMPORTED_MODULE_7__["FUSE_BURNING"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EXPLODING", function() { return _constants__WEBPACK_IMPORTED_MODULE_7__["EXPLODING"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EXPLODED", function() { return _constants__WEBPACK_IMPORTED_MODULE_7__["EXPLODED"]; });











/***/ }),

/***/ "./src/bomb/updateBomb.js":
/*!********************************!*\
  !*** ./src/bomb/updateBomb.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/bomb/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* global kontra */






/* harmony default export */ __webpack_exports__["default"] = (sprite => {
    let { status, fuseLength, explosionDuration, x, y } = sprite;
    const { shrapnel, map, mapX, mapY, row, col } = sprite;

    ({ x, y } = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["transformMapCoordinates"])(map, { x: mapX, y: mapY }));
    switch (status) {
        case ___WEBPACK_IMPORTED_MODULE_0__["FUSE_BURNING"]:
            fuseLength -= 1;
            if (fuseLength < 0) {
                status = ___WEBPACK_IMPORTED_MODULE_0__["EXPLODING"];
                for (let i = 0; i < 50; i++) {
                    shrapnel.push(Object(___WEBPACK_IMPORTED_MODULE_0__["createShrapnel"])({ x, y }));
                }
                const tile = map.tileAtLayer('main', { row: row + _config__WEBPACK_IMPORTED_MODULE_2__["mapPaddingY"] - 1, col: col + _config__WEBPACK_IMPORTED_MODULE_2__["mapPaddingX"] - 1 });
                map.changeTile('main', { row: row + _config__WEBPACK_IMPORTED_MODULE_2__["mapPaddingY"], col: col + _config__WEBPACK_IMPORTED_MODULE_2__["mapPaddingX"] }, tile + 24);
            }
            break;
        case ___WEBPACK_IMPORTED_MODULE_0__["EXPLODING"]:
            shrapnel.forEach(s => s.update());
            explosionDuration++;
            if (explosionDuration === 200) {
                status = ___WEBPACK_IMPORTED_MODULE_0__["EXPLODED"];
            }
            break;
        default:
    }
    return {
        status,
        fuseLength,
        explosionDuration,
        x,
        y
    };
});


/***/ }),

/***/ "./src/canvas/createCanvas.js":
/*!************************************!*\
  !*** ./src/canvas/createCanvas.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");


/* harmony default export */ __webpack_exports__["default"] = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = _config__WEBPACK_IMPORTED_MODULE_0__["canvasWidth"];
    canvas.height = _config__WEBPACK_IMPORTED_MODULE_0__["canvasHeight"];
    canvas.style.cssText = `
        border: 4px solid ${_config__WEBPACK_IMPORTED_MODULE_0__["lightBlue"]};
    `;
    const wrapper = document.getElementById('wrapper');
    wrapper.appendChild(canvas);
});


/***/ }),

/***/ "./src/canvas/index.js":
/*!*****************************!*\
  !*** ./src/canvas/index.js ***!
  \*****************************/
/*! exports provided: createCanvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createCanvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createCanvas */ "./src/canvas/createCanvas.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createCanvas", function() { return _createCanvas__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: canvasWidth, canvasHeight, tileWidth, tileHeight, mapWidth, mapHeight, mapPaddingX, mapPaddingY, playerStartCol, playerStartRow, playerStartDirection, playerSpeed, virusStartCol, virusStartRow, virusStartDirection, virusSpeed, lightGreen, darkGreen, lightBlue, darkBlue, lightRed, darkRed, collisionRadius, bombCooldown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasWidth", function() { return canvasWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasHeight", function() { return canvasHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tileWidth", function() { return tileWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tileHeight", function() { return tileHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapWidth", function() { return mapWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapHeight", function() { return mapHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapPaddingX", function() { return mapPaddingX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapPaddingY", function() { return mapPaddingY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerStartCol", function() { return playerStartCol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerStartRow", function() { return playerStartRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerStartDirection", function() { return playerStartDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerSpeed", function() { return playerSpeed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "virusStartCol", function() { return virusStartCol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "virusStartRow", function() { return virusStartRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "virusStartDirection", function() { return virusStartDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "virusSpeed", function() { return virusSpeed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightGreen", function() { return lightGreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darkGreen", function() { return darkGreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightBlue", function() { return lightBlue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darkBlue", function() { return darkBlue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightRed", function() { return lightRed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darkRed", function() { return darkRed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collisionRadius", function() { return collisionRadius; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bombCooldown", function() { return bombCooldown; });
/* harmony import */ var _directions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./directions */ "./src/directions/index.js");


const canvasWidth = 800;
const canvasHeight = 600;

/* map */
const tileWidth = 100;
const tileHeight = 100;
const mapWidth = 20;
const mapHeight = 20;
const mapPaddingX = 4;
const mapPaddingY = 3;

/* player */
const playerStartCol = 5;
const playerStartRow = 6;
const playerStartDirection = _directions__WEBPACK_IMPORTED_MODULE_0__["N"];
const playerSpeed = 5;

/* virus */
const virusStartCol = 5;
const virusStartRow = 4;
const virusStartDirection = _directions__WEBPACK_IMPORTED_MODULE_0__["W"];
const virusSpeed = 2.5;

/* colors */
const lightGreen = '#75a042';
const darkGreen = '#365b1d';
const lightBlue = '#52638a';
const darkBlue = '#2b3653';
const lightRed = '#cd3926';
const darkRed = '#7a2431';

const collisionRadius = 30;
const bombCooldown = 500;


/***/ }),

/***/ "./src/devbox/createDevbox.js":
/*!************************************!*\
  !*** ./src/devbox/createDevbox.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (() => {
    const div = document.createElement('div');
    div.style.cssText = `
            position: absolute;
            left: 0;
            bottom: 0;
            padding: 5px;
            color: lime;
            width: 100vw;
            background-color: black;
            font-family: monospace;
        `;
    document.body.appendChild(div);
    window.devbox = div;
});


/***/ }),

/***/ "./src/directions/constants.js":
/*!*************************************!*\
  !*** ./src/directions/constants.js ***!
  \*************************************/
/*! exports provided: N, E, S, W */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return N; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return E; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "W", function() { return W; });
const N = 'N';
const E = 'E';
const S = 'S';
const W = 'W';


/***/ }),

/***/ "./src/directions/directionIsAllowed.js":
/*!**********************************************!*\
  !*** ./src/directions/directionIsAllowed.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/directions/index.js");


/* harmony default export */ __webpack_exports__["default"] = ((map, { x, y }, direction) => {
    const tile = map.tileAtLayer('main', { x, y });
    if (!Object(___WEBPACK_IMPORTED_MODULE_0__["isValidTile"])(tile) || !___WEBPACK_IMPORTED_MODULE_0__["directionSwitchMap"][tile].allowed.includes(direction)) {
        return false;
    }
    const nextTile = Object(___WEBPACK_IMPORTED_MODULE_0__["getNextTile"])(map, { x, y }, direction);
    return Object(___WEBPACK_IMPORTED_MODULE_0__["isValidTile"])(nextTile);
});


/***/ }),

/***/ "./src/directions/directionSwitchMap.js":
/*!**********************************************!*\
  !*** ./src/directions/directionSwitchMap.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/directions/index.js");


/* harmony default export */ __webpack_exports__["default"] = ({
    // curve from S to E
    1: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["S"], ___WEBPACK_IMPORTED_MODULE_0__["E"]],
        change: {
            [___WEBPACK_IMPORTED_MODULE_0__["N"]]: ___WEBPACK_IMPORTED_MODULE_0__["E"],
            [___WEBPACK_IMPORTED_MODULE_0__["W"]]: ___WEBPACK_IMPORTED_MODULE_0__["S"]
        }
    },
    // curve from W to S
    2: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["W"], ___WEBPACK_IMPORTED_MODULE_0__["S"]],
        change: {
            [___WEBPACK_IMPORTED_MODULE_0__["N"]]: ___WEBPACK_IMPORTED_MODULE_0__["W"],
            [___WEBPACK_IMPORTED_MODULE_0__["E"]]: ___WEBPACK_IMPORTED_MODULE_0__["S"]
        }
    },
    // straight from N to S
    3: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["N"], ___WEBPACK_IMPORTED_MODULE_0__["S"]],
        change: {}
    },
    // T section W, N, E
    4: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["W"], ___WEBPACK_IMPORTED_MODULE_0__["N"], ___WEBPACK_IMPORTED_MODULE_0__["E"]],
        change: {
            [___WEBPACK_IMPORTED_MODULE_0__["S"]]: ___WEBPACK_IMPORTED_MODULE_0__["N"]
        }
    },
    // T section N, E, S
    5: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["N"], ___WEBPACK_IMPORTED_MODULE_0__["E"], ___WEBPACK_IMPORTED_MODULE_0__["S"]],
        change: {
            [___WEBPACK_IMPORTED_MODULE_0__["W"]]: ___WEBPACK_IMPORTED_MODULE_0__["E"]
        }
    },
    // T section W, E, S
    6: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["W"], ___WEBPACK_IMPORTED_MODULE_0__["E"], ___WEBPACK_IMPORTED_MODULE_0__["S"]],
        change: {
            [___WEBPACK_IMPORTED_MODULE_0__["N"]]: ___WEBPACK_IMPORTED_MODULE_0__["S"]
        }
    },
    // curve from N to E
    9: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["N"], ___WEBPACK_IMPORTED_MODULE_0__["E"]],
        change: {
            [___WEBPACK_IMPORTED_MODULE_0__["S"]]: ___WEBPACK_IMPORTED_MODULE_0__["E"],
            [___WEBPACK_IMPORTED_MODULE_0__["W"]]: ___WEBPACK_IMPORTED_MODULE_0__["N"]
        }
    },
    // curve from W to N
    10: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["W"], ___WEBPACK_IMPORTED_MODULE_0__["N"]],
        change: {
            [___WEBPACK_IMPORTED_MODULE_0__["E"]]: ___WEBPACK_IMPORTED_MODULE_0__["N"],
            [___WEBPACK_IMPORTED_MODULE_0__["S"]]: ___WEBPACK_IMPORTED_MODULE_0__["W"]
        }
    },
    // straight from W to E
    11: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["W"], ___WEBPACK_IMPORTED_MODULE_0__["E"]],
        change: {}
    },
    // crossing
    12: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["N"], ___WEBPACK_IMPORTED_MODULE_0__["E"], ___WEBPACK_IMPORTED_MODULE_0__["S"], ___WEBPACK_IMPORTED_MODULE_0__["W"]],
        change: {}
    },
    // T section N, S, W
    13: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["N"], ___WEBPACK_IMPORTED_MODULE_0__["S"], ___WEBPACK_IMPORTED_MODULE_0__["W"]],
        change: {
            [___WEBPACK_IMPORTED_MODULE_0__["E"]]: ___WEBPACK_IMPORTED_MODULE_0__["W"]
        }
    },
    // server
    14: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["N"], ___WEBPACK_IMPORTED_MODULE_0__["S"]],
        change: {}
    },
    // terminus S
    17: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["S"]],
        change: {
            [___WEBPACK_IMPORTED_MODULE_0__["N"]]: ___WEBPACK_IMPORTED_MODULE_0__["S"]
        }
    },
    // terminus W
    18: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["W"]],
        change: {
            [___WEBPACK_IMPORTED_MODULE_0__["E"]]: ___WEBPACK_IMPORTED_MODULE_0__["W"]
        }
    },
    // terminus N
    19: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["N"]],
        change: {
            [___WEBPACK_IMPORTED_MODULE_0__["S"]]: ___WEBPACK_IMPORTED_MODULE_0__["N"]
        }
    },
    // terminus E
    20: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["E"]],
        change: {
            [___WEBPACK_IMPORTED_MODULE_0__["W"]]: ___WEBPACK_IMPORTED_MODULE_0__["E"]
        }
    },
    // broken server
    38: {
        allowed: [___WEBPACK_IMPORTED_MODULE_0__["N"], ___WEBPACK_IMPORTED_MODULE_0__["S"]],
        change: {}
    }
});


/***/ }),

/***/ "./src/directions/getNextTile.js":
/*!***************************************!*\
  !*** ./src/directions/getNextTile.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/directions/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./src/config.js");



/* harmony default export */ __webpack_exports__["default"] = ((map, { x, y }, direction) =>
    map.tileAtLayer('main', {
        x: direction === ___WEBPACK_IMPORTED_MODULE_0__["E"] ? x + _config__WEBPACK_IMPORTED_MODULE_1__["tileWidth"] : direction === ___WEBPACK_IMPORTED_MODULE_0__["W"] ? x - _config__WEBPACK_IMPORTED_MODULE_1__["tileWidth"] : x,
        y: direction === ___WEBPACK_IMPORTED_MODULE_0__["N"] ? y - _config__WEBPACK_IMPORTED_MODULE_1__["tileHeight"] : direction === ___WEBPACK_IMPORTED_MODULE_0__["S"] ? y + _config__WEBPACK_IMPORTED_MODULE_1__["tileHeight"] : y
    }));


/***/ }),

/***/ "./src/directions/getOppositeDirection.js":
/*!************************************************!*\
  !*** ./src/directions/getOppositeDirection.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/directions/index.js");


/* harmony default export */ __webpack_exports__["default"] = (direction => {
    switch (direction) {
        case ___WEBPACK_IMPORTED_MODULE_0__["N"]:
            return ___WEBPACK_IMPORTED_MODULE_0__["S"];
        case ___WEBPACK_IMPORTED_MODULE_0__["E"]:
            return ___WEBPACK_IMPORTED_MODULE_0__["W"];
        case ___WEBPACK_IMPORTED_MODULE_0__["S"]:
            return ___WEBPACK_IMPORTED_MODULE_0__["N"];
        case ___WEBPACK_IMPORTED_MODULE_0__["W"]:
            return ___WEBPACK_IMPORTED_MODULE_0__["W"];
        default:
            return null;
    }
});


/***/ }),

/***/ "./src/directions/index.js":
/*!*********************************!*\
  !*** ./src/directions/index.js ***!
  \*********************************/
/*! exports provided: directionIsAllowed, switchDirection, directionSwitchMap, isIntersection, getOppositeDirection, getNextTile, isValidTile, N, E, S, W */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/directions/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "N", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["N"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "E", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["E"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "S", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["S"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "W", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["W"]; });

/* harmony import */ var _directionIsAllowed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./directionIsAllowed */ "./src/directions/directionIsAllowed.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "directionIsAllowed", function() { return _directionIsAllowed__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _switchDirection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./switchDirection */ "./src/directions/switchDirection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "switchDirection", function() { return _switchDirection__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _directionSwitchMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directionSwitchMap */ "./src/directions/directionSwitchMap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "directionSwitchMap", function() { return _directionSwitchMap__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _isIntersection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isIntersection */ "./src/directions/isIntersection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isIntersection", function() { return _isIntersection__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _getOppositeDirection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getOppositeDirection */ "./src/directions/getOppositeDirection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOppositeDirection", function() { return _getOppositeDirection__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _getNextTile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getNextTile */ "./src/directions/getNextTile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getNextTile", function() { return _getNextTile__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _isValidTile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./isValidTile */ "./src/directions/isValidTile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isValidTile", function() { return _isValidTile__WEBPACK_IMPORTED_MODULE_7__["default"]; });











/***/ }),

/***/ "./src/directions/isIntersection.js":
/*!******************************************!*\
  !*** ./src/directions/isIntersection.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/directions/index.js");


const intersectionTiles = [];
for (const [tile, { allowed }] of Object.entries(_index__WEBPACK_IMPORTED_MODULE_0__["directionSwitchMap"])) {
    if (allowed.length > 2) {
        intersectionTiles.push(Number(tile));
    }
}

/* harmony default export */ __webpack_exports__["default"] = (tile => intersectionTiles.includes(tile));


/***/ }),

/***/ "./src/directions/isValidTile.js":
/*!***************************************!*\
  !*** ./src/directions/isValidTile.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (tile => tile < 25 || (tile > 30 && tile < 33) || (tile > 37 && tile < 41) || tile > 44);


/***/ }),

/***/ "./src/directions/switchDirection.js":
/*!*******************************************!*\
  !*** ./src/directions/switchDirection.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/directions/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");



/* harmony default export */ __webpack_exports__["default"] = ((map, { x, y }, curr) => {
    const tile = map.tileAtLayer('main', { x, y });
    /* player accidentally stepped onto a broken conduit tile */
    if (!Object(___WEBPACK_IMPORTED_MODULE_0__["isValidTile"])(tile)) {
        throw new Error('dropped');
    }
    const nextDirection = ___WEBPACK_IMPORTED_MODULE_0__["directionSwitchMap"][tile].change[curr] || curr;
    if (Object(___WEBPACK_IMPORTED_MODULE_0__["directionIsAllowed"])(map, { x, y }, nextDirection)) {
        return nextDirection;
    }
    const otherDirections = ___WEBPACK_IMPORTED_MODULE_0__["directionSwitchMap"][tile].allowed.filter(dir => Object(___WEBPACK_IMPORTED_MODULE_0__["directionIsAllowed"])(map, { x, y }, dir));
    switch (otherDirections.length) {
        case 0:
            /* oh no, player locked themselves in! */
            throw new Error('locked in');
        case 1:
            return otherDirections[0];
        default:
            return otherDirections[Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(0, otherDirections.length - 1)];
    }
});


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ "./src/canvas/index.js");
/* harmony import */ var _loop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loop */ "./src/loop/index.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map */ "./src/map/index.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ "./src/player/index.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user */ "./src/user/index.js");
/* harmony import */ var _virus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./virus */ "./src/virus/index.js");
/* harmony import */ var _bomb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bomb */ "./src/bomb/index.js");
/* global kontra */









if (true) {
    __webpack_require__(/*! ./devbox/createDevbox */ "./src/devbox/createDevbox.js").default();
}

(async () => {
    Object(_canvas__WEBPACK_IMPORTED_MODULE_0__["createCanvas"])();
    kontra.init();
    const map = await Object(_map__WEBPACK_IMPORTED_MODULE_2__["createMap"])();
    const player = Object(_player__WEBPACK_IMPORTED_MODULE_3__["createPlayer"])(map);
    const virus = Object(_virus__WEBPACK_IMPORTED_MODULE_5__["createVirus"])(map);
    const bombs = new _bomb__WEBPACK_IMPORTED_MODULE_6__["Bombs"](map);
    const users = new _user__WEBPACK_IMPORTED_MODULE_4__["Users"](map);
    const loop = Object(_loop__WEBPACK_IMPORTED_MODULE_1__["createLoop"])({ map, player, virus, users, bombs });
    loop.start();
})();


/***/ }),

/***/ "./src/loop/createLoop.js":
/*!********************************!*\
  !*** ./src/loop/createLoop.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/loop/utils/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pubsub */ "./src/pubsub/index.js");
/* global kontra */





/* harmony default export */ __webpack_exports__["default"] = (({ map, player, virus, users, bombs }) => {
    const times = [];
    let fps;
    let shipMoving = true;
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["pubsub"].subscribe(_pubsub__WEBPACK_IMPORTED_MODULE_2__["DROP_SHIP"], () => (shipMoving = false));

    return kontra.gameLoop({
        update() {
            virus.update();
            player.update();
            player.infect(virus);
            if (shipMoving) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_0__["moveCamera"])(map, player.direction);
            }
            users.update();
            users.infect([virus]);
            bombs.update();
        },
        render() {
            map.render();
            users.render();
            bombs.render();
            player.render();
            virus.render();
            if (true) {
                const now = performance.now();
                while (times.length > 0 && times[0] <= now - 1000) {
                    times.shift();
                }
                times.push(now);
                fps = times.length;
                const { row, col } = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["calculateRowAndCol"])(map);

                // eslint-disable-next-line no-param-reassign
                window.devbox.innerHTML = `${fps} fps – sx=${map.sx}, sy=${map.sy}, row=${row}, col=${col}`;
            }
        }
    });
});


/***/ }),

/***/ "./src/loop/index.js":
/*!***************************!*\
  !*** ./src/loop/index.js ***!
  \***************************/
/*! exports provided: createLoop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLoop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createLoop */ "./src/loop/createLoop.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createLoop", function() { return _createLoop__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/loop/utils/index.js":
/*!*********************************!*\
  !*** ./src/loop/utils/index.js ***!
  \*********************************/
/*! exports provided: moveCamera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moveCamera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moveCamera */ "./src/loop/utils/moveCamera.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "moveCamera", function() { return _moveCamera__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/loop/utils/moveCamera.js":
/*!**************************************!*\
  !*** ./src/loop/utils/moveCamera.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ "./src/config.js");
/* harmony import */ var _directions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../directions */ "./src/directions/index.js");



/* harmony default export */ __webpack_exports__["default"] = ((map, direction) => {
    switch (direction) {
        case _directions__WEBPACK_IMPORTED_MODULE_1__["N"]:
            // eslint-disable-next-line no-param-reassign
            map.sy -= _config__WEBPACK_IMPORTED_MODULE_0__["playerSpeed"];
            break;
        case _directions__WEBPACK_IMPORTED_MODULE_1__["E"]:
            // eslint-disable-next-line no-param-reassign
            map.sx += _config__WEBPACK_IMPORTED_MODULE_0__["playerSpeed"];
            break;
        case _directions__WEBPACK_IMPORTED_MODULE_1__["S"]:
            // eslint-disable-next-line no-param-reassign
            map.sy += _config__WEBPACK_IMPORTED_MODULE_0__["playerSpeed"];
            break;
        case _directions__WEBPACK_IMPORTED_MODULE_1__["W"]:
            // eslint-disable-next-line no-param-reassign
            map.sx -= _config__WEBPACK_IMPORTED_MODULE_0__["playerSpeed"];
            break;
        default:
    }
});


/***/ }),

/***/ "./src/map/createMap.js":
/*!******************************!*\
  !*** ./src/map/createMap.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _mapData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mapData */ "./src/map/mapData.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/map/utils/index.js");
/* harmony import */ var _tilesheet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tilesheet */ "./src/map/tilesheet/index.js");
/* harmony import */ var _tileEngine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tileEngine */ "./src/tileEngine/index.js");
/* global kontra */








/* harmony default export */ __webpack_exports__["default"] = (async () => {
    const { sx, sy } = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["calculateCameraCoordinates"])({ col: _config__WEBPACK_IMPORTED_MODULE_0__["playerStartCol"], row: _config__WEBPACK_IMPORTED_MODULE_0__["playerStartRow"] });
    const map = Object(_tileEngine__WEBPACK_IMPORTED_MODULE_5__["createTileEngine"])({
        // tile size
        tileWidth: _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"],
        tileHeight: _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"],

        // map size in tiles
        width: _config__WEBPACK_IMPORTED_MODULE_0__["mapWidth"] + _config__WEBPACK_IMPORTED_MODULE_0__["mapPaddingX"] * 2,
        height: _config__WEBPACK_IMPORTED_MODULE_0__["mapHeight"] + _config__WEBPACK_IMPORTED_MODULE_0__["mapPaddingY"] * 2,

        sx,
        sy
    });

    const paddedMap = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["addPadding"])(_mapData__WEBPACK_IMPORTED_MODULE_2__["default"], _config__WEBPACK_IMPORTED_MODULE_0__["mapWidth"], _config__WEBPACK_IMPORTED_MODULE_0__["mapHeight"], _config__WEBPACK_IMPORTED_MODULE_0__["mapPaddingX"], _config__WEBPACK_IMPORTED_MODULE_0__["mapPaddingY"]);
    const image = await Object(_tilesheet__WEBPACK_IMPORTED_MODULE_4__["createTilesheet"])();
    map.addTilesets({ image });
    // map.addTilesets({ image: kontra.assets.images.tilesheet });
    map.addLayers([
        {
            name: 'main',
            data: paddedMap
        },
        {
            name: 'debug',
            data: new Array(paddedMap.length).fill(0)
        }
        // {
        //     name: 'grid',
        //     data: new Array(paddedMap.length).fill(8)
        // }
    ]);
    return map;
});


/***/ }),

/***/ "./src/map/index.js":
/*!**************************!*\
  !*** ./src/map/index.js ***!
  \**************************/
/*! exports provided: createMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createMap */ "./src/map/createMap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createMap", function() { return _createMap__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/map/mapData.js":
/*!****************************!*\
  !*** ./src/map/mapData.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// prettier-ignore
/* harmony default export */ __webpack_exports__["default"] = ([
    0, 17,  0,  0,  0, 17,  0,  0,  0, 17,  0,  0,  0, 17,  0,  0,  0, 17,  0,  0,
   20,  4, 11,  2,  1,  4,  2,  0,  0,  5, 11,  6, 11, 13,  0,  1, 11, 12,  2,  0,
    0,  1, 11, 10,  9, 11, 13,  0,  0,  3,  0,  3,  0,  5, 11, 13,  0,  3,  3,  0,
    0,  3,  1, 11,  6, 11, 10,  0,  1,  4,  2,  9, 11, 13,  0,  9, 11, 10,  3,  0,
    0,  3,  3,  0,  3,  0,  0,  0,  3,  1, 13,  0,  0,  3,  0,  0,  0,  0,  5, 18,
    0,  3,  3,  0, 14,  0,  1, 11, 10,  3,  9, 11,  6,  4, 11,  6,  2,  0,  3,  0,
    0,  3,  3,  0,  3,  0,  3,  0,  0,  3,  0,  0,  3,  0,  0,  3,  3,  0,  3,  0,
    0,  9, 13,  0,  5, 11, 10,  0,  0,  3,  1, 11, 10,  0,  0,  3,  3,  0,  3,  0,
    0,  0,  3,  0,  3,  0,  0,  0,  1,  4, 10,  0,  0,  0,  0,  3,  5, 11,  4, 18,
    0,  1, 13,  0,  5, 11,  2,  0,  3,  0,  1, 11, 11, 11, 11, 12, 10,  0,  0,  0,
    0,  3,  3,  0,  3,  0,  5, 11, 13,  0,  9, 11,  2,  0,  0,  3,  0,  0,  1, 18,
    0,  9, 10,  0,  5, 11, 10,  0,  9, 11, 11, 11, 12, 11,  6, 10,  0,  0,  3,  0,
    0,  0,  0,  0,  3,  1, 11,  2,  1, 11, 11, 11, 10,  0,  3,  0,  1, 11,  4, 18,
   20,  6,  6, 11, 10,  3,  0,  3,  3,  0,  0,  0,  1,  2,  9, 11, 12, 11,  2,  0,
    0,  3,  3,  0,  0,  3,  0,  3,  3,  1, 11,  2,  3,  3,  0,  0,  3,  0,  3,  0,
    0,  5,  4,  2,  0,  5, 11, 10,  3,  3,  0,  5, 12,  4, 11, 11, 13,  0,  5, 18,
    0,  3,  0,  5, 11, 12, 11,  6, 10,  9,  6, 10,  3,  0,  0,  0,  9, 11, 10,  0,
   20,  4, 11, 13,  0,  3,  0,  9, 11, 11, 13,  0,  9, 11,  6, 11,  6,  6, 11, 18,
    0,  0,  0,  3,  0,  3,  0,  0,  0,  0,  5, 11, 11,  2,  3,  0,  3,  3,  0,  0,
    0,  0,  0, 19,  0, 19,  0,  0,  0,  0, 19,  0,  0, 19,  9, 11, 10, 19,  0,  0
]);


/***/ }),

/***/ "./src/map/tilesheet/createTilesheet.js":
/*!**********************************************!*\
  !*** ./src/map/tilesheet/createTilesheet.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ "./src/config.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! . */ "./src/map/tilesheet/index.js");



/* harmony default export */ __webpack_exports__["default"] = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 8 * _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"];
    canvas.height = 8 * _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"];
    const ctx = canvas.getContext('2d');
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawCurve"])({ ctx, row: 1, col: 1, deg: 0 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawCurve"])({ ctx, row: 1, col: 2, deg: 90 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawCurve"])({ ctx, row: 2, col: 1, deg: 270 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawCurve"])({ ctx, row: 2, col: 2, deg: 180 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawStraight"])({ ctx, row: 1, col: 3, deg: 0 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawStraight"])({ ctx, row: 2, col: 3, deg: 90 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTSection"])({ ctx, row: 1, col: 4, deg: 0 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTSection"])({ ctx, row: 1, col: 5, deg: 90 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTSection"])({ ctx, row: 1, col: 6, deg: 180 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTSection"])({ ctx, row: 2, col: 5, deg: 270 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawCrossing"])({ ctx, row: 2, col: 4 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTerminus"])({ ctx, row: 3, col: 1, deg: 0 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTerminus"])({ ctx, row: 3, col: 2, deg: 90 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTerminus"])({ ctx, row: 3, col: 3, deg: 180 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTerminus"])({ ctx, row: 3, col: 4, deg: 270 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawServer"])({ ctx, row: 2, col: 6 });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawCurve"])({ ctx, row: 4, col: 1, deg: 0, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawCurve"])({ ctx, row: 4, col: 2, deg: 90, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawCurve"])({ ctx, row: 5, col: 1, deg: 270, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawCurve"])({ ctx, row: 5, col: 2, deg: 180, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawStraight"])({ ctx, row: 4, col: 3, deg: 0, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawStraight"])({ ctx, row: 5, col: 3, deg: 90, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTSection"])({ ctx, row: 4, col: 4, deg: 0, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTSection"])({ ctx, row: 4, col: 5, deg: 90, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTSection"])({ ctx, row: 4, col: 6, deg: 180, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTSection"])({ ctx, row: 5, col: 5, deg: 270, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawCrossing"])({ ctx, row: 5, col: 4, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTerminus"])({ ctx, row: 6, col: 1, deg: 0, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTerminus"])({ ctx, row: 6, col: 2, deg: 90, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTerminus"])({ ctx, row: 6, col: 3, deg: 180, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawTerminus"])({ ctx, row: 6, col: 4, deg: 270, broken: true });
    Object(___WEBPACK_IMPORTED_MODULE_1__["drawServer"])({ ctx, row: 5, col: 6, broken: true });
    if (true) {
        __webpack_require__(/*! ./drawDebugGrid */ "./src/map/tilesheet/drawDebugGrid.js").default({ ctx, row: 1, col: 8 });
    }
    const image = new Image();
    image.src = canvas.toDataURL('image/png');
    // document.getElementById('wrapper').appendChild(image);
    return new Promise(resolve => setTimeout(() => resolve(image), 100));
});


/***/ }),

/***/ "./src/map/tilesheet/drawCrossing.js":
/*!*******************************************!*\
  !*** ./src/map/tilesheet/drawCrossing.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/map/tilesheet/utils/index.js");
/* eslint-disable no-param-reassign */



/* harmony default export */ __webpack_exports__["default"] = (({ ctx, row, col, broken = false }) => {
    ctx.save();
    ctx.translate((col - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] / 2, (row - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] / 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = _config__WEBPACK_IMPORTED_MODULE_0__["lightBlue"];
    ctx.beginPath();
    if (broken) {
        Object(_utils__WEBPACK_IMPORTED_MODULE_1__["krakel"])(ctx, [
            [0, -20, 50],
            [1, -20, 45],
            [1, -10, 40],
            [1, 0, 45],
            [1, 10, 35],
            [1, 20, 40],
            [1, 20, 50],
            [0, 50, 20],
            [1, 40, 20],
            [1, 45, 10],
            [1, 40, -10],
            [1, 45, -20],
            [1, 50, -20],
            [0, 20, -50],
            [1, 20, -35],
            [1, 10, -40],
            [1, 0, -30],
            [1, -10, -40],
            [1, -20, -35],
            [1, -20, -50],
            [0, -50, -20],
            [1, -40, -20],
            [1, -35, -10],
            [1, -45, 0],
            [1, -30, 10],
            [1, -35, 20],
            [1, -50, 20]
        ]);
    } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_1__["krakel"])(ctx, [
            [0, -20, -50],
            [1, -20, -20],
            [1, -50, -20],
            [0, 20, -50],
            [1, 20, -20],
            [1, 50, -20],
            [0, -50, 20],
            [1, -20, 20],
            [1, -20, 50],
            [0, 50, 20],
            [1, 20, 20],
            [1, 20, 50]
        ]);
    }
    ctx.stroke();
    ctx.restore();
});


/***/ }),

/***/ "./src/map/tilesheet/drawCurve.js":
/*!****************************************!*\
  !*** ./src/map/tilesheet/drawCurve.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config */ "./src/config.js");
/* eslint-disable no-param-reassign */



function calculatePointOnArc(deg, r) {
    return [Math.cos(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(deg)) * r + 50, Math.sin(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(deg)) * r + 50];
}

/* harmony default export */ __webpack_exports__["default"] = (({ ctx, row, col, deg, broken = false }) => {
    ctx.save();
    ctx.translate((col - 1) * _config__WEBPACK_IMPORTED_MODULE_1__["tileWidth"] + _config__WEBPACK_IMPORTED_MODULE_1__["tileWidth"] / 2, (row - 1) * _config__WEBPACK_IMPORTED_MODULE_1__["tileHeight"] + _config__WEBPACK_IMPORTED_MODULE_1__["tileHeight"] / 2);
    ctx.rotate(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(deg));
    ctx.lineWidth = 3;
    ctx.strokeStyle = _config__WEBPACK_IMPORTED_MODULE_1__["lightBlue"];
    ctx.beginPath();
    if (broken) {
        ctx.moveTo(20, 50);
        ctx.arc(50, 50, 30, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(180), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(190));
        ctx.moveTo(...calculatePointOnArc(190, 30));
        ctx.lineTo(10, 45);
        ctx.lineTo(10, 35);
        ctx.lineTo(-10, 40);
        ctx.lineTo(...calculatePointOnArc(190, 70));
        ctx.arc(50, 50, 70, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(190), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(180), true);
        ctx.moveTo(50, 20);
        ctx.arc(50, 50, 30, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(270), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(260), true);
        ctx.moveTo(...calculatePointOnArc(260, 30));
        ctx.lineTo(40, 10);
        ctx.lineTo(45, 0);
        ctx.lineTo(35, 0);
        ctx.lineTo(...calculatePointOnArc(260, 70));
        ctx.arc(50, 50, 70, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(260), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(270));
    } else {
        ctx.moveTo(20, 50);
        ctx.arc(50, 50, 30, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(180), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(270));
        ctx.moveTo(-20, 50);
        ctx.arc(50, 50, 70, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(180), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(270));
    }
    ctx.stroke();
    ctx.restore();
});


/***/ }),

/***/ "./src/map/tilesheet/drawDebugGrid.js":
/*!********************************************!*\
  !*** ./src/map/tilesheet/drawDebugGrid.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ "./src/config.js");
/* eslint-disable no-param-reassign */


/* harmony default export */ __webpack_exports__["default"] = (({ ctx, row, col }) => {
    ctx.save();
    ctx.translate((col - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] / 2, (row - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] / 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-49, -49);
    ctx.lineTo(50, -49);
    ctx.lineTo(50, 50);
    ctx.lineTo(-49, 50);
    ctx.lineTo(-49, -49);
    ctx.stroke();
    ctx.restore();
});


/***/ }),

/***/ "./src/map/tilesheet/drawServer.js":
/*!*****************************************!*\
  !*** ./src/map/tilesheet/drawServer.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/map/tilesheet/utils/index.js");
/* eslint-disable no-param-reassign */



/* harmony default export */ __webpack_exports__["default"] = (({ ctx, row, col, broken }) => {
    ctx.save();
    ctx.translate((col - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] / 2, (row - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] / 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = _config__WEBPACK_IMPORTED_MODULE_0__["lightBlue"];
    ctx.beginPath();
    Object(_utils__WEBPACK_IMPORTED_MODULE_1__["krakel"])(ctx, [
        [0, 30, -48],
        [1, 48, -30],
        [1, 48, 30],
        [1, 30, 48],
        [1, -30, 48],
        [1, -48, 30],
        [1, -48, -30],
        [1, -30, -48],
        [1, 30, -48]
    ]);
    ctx.stroke();
    if (broken) {
        ctx.lineWidth = 2;
        Object(_utils__WEBPACK_IMPORTED_MODULE_1__["krakel"])(ctx, [
            [0, 10, -48],
            [1, 0, -40],
            [0, 24, -48],
            [1, 20, -30],
            [0, 48, -27],
            [1, 20, -20],
            [0, -10, -30],
            [1, 10, -30],
            [1, 30, -10],
            [1, 20, 0],
            [1, 10, 0],
            [0, 48, 7],
            [1, 30, 10],
            [0, 20, 0],
            [1, 30, 10],
            [1, 10, 20],
            [0, 30, 48],
            [1, 30, 30],
            [1, 10, 30],
            [0, 20, 20],
            [1, 20, 30],
            [0, -10, 48],
            [1, -10, 20],
            [1, 0, 10],
            [0, -20, 0],
            [1, -20, 20],
            [1, -10, 30],
            [0, -30, 48],
            [1, -20, 40],
            [1, -20, 30],
            [0, -30, 30],
            [1, -20, 40],
            [0, -48, 20],
            [1, -30, 20],
            [0, -40, 20],
            [1, -40, 10],
            [0, -48, 0],
            [1, -30, 0],
            [1, -20, -10],
            [0, -40, 0],
            [1, -30, 10],
            [0, -48, -17],
            [1, -40, -30],
            [1, -30, -20],
            [0, -30, -48],
            [1, -10, -20],
            [1, -10, -10],
            [0, -20, -30],
            [1, -20, -20],
            [1, -30, -10]
        ]);
        ctx.stroke();
    }
    ctx.restore();
});


/***/ }),

/***/ "./src/map/tilesheet/drawStraight.js":
/*!*******************************************!*\
  !*** ./src/map/tilesheet/drawStraight.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/map/tilesheet/utils/index.js");
/* eslint-disable no-param-reassign */




/* harmony default export */ __webpack_exports__["default"] = (({ ctx, row, col, deg, broken = false }) => {
    ctx.save();
    ctx.translate((col - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] / 2, (row - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] / 2);
    ctx.rotate(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(deg));
    ctx.lineWidth = 3;
    ctx.strokeStyle = _config__WEBPACK_IMPORTED_MODULE_0__["lightBlue"];
    ctx.beginPath();
    if (broken) {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__["krakel"])(ctx, [
            [0, -20, 50],
            [1, -20, 30],
            [1, -10, 40],
            [1, 0, 25],
            [1, 10, 35],
            [1, 20, 30],
            [1, 20, 50],
            [0, -20, -50],
            [1, -20, -40],
            [1, -10, -25],
            [1, 0, -35],
            [1, 10, -30],
            [1, 20, -40],
            [1, 20, -50]
        ]);
    } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__["krakel"])(ctx, [[0, -20, -50], [1, -20, 50], [0, 20, -50], [1, 20, 50]]);
    }
    ctx.stroke();
    ctx.restore();
});


/***/ }),

/***/ "./src/map/tilesheet/drawTSection.js":
/*!*******************************************!*\
  !*** ./src/map/tilesheet/drawTSection.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/map/tilesheet/utils/index.js");
/* eslint-disable no-param-reassign */




/* harmony default export */ __webpack_exports__["default"] = (({ ctx, row, col, deg, broken = false }) => {
    ctx.save();
    ctx.translate((col - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] / 2, (row - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] / 2);
    ctx.rotate(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(deg));
    ctx.lineWidth = 3;
    ctx.strokeStyle = _config__WEBPACK_IMPORTED_MODULE_0__["lightBlue"];
    ctx.beginPath();
    if (broken) {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__["krakel"])(ctx, [
            [0, 50, 20],
            [1, 40, 20],
            [1, 45, 10],
            [1, 40, -10],
            [1, 45, -20],
            [1, 50, -20],
            [0, 20, -50],
            [1, 20, -35],
            [1, 10, -40],
            [1, 0, -30],
            [1, -10, -40],
            [1, -20, -35],
            [1, -20, -50],
            [0, -50, -20],
            [1, -40, -20],
            [1, -35, -10],
            [1, -45, 0],
            [1, -30, 10],
            [1, -35, 20],
            [1, -50, 20]
        ]);
    } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__["krakel"])(ctx, [
            [0, -20, -50],
            [1, -20, -20],
            [1, -50, -20],
            [0, 20, -50],
            [1, 20, -20],
            [1, 50, -20],
            [0, -50, 20],
            [1, 50, 20]
        ]);
    }
    ctx.stroke();
    ctx.restore();
});


/***/ }),

/***/ "./src/map/tilesheet/drawTerminus.js":
/*!*******************************************!*\
  !*** ./src/map/tilesheet/drawTerminus.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/map/tilesheet/utils/index.js");
/* eslint-disable no-param-reassign */




/* harmony default export */ __webpack_exports__["default"] = (({ ctx, row, col, deg, broken = false }) => {
    ctx.save();
    ctx.translate((col - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] / 2, (row - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] / 2);
    ctx.rotate(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(deg));
    ctx.lineWidth = 3;
    ctx.strokeStyle = _config__WEBPACK_IMPORTED_MODULE_0__["lightBlue"];
    ctx.beginPath();
    if (broken) {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__["krakel"])(ctx, [[0, -20, 50], [1, -20, 40], [1, -10, 45], [1, 0, 35], [1, 10, 45], [1, 20, 40], [1, 20, 50]]);
    } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__["krakel"])(ctx, [[0, -20, 50], [1, -20, 0], [1, 20, 0], [1, 20, 50]]);
    }
    ctx.stroke();
    ctx.restore();
});


/***/ }),

/***/ "./src/map/tilesheet/index.js":
/*!************************************!*\
  !*** ./src/map/tilesheet/index.js ***!
  \************************************/
/*! exports provided: createTilesheet, drawCurve, drawStraight, drawTSection, drawCrossing, drawServer, drawTerminus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createTilesheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createTilesheet */ "./src/map/tilesheet/createTilesheet.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTilesheet", function() { return _createTilesheet__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _drawCurve__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawCurve */ "./src/map/tilesheet/drawCurve.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawCurve", function() { return _drawCurve__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _drawStraight__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawStraight */ "./src/map/tilesheet/drawStraight.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawStraight", function() { return _drawStraight__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _drawTSection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawTSection */ "./src/map/tilesheet/drawTSection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawTSection", function() { return _drawTSection__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _drawCrossing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./drawCrossing */ "./src/map/tilesheet/drawCrossing.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawCrossing", function() { return _drawCrossing__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _drawServer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./drawServer */ "./src/map/tilesheet/drawServer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawServer", function() { return _drawServer__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _drawTerminus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./drawTerminus */ "./src/map/tilesheet/drawTerminus.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawTerminus", function() { return _drawTerminus__WEBPACK_IMPORTED_MODULE_6__["default"]; });










/***/ }),

/***/ "./src/map/tilesheet/utils/index.js":
/*!******************************************!*\
  !*** ./src/map/tilesheet/utils/index.js ***!
  \******************************************/
/*! exports provided: krakel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _krakel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./krakel */ "./src/map/tilesheet/utils/krakel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "krakel", function() { return _krakel__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/map/tilesheet/utils/krakel.js":
/*!*******************************************!*\
  !*** ./src/map/tilesheet/utils/krakel.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* creates canvas moveTo and lineTo commands from arrays; doing this mostly to save a couple of bytes */
/* harmony default export */ __webpack_exports__["default"] = ((ctx, data) => data.forEach(([draw, x, y]) => ctx[draw ? 'lineTo' : 'moveTo'](x, y)));


/***/ }),

/***/ "./src/map/utils/addPadding.js":
/*!*************************************!*\
  !*** ./src/map/utils/addPadding.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((arr, w, h, x, y) => {
    const retVal = [];
    let idx = 0;
    for (let row = 0; row < h + y * 2; row++) {
        for (let col = 0; col < w + x * 2; col++) {
            if (row < y || row >= y + h || col < x || col >= x + w) {
                retVal.push(0);
                continue;
            }
            retVal.push(arr[idx++]);
        }
    }
    return retVal;
});


/***/ }),

/***/ "./src/map/utils/index.js":
/*!********************************!*\
  !*** ./src/map/utils/index.js ***!
  \********************************/
/*! exports provided: addPadding */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _addPadding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addPadding */ "./src/map/utils/addPadding.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addPadding", function() { return _addPadding__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/messageBox/index.js":
/*!*********************************!*\
  !*** ./src/messageBox/index.js ***!
  \*********************************/
/*! exports provided: messageBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _messageBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageBox */ "./src/messageBox/messageBox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "messageBox", function() { return _messageBox__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/messageBox/messageBox.js":
/*!**************************************!*\
  !*** ./src/messageBox/messageBox.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class MessageBox {
    constructor() {
        this.timeoutHandler = null;
        this.div = document.createElement('div');
        this.div.style.cssText = `
background-color: rgba(0,0,0,0);
font-size: 3em;
font-weight: bold;
align-items: center;
justify-content: center;
display: flex;
color: rgba(255,255,255,0);
position: absolute;
top: 0;
left:0;
width: 100vw;
height: 100vh;
text-align: center;
pointer-events: none;
transition: background-color 3s ease-out, color 3s ease-out;
text-transform: uppercase;
font-family: monospace;
    `;
        const wrapper = document.getElementById('wrapper');
        wrapper.appendChild(this.div);
    }

    show(message) {
        clearTimeout(this.timeoutHandler);
        this.div.style.transition = '3s';
        this.div.innerHTML = `<div>${message}</div>`;
        this.div.style.backgroundColor = 'rgba(0,0,0,0.5)';
        this.div.style.color = 'rgba(255,255,255,1)';
    }

    flash(message) {
        clearTimeout(this.timeoutHandler);
        this.div.style.transition = '0.5s';
        this.div.innerHTML = `<div>${message}</div>`;
        this.div.style.color = 'rgba(255,255,255,1)';
        this.timeoutHandler = setTimeout(() => (this.div.style.color = 'rgba(255,255,255,0)'), 500);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (new MessageBox());


/***/ }),

/***/ "./src/player/createPlayer.js":
/*!************************************!*\
  !*** ./src/player/createPlayer.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/player/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pubsub */ "./src/pubsub/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _messageBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../messageBox */ "./src/messageBox/index.js");
/* global kontra */







/* harmony default export */ __webpack_exports__["default"] = (map => {
    const player = kontra.sprite({
        x: _config__WEBPACK_IMPORTED_MODULE_1__["canvasWidth"] / 2,
        y: _config__WEBPACK_IMPORTED_MODULE_1__["canvasHeight"] / 2,
        collisionRadius: _config__WEBPACK_IMPORTED_MODULE_1__["collisionRadius"],
        map,
        infected: false,
        gameOver: false,
        direction: _config__WEBPACK_IMPORTED_MODULE_1__["playerStartDirection"],
        nextDirection: null,
        dropBomb: false,
        scale: 1,
        dropping: false,
        bombCoolingDown: false,

        update() {
            ({
                nextDirection: this.nextDirection,
                direction: this.direction,
                dropBomb: this.dropBomb,
                scale: this.scale,
                bombCoolingDown: this.bombCoolingDown
            } = Object(___WEBPACK_IMPORTED_MODULE_0__["updatePlayer"])(this, _pubsub__WEBPACK_IMPORTED_MODULE_2__["pubsub"], _messageBox__WEBPACK_IMPORTED_MODULE_4__["messageBox"]));
        },

        render() {
            Object(___WEBPACK_IMPORTED_MODULE_0__["drawPlayer"])(this);
        },

        infect(virus) {
            if (Object(_utils__WEBPACK_IMPORTED_MODULE_3__["collides"])(virus, this)) {
                // eslint-disable-next-line no-param-reassign
                this.infected = true;
                if (!this.gameOver) {
                    _messageBox__WEBPACK_IMPORTED_MODULE_4__["messageBox"].show('player infected<br>game over');
                    _pubsub__WEBPACK_IMPORTED_MODULE_2__["pubsub"].publish(_pubsub__WEBPACK_IMPORTED_MODULE_2__["GAME_OVER"]);
                }
            }
        }
    });

    _pubsub__WEBPACK_IMPORTED_MODULE_2__["pubsub"].subscribe(_pubsub__WEBPACK_IMPORTED_MODULE_2__["GAME_OVER"], () => (player.gameOver = true));
    _pubsub__WEBPACK_IMPORTED_MODULE_2__["pubsub"].subscribe(_pubsub__WEBPACK_IMPORTED_MODULE_2__["DROP_SHIP"], () => (player.dropping = true));

    return player;
});


/***/ }),

/***/ "./src/player/drawPlayer.js":
/*!**********************************!*\
  !*** ./src/player/drawPlayer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");



/* harmony default export */ __webpack_exports__["default"] = (sprite => {
    const { context: ctx, x, y, direction, infected, scale } = sprite;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["calculateRotation"])(direction));
    ctx.lineWidth = 3;
    ctx.strokeStyle = infected ? _config__WEBPACK_IMPORTED_MODULE_0__["lightRed"] : _config__WEBPACK_IMPORTED_MODULE_0__["lightGreen"];
    ctx.fillStyle = infected ? _config__WEBPACK_IMPORTED_MODULE_0__["darkRed"] : _config__WEBPACK_IMPORTED_MODULE_0__["darkGreen"];
    ctx.beginPath();
    ctx.moveTo(-15, 25);
    ctx.lineTo(0, -25);
    ctx.lineTo(15, 25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
});


/***/ }),

/***/ "./src/player/index.js":
/*!*****************************!*\
  !*** ./src/player/index.js ***!
  \*****************************/
/*! exports provided: createPlayer, drawPlayer, updatePlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createPlayer */ "./src/player/createPlayer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPlayer", function() { return _createPlayer__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _drawPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawPlayer */ "./src/player/drawPlayer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawPlayer", function() { return _drawPlayer__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _updatePlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updatePlayer */ "./src/player/updatePlayer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updatePlayer", function() { return _updatePlayer__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./src/player/updatePlayer.js":
/*!************************************!*\
  !*** ./src/player/updatePlayer.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _directions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../directions */ "./src/directions/index.js");
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pubsub */ "./src/pubsub/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/player/utils/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _messageBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../messageBox */ "./src/messageBox/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ "./src/config.js");







/* harmony default export */ __webpack_exports__["default"] = (sprite => {
    let { nextDirection, direction, dropBomb, scale, bombCoolingDown } = sprite;
    const { dropping } = sprite;
    if (dropping) {
        if (scale > 0) {
            scale -= 0.01;
        } else {
            _messageBox__WEBPACK_IMPORTED_MODULE_4__["messageBox"].show('You fell into the abyss<br>Game over');
            _pubsub__WEBPACK_IMPORTED_MODULE_1__["pubsub"].publish(_pubsub__WEBPACK_IMPORTED_MODULE_1__["GAME_OVER"]);
        }
        return { direction, nextDirection, dropBomb, scale, bombCoolingDown };
    }
    const { map, x, y, gameOver } = sprite;
    if (!gameOver) {
        ({ nextDirection, dropBomb } = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getKey"])(sprite));
        if (bombCoolingDown) {
            dropBomb = false;
        }
    }
    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isInTheMiddle"])({ x: map.sx, y: map.sy })) {
        return { direction, nextDirection, dropBomb, scale, bombCoolingDown };
    }
    if (nextDirection && Object(_directions__WEBPACK_IMPORTED_MODULE_0__["directionIsAllowed"])(map, { x, y }, nextDirection)) {
        direction = nextDirection;
        nextDirection = null;
    } else {
        try {
            direction = Object(_directions__WEBPACK_IMPORTED_MODULE_0__["switchDirection"])(map, { x, y }, direction);
        } catch ({ message }) {
            if (message === 'dropped') {
                _pubsub__WEBPACK_IMPORTED_MODULE_1__["pubsub"].publish(_pubsub__WEBPACK_IMPORTED_MODULE_1__["DROP_SHIP"]);
            }
        }
    }
    if (dropBomb) {
        _pubsub__WEBPACK_IMPORTED_MODULE_1__["pubsub"].publish(_pubsub__WEBPACK_IMPORTED_MODULE_1__["DROP_BOMB"], Object(_utils__WEBPACK_IMPORTED_MODULE_3__["calculateRowAndCol"])(map));
        dropBomb = false;
        bombCoolingDown = true;
        setTimeout(() => {
            // eslint-disable-next-line no-param-reassign
            sprite.bombCoolingDown = false;
        }, _config__WEBPACK_IMPORTED_MODULE_5__["bombCooldown"]);
    }
    return { direction, nextDirection, dropBomb, scale, bombCoolingDown };
});


/***/ }),

/***/ "./src/player/utils/getKey.js":
/*!************************************!*\
  !*** ./src/player/utils/getKey.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _directions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../directions */ "./src/directions/index.js");
/* global kontra */



/* harmony default export */ __webpack_exports__["default"] = (sprite => {
    let { nextDirection, dropBomb } = sprite;
    if (kontra.keys.pressed('right')) {
        nextDirection = _directions__WEBPACK_IMPORTED_MODULE_0__["E"];
    }
    if (kontra.keys.pressed('left')) {
        nextDirection = _directions__WEBPACK_IMPORTED_MODULE_0__["W"];
    }
    if (kontra.keys.pressed('up')) {
        nextDirection = _directions__WEBPACK_IMPORTED_MODULE_0__["N"];
    }
    if (kontra.keys.pressed('down')) {
        nextDirection = _directions__WEBPACK_IMPORTED_MODULE_0__["S"];
    }
    if (kontra.keys.pressed('space')) {
        dropBomb = true;
    }
    return { nextDirection, dropBomb };
});


/***/ }),

/***/ "./src/player/utils/index.js":
/*!***********************************!*\
  !*** ./src/player/utils/index.js ***!
  \***********************************/
/*! exports provided: isInTheMiddle, getKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isInTheMiddle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isInTheMiddle */ "./src/player/utils/isInTheMiddle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isInTheMiddle", function() { return _isInTheMiddle__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _getKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getKey */ "./src/player/utils/getKey.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getKey", function() { return _getKey__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "./src/player/utils/isInTheMiddle.js":
/*!*******************************************!*\
  !*** ./src/player/utils/isInTheMiddle.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ "./src/config.js");


/* harmony default export */ __webpack_exports__["default"] = (({ x, y }) => (x - _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] / 2) % _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] === 0 && (y - _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] / 2) % _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] === 0);


/***/ }),

/***/ "./src/pubsub/constants.js":
/*!*********************************!*\
  !*** ./src/pubsub/constants.js ***!
  \*********************************/
/*! exports provided: GAME_OVER, DROP_BOMB, DROP_SHIP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_OVER", function() { return GAME_OVER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DROP_BOMB", function() { return DROP_BOMB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DROP_SHIP", function() { return DROP_SHIP; });
const GAME_OVER = 0;
const DROP_BOMB = 1;
const DROP_SHIP = 2;


/***/ }),

/***/ "./src/pubsub/index.js":
/*!*****************************!*\
  !*** ./src/pubsub/index.js ***!
  \*****************************/
/*! exports provided: pubsub, GAME_OVER, DROP_BOMB, DROP_SHIP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/pubsub/pubsub.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pubsub", function() { return _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/pubsub/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GAME_OVER", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["GAME_OVER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DROP_BOMB", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["DROP_BOMB"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DROP_SHIP", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["DROP_SHIP"]; });





/***/ }),

/***/ "./src/pubsub/pubsub.js":
/*!******************************!*\
  !*** ./src/pubsub/pubsub.js ***!
  \******************************/
/*! exports provided: Pubsub, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pubsub", function() { return Pubsub; });
// exported for testing
class Pubsub {
    constructor() {
        this.subscribers = [];
    }
    subscribe(message, callback) {
        this.subscribers.push({ message, callback });
    }
    publish(incomingMessage, payload) {
        this.subscribers.forEach(({ message, callback }) => message === incomingMessage && callback(payload));
    }
}

/* harmony default export */ __webpack_exports__["default"] = (new Pubsub());


/***/ }),

/***/ "./src/tileEngine/createTileEngine.js":
/*!********************************************!*\
  !*** ./src/tileEngine/createTileEngine.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/tileEngine/utils/index.js");
/* global kontra */


/**
 * A tile engine for rendering tilesets. Works well with the tile engine program Tiled.
 * @memberof kontra
 *
 * @param {object} properties - Properties of the tile engine.
 * @param {number} [properties.tileWidth=32] - Width of a tile.
 * @param {number} [properties.tileHeight=32] - Height of a tile.
 * @param {number} properties.width - Width of the map (in tiles).
 * @param {number} properties.height - Height of the map (in tiles).
 * @param {number} [properties.x=0] - X position to draw.
 * @param {number} [properties.y=0] - Y position to draw.
 * @param {number} [properties.sx=0] - X position to clip the tileset.
 * @param {number} [properties.sy=0] - Y position to clip the tileset.
 * @param {Context} [properties.context=kontra.context] - Provide a context for the tile engine to draw on.
 */
/* harmony default export */ __webpack_exports__["default"] = ((properties = {}) => {
    // size of the map (in tiles)
    // @if DEBUG
    if (!properties.width || !properties.height) {
        throw Error('You must provide width and height properties');
    }
    // @endif
    const width = properties.width;
    const height = properties.height;

    // size of the tiles. Most common tile size on opengameart.org seems to be 32x32,
    // followed by 16x16
    // Tiled names the property tilewidth and tileheight
    const tileWidth = properties.tileWidth || 32;
    const tileHeight = properties.tileHeight || 32;

    const mapWidth = width * tileWidth;
    const mapHeight = height * tileHeight;

    const context = properties.context || kontra.context;
    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;

    // create an off-screen canvas for pre-rendering the map
    // @see http://jsperf.com/render-vs-prerender
    const offscreenCanvas = document.createElement('canvas');
    const offscreenContext = offscreenCanvas.getContext('2d');

    // when clipping an image, sx and sy must within the image region, otherwise
    // Firefox and Safari won't draw it.
    // @see http://stackoverflow.com/questions/19338032/canvas-indexsizeerror-index-or-size-is-negative-or-greater-than-the-allowed-a
    const sxMax = Math.max(0, mapWidth - canvasWidth);
    const syMax = Math.max(0, mapHeight - canvasHeight);

    let _sx, _sy;

    // draw order of layers (by name)
    const layerOrder = [];

    const tileEngine = {
        width,
        height,

        tileWidth,
        tileHeight,

        mapWidth,
        mapHeight,

        context,

        x: properties.x || 0,
        y: properties.y || 0,

        tilesets: [],
        layers: {},

        /**
         * Add an tileset for the tile engine to use.
         * @memberof kontra.tileEngine
         */
        addTilesets: function addTilesets(tilesets) {
            [].concat(tilesets).forEach(tileset => {
                const tilesetImage = tileset.image;
                let image, firstGrid, lastTileset, tiles;

                // @see https://github.com/jed/140bytes/wiki/Byte-saving-techniques#coercion-to-test-for-types
                if (`${tilesetImage}` === tilesetImage) {
                    let i = Infinity;

                    while (i >= 0) {
                        i = tilesetImage.lastIndexOf('/', i);
                        const path = i < 0 ? tilesetImage : tilesetImage.substr(i);

                        if (kontra.assets.images[path]) {
                            image = kontra.assets.images[path];
                            break;
                        }

                        i--;
                    }
                } else {
                    image = tilesetImage;
                }

                firstGrid = tileset.firstGrid;

                // if the width or height of the provided image is smaller than the tile size,
                // default calculation to 1
                const numTiles = ((image.width / tileWidth) | 0 || 1) * ((image.height / tileHeight) | 0 || 1);

                if (!firstGrid) {
                    // only calculate the first grid if the tile map has a tileset already
                    if (tileEngine.tilesets.length > 0) {
                        lastTileset = tileEngine.tilesets[tileEngine.tilesets.length - 1];
                        tiles =
                            ((lastTileset.image.width / tileWidth) | 0) * ((lastTileset.image.height / tileHeight) | 0);

                        firstGrid = lastTileset.firstGrid + tiles;
                    }
                    // otherwise this is the first tile added to the tile map
                    else {
                        firstGrid = 1;
                    }
                }

                tileEngine.tilesets.push({
                    firstGrid,
                    lastGrid: firstGrid + numTiles - 1,
                    image
                });

                // sort the tile map so we can perform a binary search when drawing
                tileEngine.tilesets.sort((a, b) => a.firstGrid - b.firstGrid);
            });
        },

        /**
         * Add a layer to the tile engine.
         * @memberof kontra.tileEngine
         */
        addLayers: function addLayers(layers) {
            [].concat(layers).forEach(layer => {
                // eslint-disable-next-line no-param-reassign
                layer.render = layer.render === undefined ? true : layer.render;

                let data, row, c, value;

                // flatten a 2D array into a single array
                if (Array.isArray(layer.data[0])) {
                    data = [];

                    // eslint-disable-next-line no-cond-assign
                    for (let r = 0; (row = layer.data[r]); r++) {
                        for (c = 0; c < width; c++) {
                            data.push(row[c] || 0);
                        }
                    }
                } else {
                    data = layer.data;
                }

                tileEngine.layers[layer.name] = {
                    data,
                    zIndex: layer.zIndex || 0,
                    render: layer.render
                };

                // merge properties of layer onto layer object
                for (const prop in layer.properties) {
                    if (layer.properties.hasOwnProperty(prop)) {
                        value = layer.properties[prop];

                        try {
                            value = JSON.parse(value);
                        } catch (e) {
                            /* intentionally empty */
                        }

                        tileEngine.layers[layer.name][prop] = value;
                    }
                }

                // only add the layer to the layer order if it should be drawn
                if (tileEngine.layers[layer.name].render) {
                    layerOrder.push(layer.name);

                    layerOrder.sort((a, b) => tileEngine.layers[a].zIndex - tileEngine.layers[b].zIndex);
                }
            });

            preRenderImage();
        },

        changeTile(layerId, { row, col }, tile) {
            const dataIndex = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["flatIndex"])(row, col, width);
            const layer = tileEngine.layers[layerId];
            layer.data[dataIndex] = tile;
            renderTile(layer, dataIndex, true);
        },

        /**
         * Simple bounding box collision test for layer tiles.
         * @memberof kontra.tileEngine
         *
         * @param {string} name - Name of the layer.
         * @param {object} object - Object to check collision against.
         * @param {number} object.x - X coordinate of the object.
         * @param {number} object.y - Y coordinate of the object.
         * @param {number} object.width - Width of the object.
         * @param {number} object.height - Height of the object.
         *
         * @returns {boolean} True if the object collides with a tile, false otherwise.
         */
        layerCollidesWith: function layerCollidesWith(name, object) {
            // calculate all tiles that the object can collide with
            const row = tileEngine.getRow(object.y);
            const col = tileEngine.getCol(object.x);

            const endRow = tileEngine.getRow(object.y + object.height);
            const endCol = tileEngine.getCol(object.x + object.width);

            // check all tiles
            let index;
            for (let r = row; r <= endRow; r++) {
                for (let c = col; c <= endCol; c++) {
                    index = getIndex({ row: r, col: c });

                    if (tileEngine.layers[name].data[index]) {
                        return true;
                    }
                }
            }

            return false;
        },

        /**
         * Get the tile from the specified layer at x, y or row, col.
         * @memberof kontra.tileEngine
         *
         * @param {string} name - Name of the layer.
         * @param {object} position - Position of the tile in either x, y or row, col.
         * @param {number} position.x - X coordinate of the tile.
         * @param {number} position.y - Y coordinate of the tile.
         * @param {number} position.row - Row of the tile.
         * @param {number} position.col - Col of the tile.
         *
         * @returns {number}
         */
        tileAtLayer(name, position) {
            const index = getIndex(position);

            if (index >= 0) {
                return tileEngine.layers[name].data[index];
            }
            return undefined;
        },

        /**
         * Render the pre-rendered canvas.
         * @memberof kontra.tileEngine
         */
        render() {
            tileEngine.context.drawImage(
                offscreenCanvas,
                tileEngine.sx,
                tileEngine.sy,
                canvasWidth,
                canvasHeight,
                tileEngine.x,
                tileEngine.y,
                canvasWidth,
                canvasHeight
            );
        },

        /**
         * Render a specific layer.
         * @memberof kontra.tileEngine
         *
         * @param {string} name - Name of the layer to render.
         */
        renderLayer: function renderLayer(name) {
            const layer = tileEngine.layers[name];

            // calculate the starting tile
            let row = tileEngine.getRow();
            const col = tileEngine.getCol();
            let index = getIndex({ row, col });

            // calculate where to start drawing the tile relative to the drawing canvas
            const startX = col * tileWidth - tileEngine.sx;
            const startY = row * tileHeight - tileEngine.sy;

            // calculate how many tiles the drawing canvas can hold
            const viewWidth = Math.min(Math.ceil(canvasWidth / tileWidth) + 1, width);
            const viewHeight = Math.min(Math.ceil(canvasHeight / tileHeight) + 1, height);
            const numTiles = viewWidth * viewHeight;

            let count = 0;
            let x, y, tile, tileset, image, tileOffset, w, sx, sy;

            // draw just enough of the layer to fit inside the drawing canvas
            while (count < numTiles) {
                tile = layer.data[index];

                if (tile) {
                    tileset = getTileset(tile);
                    image = tileset.image;

                    x = startX + (count % viewWidth) * tileWidth;
                    y = startY + ((count / viewWidth) | 0) * tileHeight;

                    tileOffset = tile - tileset.firstGrid;
                    w = image.width / tileWidth;

                    sx = (tileOffset % w) * tileWidth;
                    sy = ((tileOffset / w) | 0) * tileHeight;

                    tileEngine.context.drawImage(image, sx, sy, tileWidth, tileHeight, x, y, tileWidth, tileHeight);
                }

                if (++count % viewWidth === 0) {
                    index = col + ++row * width;
                } else {
                    index++;
                }
            }
        },

        /**
         * Get the row from the y coordinate.
         * @memberof kontra.tileEngine
         *
         * @param {number} y - Y coordinate.
         *
         * @return {number}
         */
        getRow(y) {
            // eslint-disable-next-line no-param-reassign
            y = y || 0;

            return ((tileEngine.sy + y) / tileHeight) | 0;
        },

        /**
         * Get the col from the x coordinate.
         * @memberof kontra.tileEngine
         *
         * @param {number} x - X coordinate.
         *
         * @return {number}
         */
        getCol(x) {
            // eslint-disable-next-line no-param-reassign
            x = x || 0;

            return ((tileEngine.sx + x) / tileWidth) | 0;
        },

        get sx() {
            return _sx;
        },

        get sy() {
            return _sy;
        },

        // ensure sx and sy are within the image region
        set sx(value) {
            _sx = Math.min(Math.max(0, value), sxMax);
        },

        set sy(value) {
            _sy = Math.min(Math.max(0, value), syMax);
        },

        // expose properties for testing
        // @if DEBUG
        _layerOrder: layerOrder
        // @endif
    };

    // set here so we use setter function
    tileEngine.sx = properties.sx || 0;
    tileEngine.sy = properties.sy || 0;

    // make the off-screen canvas the full size of the map
    offscreenCanvas.width = mapWidth;
    offscreenCanvas.height = mapHeight;

    // merge properties of the tile engine onto the tile engine itself
    for (const prop in properties.properties) {
        if (properties.properties.hasOwnProperty(prop)) {
            let value = properties.properties[prop];

            try {
                value = JSON.parse(value);
            } catch (e) {
                /* intentionally empty */
            }

            // passed in properties override properties.properties
            tileEngine[prop] = tileEngine[prop] || value;
        }
    }

    if (properties.tilesets) {
        tileEngine.addTilesets(properties.tilesets);
    }

    if (properties.layers) {
        tileEngine.addLayers(properties.layers);
    }

    /**
     * Get the index of the x, y or row, col.
     * @memberof kontra.tileEngine
     * @private
     *
     * @param {number} position.x - X coordinate of the tile.
     * @param {number} position.y - Y coordinate of the tile.
     * @param {number} position.row - Row of the tile.
     * @param {number} position.col - Col of the tile.
     *
     * @return {number} Returns the tile index or -1 if the x, y or row,
     *         col is outside the dimensions of the tile engine.
     */
    function getIndex(position) {
        let row, col;

        if (typeof position.x !== 'undefined' && typeof position.y !== 'undefined') {
            row = tileEngine.getRow(position.y);
            col = tileEngine.getCol(position.x);
        } else {
            row = position.row;
            col = position.col;
        }

        // don't calculate out of bound numbers
        if (row < 0 || col < 0 || row >= height || col >= width) {
            return -1;
        }

        return col + row * width;
    }

    /**
     * Modified binary search that will return the tileset associated with the tile
     * @memberof kontra.tileEngine
     * @private
     *
     * @param {number} tile - Tile grid.
     *
     * @return {object}
     */
    function getTileset(tile) {
        let min = 0;
        let max = tileEngine.tilesets.length - 1;
        let index, currTile;

        while (min <= max) {
            index = ((min + max) / 2) | 0;
            currTile = tileEngine.tilesets[index];

            if (tile >= currTile.firstGrid && tile <= currTile.lastGrid) {
                return currTile;
            } else if (currTile.lastGrid < tile) {
                min = index + 1;
            } else {
                max = index - 1;
            }
        }
        return undefined;
    }

    /**
     * Pre-render the tiles to make drawing fast.
     * @memberof kontra.tileEngine
     * @private
     */
    function preRenderImage() {
        // draw each layer in order
        // eslint-disable-next-line no-cond-assign
        for (let layerIndex = 0, layer; (layer = tileEngine.layers[layerOrder[layerIndex]]); layerIndex++) {
            for (let dataIndex = 0, len = layer.data.length; dataIndex < len; dataIndex++) {
                renderTile(layer, dataIndex);
            }
        }
    }

    function renderTile(layer, dataIndex, clear = false) {
        const tile = layer.data[dataIndex];

        // skip empty tiles (0)
        if (!tile) {
            return;
        }

        const tileset = getTileset(tile);
        const image = tileset.image;

        const x = (dataIndex % width) * tileWidth;
        const y = ((dataIndex / width) | 0) * tileHeight;

        const tileOffset = tile - tileset.firstGrid;
        const w = image.width / tileWidth;

        const sx = (tileOffset % w) * tileWidth;
        const sy = ((tileOffset / w) | 0) * tileHeight;

        if (clear) {
            offscreenContext.clearRect(x, y, tileWidth, tileHeight);
        }
        offscreenContext.drawImage(image, sx, sy, tileWidth, tileHeight, x, y, tileWidth, tileHeight);
    }

    return tileEngine;
});


/***/ }),

/***/ "./src/tileEngine/index.js":
/*!*********************************!*\
  !*** ./src/tileEngine/index.js ***!
  \*********************************/
/*! exports provided: createTileEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createTileEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createTileEngine */ "./src/tileEngine/createTileEngine.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTileEngine", function() { return _createTileEngine__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/tileEngine/utils/flatIndex.js":
/*!*******************************************!*\
  !*** ./src/tileEngine/utils/flatIndex.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((row, col, width) => (row - 1) * width + col - 1);


/***/ }),

/***/ "./src/tileEngine/utils/index.js":
/*!***************************************!*\
  !*** ./src/tileEngine/utils/index.js ***!
  \***************************************/
/*! exports provided: flatIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _flatIndex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flatIndex */ "./src/tileEngine/utils/flatIndex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flatIndex", function() { return _flatIndex__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/user/Users.js":
/*!***************************!*\
  !*** ./src/user/Users.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/user/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/user/utils/index.js");
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pubsub */ "./src/pubsub/index.js");
/* harmony import */ var _messageBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../messageBox */ "./src/messageBox/index.js");







/* harmony default export */ __webpack_exports__["default"] = (class {
    constructor(map) {
        this.map = map;
        this.users = [];
        this.gameOver = false;
        for (let row = 1; row <= _config__WEBPACK_IMPORTED_MODULE_1__["mapHeight"] + _config__WEBPACK_IMPORTED_MODULE_1__["mapPaddingY"] * 2; row++) {
            for (let col = 1; col <= _config__WEBPACK_IMPORTED_MODULE_1__["mapWidth"] + _config__WEBPACK_IMPORTED_MODULE_1__["mapPaddingX"] * 2; col++) {
                const tile = map.tileAtLayer('main', { row, col });
                if (tile >= 17 && tile <= 20) {
                    this.users.push(Object(___WEBPACK_IMPORTED_MODULE_0__["createUser"])({ map, row: row - _config__WEBPACK_IMPORTED_MODULE_1__["mapPaddingY"] + 1, col: col - _config__WEBPACK_IMPORTED_MODULE_1__["mapPaddingX"] + 1 }));
                }
            }
        }
        _pubsub__WEBPACK_IMPORTED_MODULE_4__["pubsub"].subscribe(_pubsub__WEBPACK_IMPORTED_MODULE_4__["GAME_OVER"], () => (this.gameOver = true));
    }
    update() {
        this.users.forEach(user => user.update());
    }
    render() {
        this.users.forEach(user => user.render());
    }
    infect(viruses) {
        const { users, gameOver } = this;
        const userVirusCollisions = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["multiCollides"])(users, viruses).filter(([user]) => user.status !== ___WEBPACK_IMPORTED_MODULE_0__["INFECTED"]);
        if (userVirusCollisions.length === 0) {
            return;
        }
        userVirusCollisions.forEach(([user]) => user.infect());
        if (gameOver) {
            return;
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_3__["allInfected"])(users)) {
            _messageBox__WEBPACK_IMPORTED_MODULE_5__["messageBox"].show('all users infected<br>game over');
            _pubsub__WEBPACK_IMPORTED_MODULE_4__["pubsub"].publish(_pubsub__WEBPACK_IMPORTED_MODULE_4__["GAME_OVER"]);
            return;
        }
        _messageBox__WEBPACK_IMPORTED_MODULE_5__["messageBox"].flash('user infected!');
    }
});


/***/ }),

/***/ "./src/user/constants.js":
/*!*******************************!*\
  !*** ./src/user/constants.js ***!
  \*******************************/
/*! exports provided: ONLINE, OFFLINE, INFECTED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONLINE", function() { return ONLINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFLINE", function() { return OFFLINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INFECTED", function() { return INFECTED; });
const ONLINE = 0;
const OFFLINE = 1;
const INFECTED = 2;


/***/ }),

/***/ "./src/user/createUser.js":
/*!********************************!*\
  !*** ./src/user/createUser.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/user/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* global kontra */






/* harmony default export */ __webpack_exports__["default"] = (({ map, row, col }) => {
    const { x, y } = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["transformMapCoordinates"])(map, { row, col });
    return kontra.sprite({
        x,
        y,
        collisionRadius: _config__WEBPACK_IMPORTED_MODULE_1__["collisionRadius"],
        infected: false,
        map,
        mapX: (col - 1) * _config__WEBPACK_IMPORTED_MODULE_1__["tileWidth"],
        mapY: (row - 1) * _config__WEBPACK_IMPORTED_MODULE_1__["tileHeight"],
        status: ___WEBPACK_IMPORTED_MODULE_0__["ONLINE"],
        update() {
            ({ x: this.x, y: this.y } = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["transformMapCoordinates"])(this.map, { x: this.mapX, y: this.mapY }));
        },
        render() {
            Object(___WEBPACK_IMPORTED_MODULE_0__["drawUser"])(this);
        },
        infect() {
            this.status = ___WEBPACK_IMPORTED_MODULE_0__["INFECTED"];
        }
    });
});


/***/ }),

/***/ "./src/user/drawUser.js":
/*!******************************!*\
  !*** ./src/user/drawUser.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/user/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* global kontra */




const spriteMapping = {
    [_constants__WEBPACK_IMPORTED_MODULE_1__["ONLINE"]]: { fg: _config__WEBPACK_IMPORTED_MODULE_0__["lightBlue"], bg: _config__WEBPACK_IMPORTED_MODULE_0__["darkBlue"] },
    [_constants__WEBPACK_IMPORTED_MODULE_1__["OFFLINE"]]: { fg: _config__WEBPACK_IMPORTED_MODULE_0__["lightGreen"], bg: _config__WEBPACK_IMPORTED_MODULE_0__["darkGreen"] },
    [_constants__WEBPACK_IMPORTED_MODULE_1__["INFECTED"]]: { fg: _config__WEBPACK_IMPORTED_MODULE_0__["lightRed"], bg: _config__WEBPACK_IMPORTED_MODULE_0__["darkRed"] }
};

/* harmony default export */ __webpack_exports__["default"] = (sprite => {
    const { context: ctx, x, y, status } = sprite;
    const { fg, bg } = spriteMapping[status];
    ctx.save();
    ctx.translate(x, y);
    ctx.lineWidth = 3;
    ctx.strokeStyle = fg;
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.moveTo(-40, 40);
    ctx.lineTo(-40, 20);
    ctx.arc(-20, 20, 20, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["degreesToRadians"])(180), Object(_utils__WEBPACK_IMPORTED_MODULE_2__["degreesToRadians"])(270));
    ctx.moveTo(-20, 0);
    ctx.lineTo(20, 0);
    ctx.arc(20, 20, 20, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["degreesToRadians"])(270), Object(_utils__WEBPACK_IMPORTED_MODULE_2__["degreesToRadians"])(0));
    ctx.lineTo(40, 40);
    ctx.lineTo(-40, 40);
    ctx.moveTo(-23, 20);
    ctx.lineTo(-23, 40);
    ctx.moveTo(23, 20);
    ctx.lineTo(23, 40);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -15, 25, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["degreesToRadians"])(0), Object(_utils__WEBPACK_IMPORTED_MODULE_2__["degreesToRadians"])(360));
    ctx.fill();
    ctx.stroke();
    ctx.restore();
});


/***/ }),

/***/ "./src/user/index.js":
/*!***************************!*\
  !*** ./src/user/index.js ***!
  \***************************/
/*! exports provided: Users, createUser, drawUser, ONLINE, OFFLINE, INFECTED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Users */ "./src/user/Users.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Users", function() { return _Users__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _createUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createUser */ "./src/user/createUser.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createUser", function() { return _createUser__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _drawUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawUser */ "./src/user/drawUser.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawUser", function() { return _drawUser__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/user/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ONLINE", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["ONLINE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OFFLINE", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["OFFLINE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INFECTED", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["INFECTED"]; });







/***/ }),

/***/ "./src/user/utils/allInfected.js":
/*!***************************************!*\
  !*** ./src/user/utils/allInfected.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/user/constants.js");


/* harmony default export */ __webpack_exports__["default"] = (users => users.every(user => user.state === _constants__WEBPACK_IMPORTED_MODULE_0__["INFECTED"]));


/***/ }),

/***/ "./src/user/utils/index.js":
/*!*********************************!*\
  !*** ./src/user/utils/index.js ***!
  \*********************************/
/*! exports provided: allInfected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _allInfected__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./allInfected */ "./src/user/utils/allInfected.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "allInfected", function() { return _allInfected__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/utils/calculateCameraCoordinates.js":
/*!*************************************************!*\
  !*** ./src/utils/calculateCameraCoordinates.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");


/* harmony default export */ __webpack_exports__["default"] = (({ col, row }) => ({
    sx: (col - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] / 2,
    sy: (row - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] + _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] / 2
}));


/***/ }),

/***/ "./src/utils/calculateRotation.js":
/*!****************************************!*\
  !*** ./src/utils/calculateRotation.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/utils/index.js");
/* harmony import */ var _directions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../directions */ "./src/directions/index.js");



/* harmony default export */ __webpack_exports__["default"] = (direction => {
    switch (direction) {
        case _directions__WEBPACK_IMPORTED_MODULE_1__["N"]:
            return Object(___WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(0);
        case _directions__WEBPACK_IMPORTED_MODULE_1__["E"]:
            return Object(___WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(90);
        case _directions__WEBPACK_IMPORTED_MODULE_1__["S"]:
            return Object(___WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(180);
        case _directions__WEBPACK_IMPORTED_MODULE_1__["W"]:
            return Object(___WEBPACK_IMPORTED_MODULE_0__["degreesToRadians"])(270);
        default:
            return null;
    }
});


/***/ }),

/***/ "./src/utils/calculateRowAndCol.js":
/*!*****************************************!*\
  !*** ./src/utils/calculateRowAndCol.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (({ sx, sy, tileWidth, tileHeight }) => ({
    col: Math.floor(sx / tileWidth) + 1,
    row: Math.floor(sy / tileHeight) + 1
}));


/***/ }),

/***/ "./src/utils/collides.js":
/*!*******************************!*\
  !*** ./src/utils/collides.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((sprite1, sprite2) => {
    const dx = sprite1.x - sprite2.x;
    const dy = sprite1.y - sprite2.y;
    return Math.sqrt(dx * dx + dy * dy) < sprite1.collisionRadius + sprite2.collisionRadius;
});


/***/ }),

/***/ "./src/utils/degreesToRadians.js":
/*!***************************************!*\
  !*** ./src/utils/degreesToRadians.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (degrees => (degrees * Math.PI) / 180);


/***/ }),

/***/ "./src/utils/getRandomInt.js":
/*!***********************************!*\
  !*** ./src/utils/getRandomInt.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((a, b) => {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
});


/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: calculateCameraCoordinates, calculateRotation, degreesToRadians, getRandomInt, transformMapCoordinates, multiCollides, collides, calculateRowAndCol */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calculateCameraCoordinates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculateCameraCoordinates */ "./src/utils/calculateCameraCoordinates.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calculateCameraCoordinates", function() { return _calculateCameraCoordinates__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _calculateRotation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculateRotation */ "./src/utils/calculateRotation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calculateRotation", function() { return _calculateRotation__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _degreesToRadians__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./degreesToRadians */ "./src/utils/degreesToRadians.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "degreesToRadians", function() { return _degreesToRadians__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _getRandomInt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getRandomInt */ "./src/utils/getRandomInt.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRandomInt", function() { return _getRandomInt__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _transformMapCoordinates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transformMapCoordinates */ "./src/utils/transformMapCoordinates.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transformMapCoordinates", function() { return _transformMapCoordinates__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _multiCollides__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./multiCollides */ "./src/utils/multiCollides.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "multiCollides", function() { return _multiCollides__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _collides__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./collides */ "./src/utils/collides.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "collides", function() { return _collides__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _calculateRowAndCol__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./calculateRowAndCol */ "./src/utils/calculateRowAndCol.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calculateRowAndCol", function() { return _calculateRowAndCol__WEBPACK_IMPORTED_MODULE_7__["default"]; });











/***/ }),

/***/ "./src/utils/multiCollides.js":
/*!************************************!*\
  !*** ./src/utils/multiCollides.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/utils/index.js");


/* harmony default export */ __webpack_exports__["default"] = ((arr1, arr2) => {
    const collisions = [];
    for (let i1 = 0; i1 < arr1.length; i1++) {
        const sprite1 = arr1[i1];
        for (let i2 = 0; i2 < arr2.length; i2++) {
            const sprite2 = arr2[i2];
            if (Object(___WEBPACK_IMPORTED_MODULE_0__["collides"])(sprite1, sprite2)) {
                collisions.push([sprite1, sprite2]);
            }
        }
    }
    return collisions;
});


/***/ }),

/***/ "./src/utils/transformMapCoordinates.js":
/*!**********************************************!*\
  !*** ./src/utils/transformMapCoordinates.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");


/**
 * Transforms coordinates relative to the map (either row/col or x/y)
 * to coordinates on the canvas.
 *
 * @param map The map to calculate the coordinates from
 * @param row The row on the map (use either this or y)
 * @param col The column on the map (use either this x)
 * @param x The X coordinate on the map (use either this or col)
 * @param y The Y coordinate on the map (use either this or row)
 * @return {{x: number, y: number}}
 */
/* harmony default export */ __webpack_exports__["default"] = ((map, { row, col, x, y }) => {
    const { tileWidth, tileHeight, sx, sy } = map;
    const calcX = x !== undefined ? x : (col - 1) * tileWidth;
    const calcY = y !== undefined ? y : (row - 1) * tileHeight;
    const nextX = calcX - sx + _config__WEBPACK_IMPORTED_MODULE_0__["canvasWidth"] / 2 + tileWidth / 2;
    const nextY = calcY - sy + _config__WEBPACK_IMPORTED_MODULE_0__["canvasHeight"] / 2 + tileHeight / 2;
    return { x: nextX, y: nextY };
});


/***/ }),

/***/ "./src/virus/createVirus.js":
/*!**********************************!*\
  !*** ./src/virus/createVirus.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! . */ "./src/virus/index.js");
/* global kontra */





/* harmony default export */ __webpack_exports__["default"] = (map => {
    const { x, y } = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["transformMapCoordinates"])(map, { row: _config__WEBPACK_IMPORTED_MODULE_0__["virusStartRow"], col: _config__WEBPACK_IMPORTED_MODULE_0__["virusStartCol"] });
    return kontra.sprite({
        x,
        y,
        collisionRadius: _config__WEBPACK_IMPORTED_MODULE_0__["collisionRadius"],
        map,
        mapX: (_config__WEBPACK_IMPORTED_MODULE_0__["virusStartCol"] - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"],
        mapY: (_config__WEBPACK_IMPORTED_MODULE_0__["virusStartRow"] - 1) * _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"],
        direction: _config__WEBPACK_IMPORTED_MODULE_0__["virusStartDirection"],
        update() {
            ({ x: this.x, y: this.y, mapX: this.mapX, mapY: this.mapY, direction: this.direction } = Object(___WEBPACK_IMPORTED_MODULE_2__["updateVirus"])(this));
        },
        render() {
            Object(___WEBPACK_IMPORTED_MODULE_2__["drawVirus"])(this);
        }
    });
});


/***/ }),

/***/ "./src/virus/drawDebugVirus.js":
/*!*************************************!*\
  !*** ./src/virus/drawDebugVirus.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");


// noinspection JSUnusedGlobalSymbols
/* harmony default export */ __webpack_exports__["default"] = (sprite => {
    const { context: ctx, x, y } = sprite;
    ctx.save();
    ctx.translate(x, y);

    ctx.lineWidth = 1;
    ctx.strokeStyle = _config__WEBPACK_IMPORTED_MODULE_0__["lightRed"];
    ctx.fillStyle = _config__WEBPACK_IMPORTED_MODULE_0__["darkRed"];
    ctx.beginPath();
    ctx.moveTo(-49, -49);
    ctx.lineTo(50, -49);
    ctx.lineTo(50, 50);
    ctx.lineTo(-49, 50);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-49, 0);
    ctx.lineTo(50, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -49);
    ctx.lineTo(0, 50);
    ctx.stroke();

    ctx.restore();
});


/***/ }),

/***/ "./src/virus/drawVirus.js":
/*!********************************!*\
  !*** ./src/virus/drawVirus.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");



/* harmony default export */ __webpack_exports__["default"] = (sprite => {
    const { context: ctx, x, y } = sprite;
    ctx.save();
    ctx.translate(x, y);

    ctx.lineWidth = 3;
    ctx.strokeStyle = _config__WEBPACK_IMPORTED_MODULE_0__["lightRed"];
    ctx.fillStyle = _config__WEBPACK_IMPORTED_MODULE_0__["darkRed"];
    ctx.beginPath();
    ctx.moveTo(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(-5, 5), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(-5, -25)); // 1
    ctx.lineTo(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(5, 50), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(-5, -50)); // 2
    ctx.lineTo(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(5, 25), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(-5, 5)); // 3
    ctx.lineTo(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(5, 50), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(5, 50)); // 4
    ctx.lineTo(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(-5, 5), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(5, 25)); // 5
    ctx.lineTo(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(-5, -50), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(5, 50)); // 6
    ctx.lineTo(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(-5, -25), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(-5, 5)); // 7
    ctx.lineTo(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(-5, -50), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(-5, -50)); // 8
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
});


/***/ }),

/***/ "./src/virus/index.js":
/*!****************************!*\
  !*** ./src/virus/index.js ***!
  \****************************/
/*! exports provided: createVirus, updateVirus, drawVirus, drawDebugVirus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createVirus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createVirus */ "./src/virus/createVirus.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createVirus", function() { return _createVirus__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _updateVirus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateVirus */ "./src/virus/updateVirus.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateVirus", function() { return _updateVirus__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _drawVirus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawVirus */ "./src/virus/drawVirus.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawVirus", function() { return _drawVirus__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _drawDebugVirus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawDebugVirus */ "./src/virus/drawDebugVirus.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawDebugVirus", function() { return _drawDebugVirus__WEBPACK_IMPORTED_MODULE_3__["default"]; });







/***/ }),

/***/ "./src/virus/updateVirus.js":
/*!**********************************!*\
  !*** ./src/virus/updateVirus.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _directions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../directions */ "./src/directions/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/virus/utils/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ "./src/config.js");





const visits = Array(_config__WEBPACK_IMPORTED_MODULE_3__["mapHeight"])
    .fill()
    .map(() => Array(_config__WEBPACK_IMPORTED_MODULE_3__["mapWidth"]).fill(0));

/* harmony default export */ __webpack_exports__["default"] = (sprite => {
    let { direction, x, y } = sprite;
    const { map } = sprite;
    const { mapX, mapY } = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["moveVirus"])(sprite);
    if (Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isInTheMiddle"])({ mapX, mapY })) {
        const tile = map.tileAtLayer('main', { x, y });
        const col = mapX / _config__WEBPACK_IMPORTED_MODULE_3__["tileWidth"] + 1;
        const row = mapY / _config__WEBPACK_IMPORTED_MODULE_3__["tileHeight"] + 1;
        visits[row - 1][col - 1] = visits[row - 1][col - 1] + 1;
        if (Object(_directions__WEBPACK_IMPORTED_MODULE_0__["isIntersection"])(tile)) {
            const { allowed } = _directions__WEBPACK_IMPORTED_MODULE_0__["directionSwitchMap"][tile];
            const viable = allowed.filter(
                dir => dir !== Object(_directions__WEBPACK_IMPORTED_MODULE_0__["getOppositeDirection"])(direction) && Object(_directions__WEBPACK_IMPORTED_MODULE_0__["directionIsAllowed"])(map, { x, y }, dir)
            );
            const bestDirections = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getBestDirection"])({ viable, visits, row, col });
            direction = bestDirections[Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(0, bestDirections.length - 1)];
        } else {
            direction = Object(_directions__WEBPACK_IMPORTED_MODULE_0__["switchDirection"])(map, { x, y }, direction);
        }
    }
    ({ x, y } = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["transformMapCoordinates"])(map, { x: mapX, y: mapY }));
    return {
        direction,
        mapY,
        mapX,
        x,
        y
    };
});


/***/ }),

/***/ "./src/virus/utils/getBestDirections.js":
/*!**********************************************!*\
  !*** ./src/virus/utils/getBestDirections.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _directions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../directions */ "./src/directions/index.js");


/* harmony default export */ __webpack_exports__["default"] = (({ viable, visits, row, col }) => {
    let minVis = Number.MAX_SAFE_INTEGER;
    return viable
        .map(dir => {
            let vis;
            switch (dir) {
                case _directions__WEBPACK_IMPORTED_MODULE_0__["N"]:
                    vis = visits[row - 2][col - 1];
                    break;
                case _directions__WEBPACK_IMPORTED_MODULE_0__["E"]:
                    vis = visits[row - 1][col];
                    break;
                case _directions__WEBPACK_IMPORTED_MODULE_0__["S"]:
                    vis = visits[row][col - 1];
                    break;
                case _directions__WEBPACK_IMPORTED_MODULE_0__["W"]:
                    vis = visits[row - 1][col - 2];
                    break;
                default:
            }
            minVis = vis < minVis ? vis : minVis;
            return { dir, vis };
        })
        .filter(({ vis }) => vis === minVis)
        .map(({ dir }) => dir);
});


/***/ }),

/***/ "./src/virus/utils/index.js":
/*!**********************************!*\
  !*** ./src/virus/utils/index.js ***!
  \**********************************/
/*! exports provided: isInTheMiddle, moveVirus, getBestDirection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isInTheMiddle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isInTheMiddle */ "./src/virus/utils/isInTheMiddle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isInTheMiddle", function() { return _isInTheMiddle__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _moveVirus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moveVirus */ "./src/virus/utils/moveVirus.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "moveVirus", function() { return _moveVirus__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _getBestDirections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getBestDirections */ "./src/virus/utils/getBestDirections.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBestDirection", function() { return _getBestDirections__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./src/virus/utils/isInTheMiddle.js":
/*!******************************************!*\
  !*** ./src/virus/utils/isInTheMiddle.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ "./src/config.js");


/* harmony default export */ __webpack_exports__["default"] = (({ mapX, mapY }) => mapX % _config__WEBPACK_IMPORTED_MODULE_0__["tileWidth"] === 0 && mapY % _config__WEBPACK_IMPORTED_MODULE_0__["tileHeight"] === 0);


/***/ }),

/***/ "./src/virus/utils/moveVirus.js":
/*!**************************************!*\
  !*** ./src/virus/utils/moveVirus.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _directions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../directions */ "./src/directions/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config */ "./src/config.js");



/* harmony default export */ __webpack_exports__["default"] = (({ mapX, mapY, direction }) => {
    switch (direction) {
        case _directions__WEBPACK_IMPORTED_MODULE_0__["N"]:
            return { mapX, mapY: mapY - _config__WEBPACK_IMPORTED_MODULE_1__["virusSpeed"] };
        case _directions__WEBPACK_IMPORTED_MODULE_0__["E"]:
            return { mapX: mapX + _config__WEBPACK_IMPORTED_MODULE_1__["virusSpeed"], mapY };
        case _directions__WEBPACK_IMPORTED_MODULE_0__["S"]:
            return { mapX, mapY: mapY + _config__WEBPACK_IMPORTED_MODULE_1__["virusSpeed"] };
        case _directions__WEBPACK_IMPORTED_MODULE_0__["W"]:
            return { mapX: mapX - _config__WEBPACK_IMPORTED_MODULE_1__["virusSpeed"], mapY };
        default:
            return { mapX, mapY };
    }
});


/***/ })

/******/ });
//# sourceMappingURL=game.js.map