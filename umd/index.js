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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Gallery = __webpack_require__(1);

	var _Gallery2 = _interopRequireDefault(_Gallery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Gallery2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _GalleryBox = __webpack_require__(3);

	var _GalleryBox2 = _interopRequireDefault(_GalleryBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DEFAULTS = {
		containerHeight: 400,
		fullSize: false,
		hlColor: '#ff8c00',
		hlSize: 16,
		jewelSize: 40,
		jewelSpacing: 16,
		orientation: 'vertical',
		overlay: false,
		posX: 'left',
		posY: 'top'
	};
	var Gallery = _react2.default.createClass({
		displayName: 'Gallery',
		getInitialState: function getInitialState() {
			return { index: 0 };
		},
		handleEnter: function handleEnter(i) {
			this.setState({ index: i });
		},
		getConfig: function getConfig(params) {
			if (params == null || !params) return false;

			var config = this.props.config;

			var setConfig = {};
			if (config) {
				params.map(function (param) {
					if (config[param]) {
						setConfig[param] = config[param];
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
			return setConfig;
		},
		getItemLayout: function getItemLayout() {
			var _getConfig = this.getConfig(['orientation']);

			var orientation = _getConfig.orientation;

			var style = void 0;
			switch (orientation) {
				case 'vertical':
					style = {
						mainContainer: {},
						jewel: {}
					};
					break;
				case 'horizontal':
					style = {
						mainContainer: {},
						jewel: {
							float: 'left'
						}
					};
					break;
				default:
					style = {
						mainContainer: {},
						jewel: {}
					};
			}
			return this.getOrientation(style);
		},
		getOrientation: function getOrientation(style) {
			return this.getOrientationY(this.getOrientationX(style));
		},
		getOrientationX: function getOrientationX(style) {
			var _getConfig2 = this.getConfig(['posX']);

			var posX = _getConfig2.posX;

			switch (posX) {
				case 'right':
					style = _extends({}, style, {
						jewelContainer: _extends({
							position: 'absolute',
							right: 0
						}, style.jewelContainer)
					});
					break;
				case 'left':
				default:
					style = _extends({}, style, {
						jewelContainer: _extends({
							position: 'absolute',
							bottom: 0
						}, style.jewelContainer)
					});
			}
			return style;
		},
		getOrientationY: function getOrientationY(style) {
			var _getConfig3 = this.getConfig(['posY']);

			var posY = _getConfig3.posY;

			switch (posY) {
				case 'top':
					style = _extends({}, style, {
						jewelContainer: _extends({
							position: 'absolute',
							top: 0
						}, style.jewelContainer)
					});
					break;
				case 'bot':
				default:
					style = _extends({}, style, {
						jewelContainer: _extends({
							position: 'absolute',
							bottom: 0
						}, style.jewelContainer)
					});
			}
			return style;
		},
		buildJewelStyle: function buildJewelStyle() {
			var config = this.getConfig(['hlSize', 'hlColor', 'jewelSize', 'jewelSpacing']);
			var style = {
				size: config.jewelSize ? config.jewelSize : 40,
				hlColor: config.hlColor ? config.hlColor : 'darkorange',
				hlSize: config.hlSize ? config.hlSize : 15,
				spacing: config.jewelSpacing ? config.jewelSpacing : 0
			};
			return style;
		},
		buildContainerStyle: function buildContainerStyle() {
			var config = this.getConfig(['overlay', 'hlSize', 'posY', 'posX', 'orientation', 'jewelSize']);
			var containerStyle = {};
			var paddingSize = parseInt(config.jewelSize) + parseInt(config.hlSize) / 2 + 4 + 'px';
			if (config.overlay) {
				containerStyle = {
					padding: '0px'
				};
			} else {
				var derPadding = void 0;
				if (config.orientation === 'horizontal') {
					if (config.posY === 'top') {
						derPadding = paddingSize + ' 0 0 0';
					} else {
						derPadding = '0 0 ' + paddingSize + ' 0';
					}
				} else {
					if (config.posX === 'right') {
						derPadding = '0 ' + paddingSize + ' 0 0';
					} else {
						derPadding = '0 0 0 ' + paddingSize;
					}
				}
				containerStyle = {
					padding: derPadding
				};
			}
			return containerStyle;
		},
		render: function render() {
			var _props = this.props;
			var style = _props.style;
			var images = _props.images;
			var jewelSize = _props.jewelSize;

			var imageLoc = images[this.state.index];
			var itemlayout = this.getItemLayout();

			var galleryMain = {
				height: this.getConfig(['cHeight'])['cHeight'] + 'px',
				width: '100%',
				backgroundImage: "url('" + imageLoc + "')",
				backgroundSize: 'contain',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center'
			};

			var jewelStyle = this.buildJewelStyle();
			var imageJewels = images.length > 0 ? images.map(function (img, i) {
				var n = i;
				var imgLocation = images[i];

				return _react2.default.createElement(
					'div',
					{ style: itemlayout.jewel, onMouseEnter: this.handleEnter.bind(null, n), key: i },
					_react2.default.createElement(_GalleryBox2.default, { config: jewelStyle, orientation: this.getConfig(['orientation']).orientation, index: this.state.index, place: i, img: img })
				);
			}.bind(this)) : null;
			var containerStyle = this.buildContainerStyle();
			return _react2.default.createElement(
				'div',
				{ style: { position: 'relative' } },
				_react2.default.createElement(
					'div',
					{ style: _extends({}, containerStyle, { position: 'relative', width: '100%', height: '100%' }) },
					_react2.default.createElement('div', { style: galleryMain, ref: 'section' })
				),
				_react2.default.createElement(
					'div',
					{ style: itemlayout.jewelContainer },
					imageJewels
				)
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
				width: size,
				height: size,
				margin: orientation === 'horizontal' ? spacePx : spacePx,
				backgroundImage: "url('" + img + "')",
				boxShadow: index === place ? boxShadow : 'none',
				border: index === place ? border : '1px solid grey'
			};
			return imgStyle;
		},
		render: function render() {

			var boxStyle = this.buildBox();

			return _react2.default.createElement('div', { style: boxStyle });
		}
	});

	exports.default = GalleryBox;

/***/ }
/******/ ])
});
;