import React from 'react';
import PubGallery from 'react-amazon-gallery';
import WorkingGallery from './Gallery';
const configTableDescription = {
  cHeight: ['Container Height','400'],
  orientation: ['Orientation', 'vertical'],
  overlay: ['Overlay', false], 
  posY: ['Position Y-Axis','top'],
  posX: ['Position X-Axis', 'left'],
  jewelSpacing: ['Jewel Spacing', 8],
  jewelSize: ['Jewel Size', 42],
  hlColor: ['Hightlight Color', '#ff8c00'],
  hlSize: ['Hightlight Size']
};
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
      if (!obj) return '{}';
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
  filter(state) {
    if (Object(state)) {
      let filteredState = {};
      Object.keys(state).map(function(key) {
        if (state[key] !== DEFAULT_CONFIG[key]) {
          filteredState[key] = state[key];
        }
      });
      return filteredState;
    };
    return false;
  },
  buildConfigTable () {
    let configs = ['cHeight', 'jewelSize', 'jewelSpacing', 'hlColor', 'hlSize'];
    let configTableRows = configs.map(function(config, i) {
      let value = this.state[config];
      return <tr key={i}>
        <td>{configTableDescription[config][0]}</td>
        <td><input style={{textAlign: 'center'}} type='text' value={value} onChange={this.handleTextChange.bind(null, config)} /></td>
        <td></td>
      </tr>
    }.bind(this));
    return configTableRows;
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
    let codeSectionHeader = {
      padding: '0 1em'
    };
    let configTable = this.buildConfigTable();
    let filteredState = this.filter(this.state);
    return (
      <div style={{padding: '1em'}} className='container'>
      <div style={{width: '100%', textAlign: 'center', fontSize: '5em'}}>React Amazon Gallery</div>
      <div style={{width: '100%', padding: '1em', height: '50%', display: 'flex', flexWrap: 'wrap', position: 'relative', border: '1px solid grey', borderRadius: 4}}>
        <div style={{width: '50%', height: '100%'}}>
          <WorkingGallery config={this.state} images={imageArray} />
        </div>
        <div className='col-6 col-lg-6 col-sm-6 col-md-6'>
          <table style={{width: '100%'}}>
          <thead>
            <tr><th>Setting</th><th>Value</th><th>Notes</th></tr>
          </thead>
          <tbody>
            {configTable}
          </tbody>
          </table>
          <div>
            Overlay 
            <label>
              <input name='overlay' checked={this.state.overlay ? '' : 'true'} type="checkbox" onClick={this.changeConfig.bind(null, 'overlay', !this.state.overlay)} />
            </label>
          </div>
          <div style={{float: 'left', width: '100%', justifyContent: 'space-around'}} className='flxbx flxwp'>
              <div>
              <h3>Layout</h3>
              <button className={"btn btn-default"+(this.isConfigSet('orientation', 'vertical') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'orientation', 'vertical')}>Vertical</button>
              <button className={"btn btn-default"+(this.isConfigSet('orientation', 'horizontal') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'orientation', 'horizontal')}>Horizontal</button>
              </div>
              <div>
                <h3>Y Axis</h3>
                <button className={"btn btn-default"+(this.isConfigSet('posY', 'top') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'posY', 'top')}>Top</button>
                <button className={"btn btn-default"+(this.isConfigSet('posY', 'bot') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'posY', 'bot')}>Bot</button>
              </div>
              <div>
                <h3>X Axis</h3>
                <button className={"btn btn-default"+(this.isConfigSet('posX', 'left') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'posX', 'left')}>Left</button>
                <button className={"btn btn-default"+(this.isConfigSet('posX', 'right') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'posX', 'right')}>Right</button>
              </div>
          </div>


          <button style={{position: 'absolute', right: 0, bottom: 0}} className="btn btn-default" type="submit" onClick={this.resetDefault}>Reset Defaults</button>
      </div>
    </div>
      <div className='col-6 col-lg-6 col-sm-6 col-md-6' style={{padding: 0}}>
        <div style={codeSectionHeader}><h4>Usage</h4></div>
        <pre><code>{"import React from 'react';"}
            <br />{"import Gallery from 'react-amazon-gallery';"}</code></pre>
        <pre><code dangerouslySetInnerHTML={createMarkup('let config = '+library.json.prettyPrint(filteredState)+';')}></code></pre>
        <pre><code dangerouslySetInnerHTML={createMarkup('let images = '+library.json.prettyPrint(imageArray)+';')}></code></pre>
        <pre><code>{"<"+"Gallery images={images} "+(Object.keys(filteredState).length > 0 ? 'config={config}' : '')+" />"}</code></pre>
      </div>
    </div>
    );
  }
});

export default App;