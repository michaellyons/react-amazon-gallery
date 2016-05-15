import React from 'react';
import PubGallery from 'react-amazon-gallery';
import WorkingGallery from './Gallery';
const DEFAULT_CONFIG = {
  cHeight: 400,
  orientation: 'vertical',
  overlay: false, 
  posY: 'top',
  posX: 'left',
  jewelSpacing: 8,
  jewelSize: 42,
  hlColor: '#ff8c00',
  hlSize: 16,
};
if (!library)
   var library = {};

library.json = {
   replacer: function(match, pIndent, pKey, pVal, pEnd) {
      var key = '<span class="json-key">';
      var val = '<span class="json-value">';
      var str = '<span class="json-string">';
      var r = pIndent || '';
      if (pKey)
         r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
      if (pVal)
         r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
      return r + (pEnd || '');
      },
   prettyPrint: function(obj) {
      var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
      return JSON.stringify(obj, null, 3)
         .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
         .replace(/</g, '&lt;').replace(/>/g, '&gt;')
         .replace(jsonLine, library.json.replacer);
      }
   };
   function createMarkup(markup) { return {__html: markup}; };
var App = React.createClass({
  getInitialState() {
    return {
      ...DEFAULT_CONFIG
    }
  },
  resetDefault() {
    this.setState({...DEFAULT_CONFIG});
  },
  changeConfig(config, val, e) {
    e.preventDefault();
    let {...newState} = this.state;
    newState[config] = val;
    this.setState(newState);
  },
  handleTextChange(prop, e) {
    e.preventDefault();
    let {...newState} = this.state;
    newState[prop] = e.target.value;
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
  isConfigSet(config, value) {
    return this.state[config] === value;
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
      <div>
      <h1 style={{width: '100%'}}>React Amazon Gallery</h1>
      <div style={{width: '100%', height: '50%', display: 'flex', flexWrap: 'wrap', position: 'relative'}}>
        <div style={{width: '50%', height: '100%'}}>
          <WorkingGallery config={this.state} images={imageArray} />
        </div>
        <div style={{width: '50%', height: '100%', padding: '1em'}} className='configSection'>
          <button className="btn btn-default" type="submit" onClick={this.resetDefault}>Reset</button>
          <div>
         Container Height
          <input
            type="text"
            value={this.state.cHeight}
            onChange={this.handleTextChange.bind(null, 'cHeight')}
          />
          </div>
          <div>
         Jewel Size
          <input
            type="text"
            value={this.state.jewelSize}
            onChange={this.handleTextChange.bind(null, 'jewelSize')}
          />
          </div>
          <div>
         Jewel Spacing
          <input
            type="text"
            value={this.state.jewelSpacing}
            onChange={this.handleTextChange.bind(null, 'jewelSpacing')}
          />
          </div>
          <div>
         Highlight Color
          <input
            type="text"
            value={this.state.hlColor}
            onChange={this.handleTextChange.bind(null, 'hlColor')}
          />
          </div>
          <div>
         Highlight Size
          <input
            type="text"
            value={this.state.hlSize}
            onChange={this.handleTextChange.bind(null, 'hlSize')}
          />
          </div>
          <div>
              <h2>Layout</h2>
              <button className={"btn btn-default"+(this.isConfigSet('orientation', 'vertical') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'orientation', 'vertical')}>Vertical</button>
              <button className={"btn btn-default"+(this.isConfigSet('orientation', 'horizontal') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'orientation', 'horizontal')}>Horizontal</button>
          </div>
          <div>
              <h2>Position</h2>
              <button className={"btn btn-default"+(this.isConfigSet('posY', 'top') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'posY', 'top')}>Top</button>
              <button className={"btn btn-default"+(this.isConfigSet('posY', 'bot') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'posY', 'bot')}>Bot</button>
              <button className={"btn btn-default"+(this.isConfigSet('posX', 'left') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'posX', 'left')}>Left</button>
              <button className={"btn btn-default"+(this.isConfigSet('posX', 'right') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'posX', 'right')}>Right</button>
          </div>
          Overlay 
          <label>
            <input name='overlay' checked={this.state.overlay} value={this.state.overlay} type="checkbox" onClick={this.changeConfig.bind(null, 'overlay', !this.state.overlay)} />
          </label>
      </div>
    </div>
      <div><h3>Config Object</h3></div>
      <pre><code dangerouslySetInnerHTML={createMarkup('let config = '+library.json.prettyPrint(this.state)+';')}></code></pre>

    </div>
    );
  }
});

export default App;