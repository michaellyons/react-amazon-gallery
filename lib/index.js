(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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
	exports.Gallery = undefined;

	var _Gallery = __webpack_require__(1);

	var _Gallery2 = _interopRequireDefault(_Gallery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Gallery = _Gallery2.default;
	exports.default = { Gallery: _Gallery2.default };

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _GalleryBox = __webpack_require__(3);

	var _GalleryBox2 = _interopRequireDefault(_GalleryBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DEFAULTS = {
	  jewelSize: 40,
	  hlColor: 'darkorange',
	  hlSize: 15
	};
	var Gallery = _react2.default.createClass({
	  displayName: 'Gallery',
	  getInitialState: function getInitialState() {
	    return { index: 0 };
	  },
	  handleEnter: function handleEnter(i) {
	    this.setState({ index: i });
	  },
	  getItemLayout: function getItemLayout() {
	    var layout = this.props.layout;

	    var style = void 0;
	    switch (layout) {
	      case 'vertical':
	        style = {
	          mainContainer: {},
	          jewel: {}
	        };
	        break;
	      case 'horizontal':
	      default:
	        style = {
	          mainContainer: {},
	          jewel: {
	            float: 'left'
	          }
	        };
	    }
	    return this.getOrientation(style);
	  },
	  getOrientation: function getOrientation(style) {
	    var posY = this.props.posY;

	    switch (posY) {
	      case 'top':
	        style = _extends({}, style, {
	          jewelContainer: {
	            position: 'absolute',
	            left: 2,
	            top: 2
	          }
	        });
	        break;
	      case 'bot':
	      default:
	        style = _extends({}, style, {
	          jewelContainer: {
	            position: 'absolute',
	            left: 2,
	            bottom: 2
	          }
	        });
	    }
	    return style;
	  },
	  buildJewelStyle: function buildJewelStyle() {
	    var _props = this.props;
	    var jewelSize = _props.jewelSize;
	    var jewelHLColor = _props.jewelHLColor;
	    var jewelHLSize = _props.jewelHLSize;

	    var style = {
	      size: jewelSize ? jewelSize : 40,
	      hlColor: jewelHLColor ? jewelHLColor : 'darkorange',
	      hlSize: jewelHLSize ? jewelHLSize : 15
	    };
	    return style;
	  },
	  buildContainerStyle: function buildContainerStyle() {
	    var jewelOverlay = this.props.jewelOverlay;

	    var containerStyle = {};
	    if (jewelOverlay) {} else {
	      containerStyle = {
	        padding: '0 0 50 0'
	      };
	    }
	    return containerStyle;
	  },
	  render: function render() {
	    var _props2 = this.props;
	    var prize = _props2.prize;
	    var style = _props2.style;
	    var images = _props2.images;
	    var jewelSize = _props2.jewelSize;

	    var imageLoc = images[this.state.index];
	    var itemlayout = this.getItemLayout();

	    var galleryMain = {
	      height: '450px',
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
	        _react2.default.createElement(_GalleryBox2.default, { size: jewelStyle.size, hlColor: jewelStyle.hlColor, hlSize: jewelStyle.hlSize, index: this.state.index, place: i, pid: this.props.pid, img: img })
	      );
	    }.bind(this)) : null;
	    var containerStyle = this.buildContainerStyle();
	    return _react2.default.createElement(
	      'div',
	      { style: containerStyle },
	      _react2.default.createElement(
	        'div',
	        { style: galleryMain, ref: 'section' },
	        _react2.default.createElement(
	          'div',
	          { style: itemlayout.jewelContainer },
	          imageJewels
	        )
	      )
	    );
	  }
	});

	module.exports = Gallery;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GalleryBox = _react2.default.createClass({
		displayName: 'GalleryBox',

		getInitialState: function getInitialState() {
			return {};
		},
		componentDidMount: function componentDidMount() {},
		componentWillUnmount: function componentWillUnmount() {},
		buildBox: function buildBox() {
			var _props = this.props;
			var img = _props.img;
			var pid = _props.pid;
			var hlColor = _props.hlColor;
			var hlSize = _props.hlSize;
			var size = _props.size;
			var place = _props.place;
			var index = _props.index;

			var boxShadow = '0 0 ' + hlSize + 'px ' + hlColor;
			var border = '1px solid ' + hlColor;
			var imgStyle = {
				backgroundColor: 'white',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				width: size,
				height: size,
				margin: '0 4',
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

	module.exports = GalleryBox;

/***/ }
/******/ ])
});
;