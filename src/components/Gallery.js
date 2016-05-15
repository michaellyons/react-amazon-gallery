import React from 'react';

import GalleryBox from './GalleryBox';
let DEFAULTS = {
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
		if (config) {
			params.map(function(param) {
				if (config[param]) {
					setConfig[param] = config[param];
				} else {
					setConfig[param] = DEFAULTS[param];
				}
				return
			});
		} else {
			params.map(function(param) {
				setConfig[param] = DEFAULTS[param];
				return
			});
		}
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
		return this.getOrientationY(this.getOrientationX(style));
	},
	getOrientationX(style) {
		let {posX} = this.getConfig(['posX']);
		switch (posX) {
			case 'right':
				style = {
					...style,
					jewelContainer: {
						position: 'absolute',
						right: 0,
						...style.jewelContainer
					}					
				};
				break;
			case 'left':
			default:
				style = {
				...style,
					jewelContainer: {
						position: 'absolute',
						bottom: 0,
						...style.jewelContainer
					}
				};
		}
		return style;
	},
	getOrientationY(style) {
		let {posY} = this.getConfig(['posY']);
		switch (posY) {
			case 'top':
				style = {
					...style,
					jewelContainer: {
						position: 'absolute',
						top: 0,
						...style.jewelContainer
					},  					
				};
				break;
			case 'bot':
			default:
				style = {
				...style,
					jewelContainer: {
						position: 'absolute',
						bottom: 0,
						...style.jewelContainer
					}
				};
		}
		return style;
	},
	buildJewelStyle() {
		let config = this.getConfig(['hlSize', 'hlColor', 'jewelSize', 'jewelSpacing']);
		let style = {
			size: config.jewelSize ? (config.jewelSize) : 40,
			hlColor: config.hlColor ? config.hlColor : 'darkorange',
			hlSize: config.hlSize ? config.hlSize : 15,
			spacing: config.jewelSpacing ? config.jewelSpacing : 0,
		};
		return style;
	},
	buildContainerStyle() {
		let config = this.getConfig(['overlay', 'hlSize', 'posY', 'posX','orientation', 'jewelSize']);
		let containerStyle = {};
		let paddingSize = parseInt(config.jewelSize) + parseInt(config.hlSize)/2 + 4 + 'px';
		if (config.overlay) {
			containerStyle = {
			  padding: '0px'
			}
		} else {
			let derPadding;
			if (config.orientation === 'horizontal') {
				if (config.posY === 'top') {
					derPadding = paddingSize+' 0 0 0';
				} else {
					derPadding = '0 0 '+paddingSize+' 0';
				}
			} else {
				if (config.posX === 'right') {
					derPadding = '0 '+paddingSize+' 0 0';
				} else {
					derPadding = '0 0 0 '+paddingSize;
				}
			}
			containerStyle = {
				padding: derPadding
			};
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
					<GalleryBox config={jewelStyle} orientation={this.getConfig(['orientation']).orientation} index={this.state.index} place={i} img={img} />
					</div>
		}.bind(this)) : null;
		let containerStyle = this.buildContainerStyle();
		return (
			<div style={{position: 'relative'}}>
				<div style={{...containerStyle, position: 'relative', width: '100%', height: '100%'}}>
					<div style={galleryMain} ref="section" />
				</div>
				<div style={itemlayout.jewelContainer}>
					{imageJewels}
				</div>
			</div>
		);
	}
});

export default Gallery;