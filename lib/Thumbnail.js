'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Thumbnail;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Thumbnail Image
 */
function Thumbnail(props) {
  var img = props.img,
      containerStyle = props.containerStyle,
      i = props.i,
      place = props.place,
      handleEnter = props.handleEnter,
      index = props.index,
      hlColor = props.hlColor,
      hlSize = props.hlSize,
      spacing = props.spacing,
      size = props.size,
      style = props.style;


  var boxShadow = '0 0 ' + hlSize + 'px ' + hlColor;
  var border = '1px solid ' + hlColor;
  var spacePx = spacing + 'px';
  var isFocus = index === i;

  return _react2.default.createElement(
    'div',
    {
      style: containerStyle,
      onMouseEnter: function onMouseEnter() {
        return handleEnter(i, place);
      },
      key: '' + place + index
    },
    _react2.default.createElement('div', { style: _extends({
        backgroundColor: 'white',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: 4,
        zIndex: 9001,
        width: size + 'px',
        height: size + 'px',
        margin: spacePx,
        backgroundImage: 'url(\'' + img + '\')',
        boxShadow: isFocus ? boxShadow : 'none',
        border: isFocus ? border : '1px solid grey'
      }, style)
    })
  );
}
Thumbnail.propTypes = {
  img: _propTypes2.default.string.isRequired,
  place: _propTypes2.default.string.isRequired,
  index: _propTypes2.default.number.isRequired,
  i: _propTypes2.default.number.isRequired,
  hlColor: _propTypes2.default.string.isRequired,
  hlSize: _propTypes2.default.number.isRequired,
  spacing: _propTypes2.default.number.isRequired,
  size: _propTypes2.default.number.isRequired,
  containerStyle: _propTypes2.default.object,
  handleEnter: _propTypes2.default.func,
  style: _propTypes2.default.object
};
Thumbnail.defaultProps = {
  size: 20,
  spacing: 6,
  hlColor: 'orange'
};