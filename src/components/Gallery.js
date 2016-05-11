import React from 'react';

import GalleryBox from './GalleryBox';
let DEFAULTS = {
	jewelSize: 40,
	hlColor: 'darkorange',
	hlSize: 15,
  overlay: false,
};
const Gallery = React.createClass({
	getInitialState() {
		return {index: 0};
	},
  	handleEnter(i) {
  		this.setState({index: i});
  	},
  	getItemLayout() {
  		let {layout} = this.props;
  		let style;
  		switch (layout) {
  			case 'vertical':
  				style = {
  					mainContainer: {

  					},
  					jewel: {
  					}
  				};
  				break;
  			case 'horizontal':
          style = {
            mainContainer: {
              
            },
            jewel: {
              float: 'left'
            }
          };
          break;
  			default:
  				style = {
  					mainContainer: {
  						
  					},
  					jewel: {
  					}
  				}
  		}
  		return this.getOrientation(style);
  	},
  	getOrientation(style) {
  		let {posY} = this.props;
  		switch (posY) {
  			case 'top':
  				style = {
  					...style,
  					jewelContainer: {
  						position: 'absolute',
  						top: 0
  					},  					
  				};
  				break;
  			case 'bot':
  			default:
  				style = {
  				...style,
  					jewelContainer: {
  						position: 'absolute',
  						bottom: 0
  					}
  				};
  		}
  		return style;
  	},
  	buildJewelStyle() {
  		let {jewelSize, jewelHLColor, jewelHLSize} = this.props.config;
  		let style = {
  			size: jewelSize ? (jewelSize * 80 + 20) : 40,
  			hlColor: jewelHLColor ? jewelHLColor : 'darkorange',
  			hlSize: jewelHLSize ? jewelHLSize : 15
  		};
      if (config) {
        style
      }
  		return style;
  	},
  	buildContainerStyle() {
  		let {jewelOverlay} = this.props;
  		let containerStyle = {};
  		if (jewelOverlay) {
        containerStyle = {
          padding: '0'
        }
  		} else {
  			containerStyle = {
  				padding: '0 0 50 0'
  			}
  		}
  		return containerStyle;
  	},
	render() {
		let {style, images, jewelSize} = this.props;
		let imageLoc = images[this.state.index];
		let itemlayout = this.getItemLayout();

		let galleryMain = {
			height: '100%',
			width: '100%',
			backgroundImage: "url('"+imageLoc+"')",
			backgroundSize: 'contain',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
		};

		let jewelStyle = this.buildJewelStyle();
		let imageJewels = images.length > 0 ? images.map(function(img, i) {
			let n = i;
			let imgLocation = images[i];

			return <div style={itemlayout.jewel} onMouseEnter={this.handleEnter.bind(null, n)} key={i}>
					<GalleryBox size={jewelStyle.size} hlColor={jewelStyle.hlColor} hlSize={jewelStyle.hlSize} index={this.state.index} place={i} img={img} />
					</div>
		}.bind(this)) : null;
		let containerStyle = this.buildContainerStyle();
		return (
			<div style={containerStyle}>
				<div style={galleryMain} ref="section">
					<div style={itemlayout.jewelContainer}>
						{imageJewels}
					</div>
				</div>
			</div>
		);
	}
});

export default Gallery;