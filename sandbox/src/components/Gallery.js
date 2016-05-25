import React from 'react';
import GalleryBox from './GalleryBox';
let DEFAULTS = {
	bkgSize: 'cover',
	containerHeight: false,
	containerWidth: false,
	fullSize: false,
	injectJewelB: false,
	injectionIdentifier: null,
	overlay: false,
	main: {
		hlColor: '#ff8c00',
		hlSize: 16,
		jewelSize: 40,
		jewelSpacing: 16,
		orientation: 'vertical',
		posX: 'left',
		posY: 'top'
	},
	secondary: {
		hlColor: '#ff8c00',
		hlSize: 16,
		jewelSize: 40,
		jewelSpacing: 16,
		orientation: 'horizontal',
		posX: 'left',
		posY: 'bot'
	}
};
function isOfType (type, test) {
	if (Array.isArray(test)) {
		return type == 'array';
	} else {
		return typeof test === type;
	}
};
const Gallery = React.createClass({
	getInitialState() {
		return {index: 0, selection: 0};
	},
	handleEnter(i, place) {
		let {...newState} = this.state;
		newState[place] = i;
		this.setState(newState);
	},
	changeSelection(i) {
		this.setState({selection: i});
	},
	getGalleryType() {
		let {images} = this.props;
		let galleryType;
		if (Array.isArray(images)) {
			if (images.every(i => Array.isArray(i))) {
				galleryType = 2;
			} else if (images.every(i => typeof i === 'string')) {
				galleryType = 1;
			} else {
				galleryType = 0;
			}
		} else {
			galleryType = 3;
		}
		return galleryType;
	},
	getConfig(place, params) {
		if (params === null || !params) return false;
		let {config} = this.props;
		let setConfig = {};
		let configPlace = place ? config[place] ? config[place] : DEFAULTS[place] : false;
		// Check datatype of params passed, collect config based on type
		if (Array.isArray(params)) {
			if (configPlace) {
				params.map(function(param) {
					if (configPlace[param]) {
						setConfig[param] = configPlace[param];
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
		} else if (typeof params === 'string') {
			if (configPlace[params]) {
				setConfig = configPlace[params];
			} else {
				setConfig = DEFAULTS[params];
			}
		} else if (typeof params === 'object') {
			if (config) {
				Object.keys(params).map(function(param) {
					if (configPlace[param]) {
						setConfig[param] = configPlace[param];
					} else {
						setConfig[param] = DEFAULTS[param];
					}
					return
				});
			} else {
				Object.keys(params).map(function(param) {
					setConfig[param] = DEFAULTS[param];
					return
				});
			}
		} else {
			return false;
		}

		return setConfig;
	},
	getItemLayout() {
		let orientation = this.getConfig('orientation');
		let style;
		switch (orientation) {
			case 'vertical':
				style = {
					mainContainer: {

					},
					index: {

					},
					selection: {
						float: 'left'
					}
				};
				break;
			case 'horizontal':
				style = {
					mainContainer: {
					  
					},
					index: {
					  float: 'left'
					},
					selection: {

					}
				};
				break;
			default:
				style = {
					mainContainer: {
						
					},
					index: {
					}
				}
		}
		return this.getOrientation(style);
	},
	getOrientation(style) {
		return this.getOrientationY(this.getOrientationX(style));
	},
	getOrientationX(style) {
		let posX = this.getConfig('posX');
		switch (posX) {
			case 'right':
				style = {
					...style,
					jewelContainer: {
						position: 'absolute',
						right: 0,
						...style.jewelContainer
					},
					jewelSecondaryContainer: {

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
					},
					jewelSecondaryContainer: {
						
					}
				};
		}
		return style;
	},
	getOrientationY(style) {
		let posY = this.getConfig('posY');
		switch (posY) {
			case 'top':
				style = {
					...style,
					jewelContainer: {
						position: 'absolute',
						top: 0,
						...style.jewelContainer
					},
					jewelSecondaryContainer: {
						
					}					
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
	buildJewelStyle(kind) {
		if (!kind) return DEFAULTS.main;
		let config = this.getConfig(kind, ['hlSize', 'hlColor', 'jewelSize', 'jewelSpacing']);
		let style = {
			...config
		};
		return style;
	},
	buildContainerStyle(kind) {
		let config = this.getConfig(kind, ['overlay', 'hlSize', 'posY', 'posX','orientation', 'jewelSize']);
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
			};
			containerStyle = {
				padding: derPadding
			};
		}
		return containerStyle;
	},
	buildJewels() {
		let jewelContainers = {};
		let gallType = this.getGalleryType();
		if (Array.isArray(this.props.images)) {
			switch(gallType) {
				case 2:
					jewelContainers = this.buildDualArray(this.props.images);
					break;
				case 1:
				default:
					jewelContainers = this.buildSingleArray(this.props.images, 'main');
			}
		}
		return jewelContainers;
	},
	buildDualArray(images) {
		let mainArray, secondaryArray;
		let {index, selection} = this.state;
		secondaryArray = images.map(function(imgArray, i) {
			if (i == selection) {
				mainArray = this.buildSingleArray(imgArray, 'main');
			}
			return this.buildJewel(imgArray[0], i, 'secondary');
		}.bind(this));
		return [mainArray, secondaryArray]
	},
	buildSingleArray(images, place) {
		let imageJewels = images.length > 0 ? images.map(function(img, i) {
			let imgLocation = images[i];
			return this.buildJewel(img, i, place);
		}.bind(this)) : null;
		return imageJewels;
	},
	buildJewel(img, i, place) {
		let jewelStyle = this.buildJewelStyle(place);
			return <div style={jewelStyle.container} onMouseEnter={this.handleEnter.bind(null, i, place)} key={place+''+i}>
						<GalleryBox config={jewelStyle} orientation={this.getConfig(place, 'orientation')} index={this.state[place]} spot={i} place={place} img={img} />
					</div>
	},
	injectArray() {

	},
	getGalleryImage() {
		let {index, selection} = this.state;
		let {images} = this.props;
		let kind = this.getGalleryType();
		switch(kind) {
			case 2:
				return images[selection][index];
				break;
			case 1:
			default:
				return images[index];
		};
	},
	render() {
		if (!Array.isArray(this.props.images)) return <div style={{width: '100%',height: '100%', display: 'flex'}}><div style={{margin: 'auto'}}>No Images</div></div>;
		
		let {style, jewelContainerStyle, jewelSecondaryContainerStyle, galleryStyle, images, jewelSize} = this.props;

		let itemlayout = this.getItemLayout();
		let imageLoc = this.getGalleryImage();
		let galleryMain = {
			height: this.getConfig('gallery', 'cHeight')+'px',
			width: '100%',
			backgroundImage: "url('"+imageLoc+"')",
			backgroundSize: this.getConfig('gallery', 'bkgSize') || 'contain',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
		};

		let jewels = this.buildJewels();
		let jewelSet = Array.isArray(jewels[0]) ? jewels[0] : jewels;
		let jewelSecondarySet = Array.isArray(jewels[1]) ? <div style={{...itemlayout.jewelSecondaryContainer, ...jewelSecondaryContainerStyle}}>{jewels[1]}</div> : null;

		let containerStyle = this.buildContainerStyle();
		return (
			<div style={{position: 'relative', ...style}}>
				<div style={{...containerStyle, position: 'relative', width: '100%', height: '100%'}}>
					<div style={{...galleryMain, ...galleryStyle}} ref="section" />
				</div>
				<div style={{...itemlayout.jewelContainer, ...jewelContainerStyle}}>
					{jewelSet}
				</div>
				{jewelSecondarySet}
			</div>
		);
	}
});

export default Gallery;