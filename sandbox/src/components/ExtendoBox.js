import React from 'react';

let ExtendoBox = React.createClass({
	getInitialState() {
		return { extended: false };
	},
  	buildBox() {
  		let {img, config, spot, place, orientation, index} = this.props;
  		let {extended} = this.state;
  		
  		let imgStyle = {
			backgroundColor: 'white',
			padding: 4,
			transition: 'all 0.4s',
			zIndex: 9001,
			position: 'absolute',
			width: extended ? 400 : '',
			height: extended ? 300 : '',
			borderRadius: 2,
			boxShadow: extended ? '0px 0px 15px rgba(0,0,0,0.5)' : 'none',
  		};
  		return imgStyle;
  	},
  	toggleExtend() {
  		this.setState({extended: !this.state.extended});
  	},
	render() {

		let boxStyle = this.buildBox();

		return (
			<div style={{position: 'relative', float: 'right', ...this.props.style}}>
			<div style={{...boxStyle, ...this.props.style}}>
				<div onClick={this.toggleExtend}>{this.props.label}</div>
			</div>
			</div>
		);
	}
});

export default ExtendoBox;