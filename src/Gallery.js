import React from 'react'
import PropTypes from 'prop-types'
import Thumbnail from './Thumbnail'

let DEFAULTS = {
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
}

class Gallery extends React.Component {
  static propTypes = {
    images: PropTypes.array,
    bkgSize: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    main: PropTypes.object,
    secondary: PropTypes.object,
    style: PropTypes.object,
    jewelContainerStyle: PropTypes.object,
    jewelSecondaryContainerStyle: PropTypes.object,
    config: PropTypes.object
  };
  static defaultProps = DEFAULTS;
  constructor (props) {
    super(props)
    this.state = {
      main: 0,
      secondary: 0
    }
    this.handleEnter = this.handleEnter.bind(this)
    this.getGalleryType = this.getGalleryType.bind(this)
    this.getConfigObject = this.getConfigObject.bind(this)
    this.buildContainerStyle = this.buildContainerStyle.bind(this)
    this.buildJewelStyle = this.buildJewelStyle.bind(this)
    this.buildJewelContainerStyle = this.buildJewelContainerStyle.bind(this)
    this.buildPaddingStyle = this.buildPaddingStyle.bind(this)
  }
  /**
   * Jewel hover handler
   */
  handleEnter (i, place) {
    let spot = place === 'secondary' ? 'secondary' : 'main'
    let { ...newState } = this.state
    newState[spot] = i
    this.setState(newState)
  }
  /**
   * Determine if images source is 2D Array
   */
  getGalleryType (images) {
    let galleryType = 0
    if (Array.isArray(images)) {
      if (images.every(i => Array.isArray(i))) {
        galleryType = 2
      } else if (images.every(i => typeof i === 'string')) {
        galleryType = 1
      }
    }
    return galleryType
  }
  getConfigObject (obj) {
    // If Object Not in Defaults, Return False
    if (!DEFAULTS[obj]) return false
    let { config } = this.props
    let configObj = {}
    Object.keys(DEFAULTS[obj]).map(function (key) {
      if (config && config[obj]) {
        configObj[key] = config[obj][key] !== undefined ? config[obj][key] : DEFAULTS[obj][key]
      } else {
        configObj[key] = DEFAULTS[obj][key]
      }
    })
    return configObj
  }
  /**
   * Construct Jewel Style Config Object
   */
  buildJewelStyle (kind) {
    if (!kind) return this.props.main
    // Get the Config Object for Jewel Place
    let configObj = this.props[kind]
    let style = {
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
    }
    return style
  }
  buildJewelContainerStyle (kind) {
    let configObj = this.props[kind]

		// If Position Y is Top, set to Top
		// Otherwise set to Bottom
    let verticalStyle = configObj.posY === 'top'
                      ? { top: 0 }
                      : { bottom: 0 }
		// If Position X is Left, set to left
		// Otherwise set to right
    let horizontalStyle = configObj.posX === 'left'
                      ? { left: 0 }
                      : { right: 0 }
		// Return combined Style Object
    return {
      position: 'absolute',
      ...verticalStyle,
      ...horizontalStyle
    }
  }
  /**
   * This will construct
   */
  buildPaddingStyle (padding, config, paddingSize) {
    if (!config.overlay) {
      if (config.orientation === 'horizontal') {
				// Orientation for These Jewels is Horizontal, so we care about posY (Top And Bottom)
        if (config.posY === 'top') {
          padding.top += paddingSize
        } else {
          padding.bottom += paddingSize
        }
      } else if (config.orientation === 'vertical') {
				// Orientation for These Jewels is Vertical, so we care about posX (Left And Right)
        if (config.posX === 'left') {
          padding.left += paddingSize
        } else {
          padding.right += paddingSize
        }
      }
    }
    return padding
  }
  buildContainerStyle () {
    // Get the Config Objects
    let mainConfig = this.props.main
    let secondaryConfig = this.props.secondary
    // Gallery Padding
    let mainPaddingSize = parseInt(mainConfig.size) + parseInt(mainConfig.spacing) + 4
    let secondaryPaddingSize = parseInt(secondaryConfig.size) + parseInt(secondaryConfig.spacing) + 4
    // Init all Padding to 0
    // Will add padding per Jewel Array Location
    let padObj = {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    }
    switch (this.galleryType) {
      case 2:
        padObj = this.buildPaddingStyle(padObj, mainConfig, mainPaddingSize)
        padObj = this.buildPaddingStyle(padObj, secondaryConfig, secondaryPaddingSize)
        break
      case 1:
      default:
        padObj = this.buildPaddingStyle(padObj, mainConfig, mainPaddingSize)
    };
    let derPadding = padObj.top + 'px ' + padObj.right + 'px ' + padObj.bottom + 'px ' + padObj.left + 'px'
    // Return a Style Object
    return {
      padding: derPadding,
      minHeight: 300
    }
  }
  buildJewels (images) {
    let jewelContainers = []
    let galleryType = this.getGalleryType(images)
    if (Array.isArray(images)) {
      switch (galleryType) {
        case 2:
          jewelContainers = this.buildDualArray(images)
          break
        case 1:
          jewelContainers = [this.buildSingleArray(images, 'main'), null]
          break
        default:
      }
    }
    return jewelContainers
  }
  buildDualArray (images) {
    let mainArray
    let secondaryArray
    let { secondary } = this.state

    // Map through images array and determine Thumbnails of Main Array
    // And also build the secondary Thumbnails
    secondaryArray = images.map((imgArray, i) => {
      // Set Main Array to the array of the secondary index.
      if (i === secondary) {
        mainArray = this.buildSingleArray(imgArray, 'main')
      }
      // Return Header Jewel
      return this.buildJewel(imgArray[0], i, 'secondary')
    })
    return [mainArray, secondaryArray]
  }
  buildSingleArray (images, kind) {
    return images.map((img, i) => this.buildJewel(img, i, kind))
  }
  buildJewel (img, i, kind) {
    let jewelStyle = this.buildJewelStyle(kind)
    return <Thumbnail
      key={i}
      {...jewelStyle.jewel}
      handleEnter={this.handleEnter}
      containerStyle={jewelStyle.container}
      orientation={this.props[kind].orientation}
      index={this.state[kind]}
      i={i}
      place={kind}
      img={img} />
  }
  getGalleryImage (images) {
    let { main, secondary } = this.state
    let image = ''
    switch (this.galleryType) {
      case 2:
        image = images[secondary][main]
        break
      case 1:
        image = images[main]
        break
      default:
    };
    return image
  }
  render () {
    let {
      width,
      height,
      images,
      style,
      bkgSize,
      jewelContainerStyle,
      jewelSecondaryContainerStyle
		} = this.props

    this.galleryType = this.getGalleryType(images)

    let containerStyle = this.buildContainerStyle()

    if (!Array.isArray(images)) {
      return (
        <div style={{ width, height, display: 'flex' }}>
          <div style={{ margin: 'auto' }}>
              No Images
          </div>
        </div>)
    }

    let imageLoc = this.getGalleryImage(images)

    let galleryStyle = {
      height,
      width,
      backgroundImage: "url('" + imageLoc + "')",
      backgroundSize: bkgSize || 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }

    let jewelMainContainer = this.buildJewelContainerStyle('main')
    let jewelSecondaryContainer = this.buildJewelContainerStyle('secondary')

    // Construct the Image Thumbnails!
    let jewels = this.buildJewels(images)

    // Construct the Image Thumbnails!
    let jewelSet = Array.isArray(jewels[0]) && jewels[0].length > 1
                  ? jewels[0]
                  : false
    // Construct the Second Thumbnail
    let jewelSecondarySet = Array.isArray(jewels[1])
                            ? <div
                              style={{ ...jewelSecondaryContainer, ...jewelSecondaryContainerStyle }}>
                              {jewels[1]}
                            </div>
                            : null

    return (
      <div style={{ position: 'relative', ...style }}>
        <div style={containerStyle}>
          <div style={galleryStyle} ref='section' />
        </div>
        <div style={{ ...jewelMainContainer, ...jewelContainerStyle }}>
          {jewelSet}
        </div>
        {jewelSecondarySet}
      </div>
    )
  }
}

export default Gallery
