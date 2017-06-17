import React from 'react'
import PropTypes from 'prop-types'
/**
 * Thumbnail Image
 */
export default function Thumbnail (props) {
  const {
    img,
    containerStyle,
    i,
    place,
    handleEnter,
    index,
    hlColor,
    hlSize,
    spacing,
    size,
    style
  } = props

  const boxShadow = `0 0 ${hlSize}px ${hlColor}`
  const border = `1px solid ${hlColor}`
  const spacePx = `${spacing}px`
  const isFocus = index === i

  return (<div
    style={containerStyle}
    onMouseEnter={() => handleEnter(i, place)}
    key={`${place}${index}`}
  >
    <div style={{
      backgroundColor: 'white',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      padding: 4,
      zIndex: 9001,
      width: `${size}px`,
      height: `${size}px`,
      margin: spacePx,
      backgroundImage: `url('${img}')`,
      boxShadow: (isFocus ? boxShadow : 'none'),
      border: (isFocus ? border : '1px solid grey'),
      ...style
    }}
    />
  </div>)
}
Thumbnail.propTypes = {
  img: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  i: PropTypes.number.isRequired,
  hlColor: PropTypes.string.isRequired,
  hlSize: PropTypes.number.isRequired,
  spacing: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  containerStyle: PropTypes.object,
  handleEnter: PropTypes.func,
  style: PropTypes.object
}
Thumbnail.defaultProps = {
  size: 20,
  spacing: 6,
  hlColor: 'orange'
}
