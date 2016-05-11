import React from 'react';

let GalleryBox = React.createClass({
	getInitialState() {
		return { };
	},
  	buildBox() {
  		let {img, config, place, orientation, index} = this.props;
  		let {hlColor, hlSize, spacing, size} = config;
  		let boxShadow = '0 0 '+hlSize+'px '+hlColor;
  		let border = '1px solid '+hlColor;
  		let imgStyle = {
			backgroundColor: 'white',
  			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			width: size,
			height: size,
			margin: (orientation === 'horizontal' ? '0 '+spacing : spacing+' 0'),
			backgroundImage: "url('"+img+"')",
			boxShadow: (index === place ? boxShadow : 'none'),
			border: (index === place ? border : '1px solid grey') 
  		};
  		return imgStyle;
  	},
	render() {

		let boxStyle = this.buildBox();

		return (
			<div style={boxStyle}>
			</div>
		);
	}
});

export default GalleryBox;