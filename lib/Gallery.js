'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULTS = {
  bkgSize: 'contain',
  height: 350,
  width: 400,
  mirror: true,
  main: {
    overlay: false,
    hlColor: '#ff8c00',
    hlSize: 16,
    size: 40,
    spacing: 8,
    orientation: 'vertical',
    posX: 'left',
    posY: 'top'
  },
  secondary: {
    overlay: false,
    hlColor: '#ff8c00',
    hlSize: 16,
    size: 40,
    spacing: 8,
    orientation: 'horizontal',
    posX: 'left',
    posY: 'bot'
  }
};

var Gallery = function (_React$Component) {
  _inherits(Gallery, _React$Component);

  function Gallery(props) {
    _classCallCheck(this, Gallery);

    var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, props));

    _this.state = {
      main: 0,
      secondary: 0
    };
    _this.handleEnter = _this.handleEnter.bind(_this);
    _this.getGalleryType = _this.getGalleryType.bind(_this);
    _this.getConfigObject = _this.getConfigObject.bind(_this);
    _this.buildContainerStyle = _this.buildContainerStyle.bind(_this);
    _this.buildJewelStyle = _this.buildJewelStyle.bind(_this);
    _this.buildJewelContainerStyle = _this.buildJewelContainerStyle.bind(_this);
    _this.buildPaddingStyle = _this.buildPaddingStyle.bind(_this);
    return _this;
  }
  /**
   * Jewel hover handler
   */


  _createClass(Gallery, [{
    key: 'handleEnter',
    value: function handleEnter(i, place) {
      var spot = place === 'secondary' ? 'secondary' : 'main';

      var newState = _objectWithoutProperties(this.state, []);

      newState[spot] = i;
      this.setState(newState);
    }
    /**
     * Determine if images source is 2D Array
     */

  }, {
    key: 'getGalleryType',
    value: function getGalleryType(images) {
      var galleryType = 0;
      if (Array.isArray(images)) {
        if (images.every(function (i) {
          return Array.isArray(i);
        })) {
          galleryType = 2;
        } else if (images.every(function (i) {
          return typeof i === 'string';
        })) {
          galleryType = 1;
        }
      }
      return galleryType;
    }
  }, {
    key: 'getConfigObject',
    value: function getConfigObject(obj) {
      // If Object Not in Defaults, Return False
      if (!DEFAULTS[obj]) return false;
      var config = this.props.config;

      var configObj = {};
      Object.keys(DEFAULTS[obj]).map(function (key) {
        if (config && config[obj]) {
          configObj[key] = config[obj][key] !== undefined ? config[obj][key] : DEFAULTS[obj][key];
        } else {
          configObj[key] = DEFAULTS[obj][key];
        }
      });
      return configObj;
    }
    /**
     * Construct Jewel Style Config Object
     */

  }, {
    key: 'buildJewelStyle',
    value: function buildJewelStyle(kind) {
      if (!kind) return this.props.main;
      // Get the Config Object for Jewel Place
      var configObj = this.props[kind];
      var style = {
        container: {
          float: configObj.orientation === 'horizontal' ? 'left' : '',
          zIndex: 900
        },
        jewel: {
          size: configObj.size,
          hlSize: configObj.hlSize,
          hlColor: configObj.hlColor,
          spacing: configObj.spacing
        }
      };
      return style;
    }
  }, {
    key: 'buildJewelContainerStyle',
    value: function buildJewelContainerStyle(kind) {
      var configObj = this.props[kind];

      // If Position Y is Top, set to Top
      // Otherwise set to Bottom
      var verticalStyle = configObj.posY === 'top' ? { top: 0 } : { bottom: 0 };
      // If Position X is Left, set to left
      // Otherwise set to right
      var horizontalStyle = configObj.posX === 'left' ? { left: 0 } : { right: 0 };
      // Return combined Style Object
      return _extends({
        position: 'absolute'
      }, verticalStyle, horizontalStyle);
    }
    /**
     * This will construct
     */

  }, {
    key: 'buildPaddingStyle',
    value: function buildPaddingStyle(padding, config, paddingSize) {
      if (!config.overlay) {
        if (config.orientation === 'horizontal') {
          // Orientation for These Jewels is Horizontal, so we care about posY (Top And Bottom)
          if (config.posY === 'top') {
            padding.top += paddingSize;
          } else {
            padding.bottom += paddingSize;
          }
        } else if (config.orientation === 'vertical') {
          // Orientation for These Jewels is Vertical, so we care about posX (Left And Right)
          if (config.posX === 'left') {
            padding.left += paddingSize;
          } else {
            padding.right += paddingSize;
          }
        }
      }
      return padding;
    }
  }, {
    key: 'buildContainerStyle',
    value: function buildContainerStyle() {
      // Get the Config Objects
      var mainConfig = this.props.main;
      var secondaryConfig = this.props.secondary;
      // Gallery Padding
      var mainPaddingSize = parseInt(mainConfig.size) + parseInt(mainConfig.spacing) + 4;
      var secondaryPaddingSize = parseInt(secondaryConfig.size) + parseInt(secondaryConfig.spacing) + 4;
      // Init all Padding to 0
      // Will add padding per Jewel Array Location
      var padObj = {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
      };
      switch (this.galleryType) {
        case 2:
          padObj = this.buildPaddingStyle(padObj, mainConfig, mainPaddingSize);
          padObj = this.buildPaddingStyle(padObj, secondaryConfig, secondaryPaddingSize);
          break;
        case 1:
        default:
          padObj = this.buildPaddingStyle(padObj, mainConfig, mainPaddingSize);
      };
      var derPadding = padObj.top + 'px ' + padObj.right + 'px ' + padObj.bottom + 'px ' + padObj.left + 'px';
      // Return a Style Object
      return {
        padding: derPadding,
        minHeight: 300
      };
    }
  }, {
    key: 'buildJewels',
    value: function buildJewels(images) {
      var jewelContainers = [];
      var galleryType = this.getGalleryType(images);
      if (Array.isArray(images)) {
        switch (galleryType) {
          case 2:
            jewelContainers = this.buildDualArray(images);
            break;
          case 1:
            jewelContainers = [this.buildSingleArray(images, 'main'), null];
            break;
          default:
        }
      }
      return jewelContainers;
    }
  }, {
    key: 'buildDualArray',
    value: function buildDualArray(images) {
      var _this2 = this;

      var mainArray = void 0;
      var secondaryArray = void 0;
      var secondary = this.state.secondary;

      // Map through images array and determine Thumbnails of Main Array
      // And also build the secondary Thumbnails

      secondaryArray = images.map(function (imgArray, i) {
        // Set Main Array to the array of the secondary index.
        if (i === secondary) {
          mainArray = _this2.buildSingleArray(imgArray, 'main');
        }
        // Return Header Jewel
        return _this2.buildJewel(imgArray[0], i, 'secondary');
      });
      return [mainArray, secondaryArray];
    }
  }, {
    key: 'buildSingleArray',
    value: function buildSingleArray(images, kind) {
      var _this3 = this;

      return images.map(function (img, i) {
        return _this3.buildJewel(img, i, kind);
      });
    }
  }, {
    key: 'buildJewel',
    value: function buildJewel(img, i, kind) {
      var jewelStyle = this.buildJewelStyle(kind);
      return _react2.default.createElement(_Thumbnail2.default, _extends({
        key: i
      }, jewelStyle.jewel, {
        handleEnter: this.handleEnter,
        containerStyle: jewelStyle.container,
        orientation: this.props[kind].orientation,
        index: this.state[kind],
        i: i,
        place: kind,
        img: img }));
    }
  }, {
    key: 'getGalleryImage',
    value: function getGalleryImage(images) {
      var _state = this.state,
          main = _state.main,
          secondary = _state.secondary;

      var image = '';
      switch (this.galleryType) {
        case 2:
          image = images[secondary][main];
          break;
        case 1:
          image = images[main];
          break;
        default:
      };
      return image;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          images = _props.images,
          style = _props.style,
          bkgSize = _props.bkgSize,
          jewelContainerStyle = _props.jewelContainerStyle,
          jewelSecondaryContainerStyle = _props.jewelSecondaryContainerStyle;


      this.galleryType = this.getGalleryType(images);

      var containerStyle = this.buildContainerStyle();

      if (!Array.isArray(images)) {
        return _react2.default.createElement(
          'div',
          { style: { width: width, height: height, display: 'flex' } },
          _react2.default.createElement(
            'div',
            { style: { margin: 'auto' } },
            'No Images'
          )
        );
      }

      var imageLoc = this.getGalleryImage(images);

      var galleryStyle = {
        height: height,
        width: width,
        backgroundImage: "url('" + imageLoc + "')",
        backgroundSize: bkgSize || 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      };

      var jewelMainContainer = this.buildJewelContainerStyle('main');
      var jewelSecondaryContainer = this.buildJewelContainerStyle('secondary');

      // Construct the Image Thumbnails!
      var jewels = this.buildJewels(images);

      // Construct the Image Thumbnails!
      var jewelSet = Array.isArray(jewels[0]) && jewels[0].length > 1 ? jewels[0] : false;
      // Construct the Second Thumbnail
      var jewelSecondarySet = Array.isArray(jewels[1]) ? _react2.default.createElement(
        'div',
        {
          style: _extends({}, jewelSecondaryContainer, jewelSecondaryContainerStyle) },
        jewels[1]
      ) : null;

      return _react2.default.createElement(
        'div',
        { style: _extends({ position: 'relative' }, style) },
        _react2.default.createElement(
          'div',
          { style: containerStyle },
          _react2.default.createElement('div', { style: galleryStyle, ref: 'section' })
        ),
        _react2.default.createElement(
          'div',
          { style: _extends({}, jewelMainContainer, jewelContainerStyle) },
          jewelSet
        ),
        jewelSecondarySet
      );
    }
  }]);

  return Gallery;
}(_react2.default.Component);

Gallery.propTypes = {
  images: _propTypes2.default.array,
  bkgSize: _propTypes2.default.string,
  height: _propTypes2.default.number,
  width: _propTypes2.default.number,
  main: _propTypes2.default.object,
  secondary: _propTypes2.default.object,
  style: _propTypes2.default.object,
  jewelContainerStyle: _propTypes2.default.object,
  jewelSecondaryContainerStyle: _propTypes2.default.object,
  config: _propTypes2.default.object
};
Gallery.defaultProps = DEFAULTS;
exports.default = Gallery;