import React from 'react';
import Gallery from 'react-amazon-gallery';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';

const DEFAULT_CONFIG = {
  containerHeight: 400,
  orientation: 'vertical',
  overlay: false, 
  posY: 'top',
  jewelSpacing: 0.2,
  jewelSize: 0.25,
  hlColor: '#d55',
  hlSize: 0.5,
}
var App = React.createClass({
  getInitialState() {
    return {
      ...DEFAULT_CONFIG
    }
  },
  childContextTypes: {
    muiTheme: React.PropTypes.function
  },
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  },

  changeConfig(config, val, e) {
    e.preventDefault();
    let {...newState} = this.state;
    newState[config] = val;
    this.setState(newState);
  },
  handleSlider(slider, value, e) {
    let {...newState} = this.state;
    newState[slider] = e;
    this.setState(newState);
  },
  changeColor(color) {
    let {...newState} = this.state;
    newState['hlColor'] = color;
    this.setState(newState);
  },
  render() {
    let {orientation, posY} = this.state;
  	let imageArray = [
      '/img/land0.jpg',
  		'/img/land1.jpg',
  		'/img/land2.jpg',
  		'/img/land3.jpg',
  		'/img/land4.jpg',
  	];
    return (
    <div style={{width: '100%', height: '60%', display: 'flex'}}>
      <div style={{width: '50%', height: '100%'}}>
    	 <Gallery config={this.state} images={imageArray} />
      </div>
      <div style={{width: '50%', padding: '0 1em'}}>
        <h1>Config</h1>
        {JSON.stringify(this.state)}
        <h2>Layout</h2>
          <div>
            <h3>Orientation</h3>
            <RaisedButton label="Vertical" disabled={orientation === 'vertical'} onClick={this.changeConfig.bind(null, 'orientation', 'vertical')} />
            <RaisedButton label="Horizontal" disabled={orientation === 'horizontal'} onClick={this.changeConfig.bind(null, 'orientation', 'horizontal')} />
          </div>
          <div>
            <h3>Position</h3>
            <RaisedButton label="Top" disabled={posY === 'top'} onClick={this.changeConfig.bind(null, 'posY', 'top')} />
            <RaisedButton label="Bottom" disabled={posY === 'bot'} onClick={this.changeConfig.bind(null, 'posY', 'bot')} />
          </div>
          <h3>Jewel Size</h3>
          <Slider defaultValue={this.state.jewelSize} onChange={this.handleSlider.bind(this, 'jewelSize')} />
          <h3>Jewel Spacing</h3>
          <Slider defaultValue={this.state.jewelSpacing} onChange={this.handleSlider.bind(this, 'jewelSpacing')} />
      </div>
  	</div>
    );
  }
});

export default App;