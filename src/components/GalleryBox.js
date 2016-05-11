import React from 'react';

class GalleryBox extends React.Component {
	getInitialState() {
		return { };
	}
  	buildBox() {
  		let {img, pid, hlColor, hlSize, size, place, index} = this.props;
  		let boxShadow = '0 0 '+hlSize+'px '+hlColor;
  		let border = '1px solid '+hlColor;
  		let imgStyle = {
			backgroundColor: 'white',
  			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			width: size,
			height: size,
			margin: '0 4',
			backgroundImage: "url('"+img+"')",
			boxShadow: (index === place ? boxShadow : 'none'),
			border: (index === place ? border : '1px solid grey') 
  		};
  		return imgStyle;
  	}
	render() {

		let boxStyle = this.buildBox();

		return (
			<div style={boxStyle}>
			</div>
		);
	}
};

export default GalleryBox;