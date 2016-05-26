(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Gallery"] = factory(require("react"));
	else
		root["Gallery"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Gallery = __webpack_require__(1);

	var _Gallery2 = _interopRequireDefault(_Gallery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _Gallery2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _GalleryBox = __webpack_require__(3);

	var _GalleryBox2 = _interopRequireDefault(_GalleryBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var DEFAULTS = {
		bkgSize: 'contain',
		containerHeight: '350',
		containerWidth: '100%',
		fullSize: false,
		injectJewelB: false,
		injectionIdentifier: null,
		main: {
			overlay: false,
			hlColor: '#ff8c00',
			hlSize: 16,
			jewelSize: 40,
			jewelSpacing: 8,
			orientation: 'vertical',
			posX: 'left',
			posY: 'top'
		},
		secondary: {
			overlay: false,
			hlColor: '#ff8c00',
			hlSize: 16,
			jewelSize: 40,
			jewelSpacing: 8,
			orientation: 'horizontal',
			posX: 'left',
			posY: 'bot'
		}
	};

	var Gallery = _react2.default.createClass({
		displayName: 'Gallery',
		getInitialState: function getInitialState() {
			return { main: 0, secondary: 0 };
		},
		handleEnter: function handleEnter(i, place) {
			var spot = place === 'secondary' ? 'secondary' : 'main';

			var newState = _objectWithoutProperties(this.state, []);

			newState[spot] = i;
			this.setState(newState);
		},
		changesecondary: function changesecondary(i) {
			this.setState({ secondary: i });
		},
		getGalleryType: function getGalleryType() {
			var images = this.props.images;

			var galleryType = void 0;
			if (Array.isArray(images)) {
				if (images.every(function (i) {
					return Array.isArray(i);
				})) {
					galleryType = 2;
				} else if (images.every(function (i) {
					return typeof i === 'string';
				})) {
					galleryType = 1;
				} else {
					galleryType = 0;
				}
			} else {
				galleryType = 3;
			}
			return galleryType;
		},
		getConfig: function getConfig(place, params) {
			if (params === null || !params) return false;
			var config = this.props.config;

			var setConfig = {};
			var configPlace = place ? config[place] ? config[place] : DEFAULTS[place] : DEFAULTS;
			// Check datatype of params passed, collect config based on type
			if (Array.isArray(params)) {
				if (configPlace) {
					params.map(function (param) {
						if (configPlace[param]) {
							setConfig[param] = configPlace[param];
						} else {
							setConfig[param] = DEFAULTS[param];
						}
						return;
					});
				} else {
					params.map(function (param) {
						setConfig[param] = DEFAULTS[param];
						return;
					});
				}
			} else if (typeof params === 'string') {
				if (configPlace[params]) {
					setConfig = configPlace[params];
				} else {
					setConfig = DEFAULTS[params];
				}
			} else if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
				if (config) {
					Object.keys(params).map(function (param) {
						if (configPlace[param]) {
							setConfig[param] = configPlace[param];
						} else {
							setConfig[param] = DEFAULTS[param];
						}
						return;
					});
				} else {
					Object.keys(params).map(function (param) {
						setConfig[param] = DEFAULTS[param];
						return;
					});
				}
			} else {
				return false;
			}

			return setConfig;
		},
		getConfigObject: function getConfigObject(obj) {
			if (!DEFAULTS[obj]) return false;
			var config = this.props.config;


			var configObj = {};
			Object.keys(DEFAULTS[obj]).map(function (key) {
				configObj[key] = config[obj][key] ? config[obj][key] : DEFAULTS[obj][key];
			});
			return configObj;
		},
		buildJewelStyle: function buildJewelStyle(place) {
			if (!place) return DEFAULTS.main;

			var configObj = this.getConfigObject(place);
			var style = {
				container: {
					float: configObj.orientation === 'horizontal' ? 'left' : '',
					zIndex: 900
				},
				jewel: {
					size: configObj.jewelSize,
					hlSize: configObj.hlSize,
					hlColor: configObj.hlColor,
					spacing: configObj.jewelSpacing
				}
			};
			return style;
		},
		buildJewelContainerStyle: function buildJewelContainerStyle(kind) {

			var configObj = this.getConfigObject(kind);

			var verticalStyle = configObj.posY === 'top' ? { top: 0 } : { bottom: 0 };

			var horizontalStyle = configObj.posX === 'left' ? { left: 0 } : { right: 0 };

			var style = _extends({
				position: 'absolute'
			}, verticalStyle, horizontalStyle);
			return style;
		},
		buildContainerStyle: function buildContainerStyle(kind) {
			var containerConfig = this.getConfig(null, ['overlay', 'containerWidth', 'containerHeight', 'bkgSize']);

			var mainConfig = this.getConfigObject('main');
			var secondaryConfig = this.getConfigObject('secondary');

			var mainPaddingSize = parseInt(mainConfig.jewelSize) + parseInt(mainConfig.hlSize) / 2 + 4;
			var secondaryPaddingSize = parseInt(secondaryConfig.jewelSize) + parseInt(secondaryConfig.hlSize) / 2 + 4;

			var padding = {
				left: 0,
				right: 0,
				bottom: 0,
				top: 0
			};

			var gallType = this.getGalleryType();
			switch (gallType) {
				case 2:
					if (!mainConfig.overlay) {
						if (!secondaryConfig.overlay) {
							// First check if main Config is Horizontal
							if (mainConfig.orientation === 'horizontal') {
								if (mainConfig.posY === 'top') {
									padding.top += mainPaddingSize;
								} else {
									padding.bottom += mainPaddingSize;
								}
								if (secondaryConfig.orientation === 'horizontal') {
									if (secondaryConfig.posY === 'top') {
										padding.top += mainPaddingSize;
									} else {
										padding.bottom += mainPaddingSize;
									}
								} else {
									if (secondaryConfig.posX === 'left') {
										padding.left += mainPaddingSize;
									} else {
										padding.right += mainPaddingSize;
									}
								}
							} else {
								if (mainConfig.posX === 'left') {
									padding.left += mainPaddingSize;
								} else {
									padding.right += mainPaddingSize;
								}
								if (secondaryConfig.orientation === 'vertical') {
									if (secondaryConfig.posX === 'top') {
										padding.top += mainPaddingSize;
									} else {
										padding.bottom += mainPaddingSize;
									}
								} else {
									if (secondaryConfig.posY === 'top') {
										padding.top += mainPaddingSize;
									} else {
										padding.bottom += mainPaddingSize;
									}
								}
							}
						} else {
							// If we're here, then Main Overlay is true AND secondary Overlay is true
							// So do nothing, all Padding is already set to Zero
						}
					}
					break;
				case 1:
				default:
					if (!mainConfig.overlay) {
						if (mainConfig.orientation === 'horizontal') {
							if (mainConfig.posY === 'top') {
								padding.top += mainPaddingSize;
							} else {
								padding.bottom += mainPaddingSize;
							}
						} else {
							if (mainConfig.posX === 'left') {
								padding.left += mainPaddingSize;
							} else {
								padding.right += mainPaddingSize;
							}
						}
					}
			};

			var containerStyle = {};

			var derPadding = padding.top + 'px ' + padding.right + 'px ' + padding.bottom + 'px ' + padding.left + 'px';

			containerStyle = {
				padding: derPadding
			};

			return containerStyle;
		},
		buildJewels: function buildJewels() {
			var jewelContainers = {};
			var gallType = this.getGalleryType();
			if (Array.isArray(this.props.images)) {
				switch (gallType) {
					case 2:
						jewelContainers = this.buildDualArray(this.props.images);
						break;
					case 1:
					default:
						jewelContainers = [this.buildSingleArray(this.props.images, 'main'), null];
				}
			}
			return jewelContainers;
		},
		buildDualArray: function buildDualArray(images) {
			var mainArray = void 0,
			    secondaryArray = void 0;
			var _state = this.state;
			var main = _state.main;
			var secondary = _state.secondary;

			secondaryArray = images.map(function (imgArray, i) {
				if (i == secondary) {
					mainArray = this.buildSingleArray(imgArray, 'main');
				}
				return this.buildJewel(imgArray[0], i, 'secondary');
			}.bind(this));
			return [mainArray, secondaryArray];
		},
		buildSingleArray: function buildSingleArray(images, place) {
			var imageJewels = images.length > 0 ? images.map(function (img, i) {
				var imgLocation = images[i];
				return this.buildJewel(img, i, place);
			}.bind(this)) : null;
			return imageJewels;
		},
		buildJewel: function buildJewel(img, i, place) {
			var jewelStyle = this.buildJewelStyle(place);
			return _react2.default.createElement(
				'div',
				{ style: jewelStyle.container, onMouseEnter: this.handleEnter.bind(null, i, place), key: place + '' + i },
				_react2.default.createElement(_GalleryBox2.default, { config: jewelStyle.jewel, orientation: this.getConfig(place, 'orientation'), index: this.state[place], spot: i, place: place, img: img })
			);
		},
		injectArray: function injectArray() {},
		getGalleryImage: function getGalleryImage() {
			var _state2 = this.state;
			var main = _state2.main;
			var secondary = _state2.secondary;
			var images = this.props.images;

			var kind = this.getGalleryType();
			switch (kind) {
				case 2:
					return images[secondary][main];
					break;
				case 1:
				default:
					return images[main];
			};
		},
		render: function render() {
			if (!Array.isArray(this.props.images)) return _react2.default.createElement(
				'div',
				{ style: { width: '100%', height: '100%', display: 'flex' } },
				_react2.default.createElement(
					'div',
					{ style: { margin: 'auto' } },
					'No Images'
				)
			);

			var _props = this.props;
			var style = _props.style;
			var jewelContainerStyle = _props.jewelContainerStyle;
			var jewelSecondaryContainerStyle = _props.jewelSecondaryContainerStyle;
			var galleryStyle = _props.galleryStyle;
			var images = _props.images;
			var jewelSize = _props.jewelSize;


			var imageLoc = this.getGalleryImage();
			var galleryMain = {
				height: this.getConfig(null, 'containerHeight'),
				width: this.getConfig(null, 'containerWidth'),
				backgroundImage: "url('" + imageLoc + "')",
				backgroundSize: this.getConfig(null, 'bkgSize') || 'contain',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center'
			};
			var jewelMainContainer = this.buildJewelContainerStyle('main');
			var jewelSecondaryContainer = this.buildJewelContainerStyle('secondary');
			var jewels = this.buildJewels();
			var jewelSet = Array.isArray(jewels[0]) ? jewels[0] : jewels;
			var jewelSecondarySet = Array.isArray(jewels[1]) ? _react2.default.createElement(
				'div',
				{ style: _extends({}, jewelSecondaryContainer, jewelSecondaryContainerStyle) },
				jewels[1]
			) : null;

			var containerStyle = this.buildContainerStyle();
			return _react2.default.createElement(
				'div',
				{ style: _extends({ position: 'relative', height: '100%', width: '100%' }, style) },
				_react2.default.createElement(
					'div',
					{ style: _extends({}, containerStyle, { position: 'relative', width: '100%', height: '100%' }) },
					_react2.default.createElement('div', { style: _extends({}, galleryMain, galleryStyle), ref: 'section' })
				),
				_react2.default.createElement(
					'div',
					{ style: _extends({}, jewelMainContainer, jewelContainerStyle) },
					jewelSet
				),
				jewelSecondarySet
			);
		}
	});

	exports.default = Gallery;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GalleryBox = _react2.default.createClass({
		displayName: 'GalleryBox',
		getInitialState: function getInitialState() {
			return {};
		},
		buildBox: function buildBox() {
			var _props = this.props;
			var img = _props.img;
			var config = _props.config;
			var spot = _props.spot;
			var place = _props.place;
			var orientation = _props.orientation;
			var index = _props.index;
			var hlColor = config.hlColor;
			var hlSize = config.hlSize;
			var spacing = config.spacing;
			var size = config.size;


			var boxShadow = '0 0 ' + hlSize + 'px ' + hlColor;
			var border = '1px solid ' + hlColor;
			var spacePx = spacing + 'px';
			var hlPx = hlSize + 'px';

			var imgStyle = {
				backgroundColor: 'white',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				padding: 4,
				zIndex: 9001,
				width: size + 'px',
				height: size + 'px',
				margin: orientation === 'horizontal' ? spacePx : spacePx,
				backgroundImage: "url('" + img + "')",
				boxShadow: index === spot ? boxShadow : 'none',
				border: index === spot ? border : '1px solid grey'
			};
			return imgStyle;
		},
		render: function render() {

			var boxStyle = this.buildBox();

			return _react2.default.createElement('div', { style: _extends({}, boxStyle, this.props.style) });
		}
	});

	exports.default = GalleryBox;

/***/ }
/******/ ])
});
;