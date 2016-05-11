import React from 'react';

import GalleryBox from './GalleryBox';
let DEFAULTS = {
	containerHeight: 400,
	fullSize: false,
	hlColor: '#ff8c00',
	hlSize: 0.2,
	jewelSize: 0.25,
	jewelSpacing: 0.2,
	orientation: 'vertical',
	overlay: false,
	posY: 'top',
};
const Gallery = React.createClass({
	getInitialState() {
		return {index: 0};
	},
	handleEnter(i) {
		this.setState({index: i});
	},
	getConfig(params) {
		if (params == null || !params) return false;

		let {config} = this.props;
		let setConfig = {};
		params.map(function(param) {
			if (config[param]) {
				setConfig[param] = config[param];
			} else {
				setConfig[param] = DEFAULTS[param];
			}
			return
		});
		return setConfig;
	},
	getItemLayout() {
		let {orientation} = this.getConfig(['orientation']);
		let style;
		switch (orientation) {
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
		let {posY} = this.getConfig(['posY']);
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
		let config = this.getConfig(['hlSize', 'hlColor', 'jewelSize', 'jewelSpacing']);
		let style = {
			size: config.jewelSize ? (config.jewelSize * 90 + 10) : 40,
			hlColor: config.jewelHLColor ? config.jewelHLColor : 'darkorange',
			hlSize: config.jewelHLSize ? config.jewelHLSize : 15,
			spacing: config.jewelSpacing ? config.jewelSpacing * 20 : 0,
		};
		return style;
	},
	buildContainerStyle() {
		let config = this.getConfig(['overlay', 'orientation', 'jewelSize']);
		let containerStyle = {};
		let paddingSize = (config.jewelSize * 90 + 10) + 'px';
		if (config.overlay) {
			containerStyle = {
			  padding: '0'
			}
		} else {
			if (config.position === 'top') {
			  if (config.orientation === 'horizontal') {
				padding: paddingSize+' 0 0 0';
			  } else {
				padding: '0 0 0 '+paddingSize;
			  }
			} else {
			  if (config.orientation === 'horizontal') {
				padding: '0 0 '+paddingSize+' 0';
			  } else {
				padding: '0 0 0 '+paddingSize;
			  }
			}
		}
		return containerStyle;
	},
	render() {
		let {style, images, jewelSize} = this.props;
		let imageLoc = images[this.state.index];
		let itemlayout = this.getItemLayout();

		let galleryMain = {
			height: this.getConfig(['fullSize'])['fullSize'] ? '100%' : this.getConfig(['containerHeight']),
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
					<GalleryBox config={jewelStyle} orientation={this.getConfig(['orientation'])} index={this.state.index} place={i} img={img} />
					</div>
		}.bind(this)) : null;
		let containerStyle = this.buildContainerStyle();
		return (
			<div style={{...containerStyle, width: '100%', height: '100%'}}>
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