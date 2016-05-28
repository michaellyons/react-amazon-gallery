import React from 'react';
import PubGallery from 'react-amazon-gallery';
import WorkingGallery from './Gallery';
import Extendo from './ExtendoBox';
const configTableDescription = {
  bkgSize: 'Background Size',
  height: 'Container Height',
  width: 'Container Width',
  orientation: 'Orientation',
  overlay: 'Overlay', 
  posY: 'Position Y-Axis',
  posX: 'Position X-Axis',
  jewelSpacing: 'Jewel Spacing',
  jewelSize: 'Jewel Size',
  hlColor: 'Hightlight Color',
  hlSize: 'Hightlight Size'
};
const DEFAULT_CONFIG = {
  bkgSize: 'cover',
  height: '300px',
  width: '100%',
  fullSize: false,
  injectJewelB: false,
  injectionIdentifier: null,
  main: {
    posY: 'top',
    posX: 'left',
    orientation: 'vertical',
    spacing: 8,
    size: 42,
    hlColor: '#ff8c00',
    hlSize: 16,
  },
  secondary: {
    posY: 'bot',
    posX: 'left',
    orientation: 'horizontal',
    spacing: 8,
    size: 42,
    hlSize: 16,
  }
};
const configHide = [
  'imageSource'
];
let imageArray = [
  '/img/sample_array/land0.jpg',
  '/img/sample_array/land1.jpg',
  '/img/sample_array/land2.jpg',
  '/img/sample_array/land3.jpg',
  '/img/sample_array/land4.jpg',
];
let imageMDArray = [
  [
  '/img/sample_map/blck_0.jpg',
  '/img/sample_map/blck_1.jpg',
  '/img/sample_map/blck_2.jpg',
  '/img/sample_map/blck_3.jpg',
  '/img/sample_map/blck_4.jpg',
  '/img/sample_map/blck_5.jpg',
  ],
  [
  '/img/sample_map/blue_0.jpg',
  '/img/sample_map/blue_1.jpg',
  '/img/sample_map/blue_2.jpg',
  '/img/sample_map/blue_3.jpg',
  '/img/sample_map/blue_4.jpg',
  '/img/sample_map/blue_5.jpg',
  ],
  [
  '/img/sample_map/red_0.jpg',
  '/img/sample_map/red_1.jpg',
  '/img/sample_map/red_2.jpg',
  '/img/sample_map/red_3.jpg',
  '/img/sample_map/red_4.jpg',
  '/img/sample_map/red_5.jpg',
  ]
];
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

const App = React.createClass({
  getInitialState() {
    return {
      ...DEFAULT_CONFIG,
      imageSource: 2,
    }
  },
  changeImageSource(i) {
    this.setState({imageSource: i});
  },
  resetDefault() {
    this.setState({...DEFAULT_CONFIG});
  },
  changeConfig(source, config, val, e) {
    e.preventDefault();
    let {...newState} = this.state;
    if (source) {
      newState[source][config] = val;
    } else {
      newState[config] = val;
    }
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
  isConfigSet(source, config, value) {
    return this.state[source][config] === value;
  },
  filter(state) {
    if (Object(state)) {
      let filteredState = {};
      Object.keys(state).map(function(key) {
        if (state[key] !== DEFAULT_CONFIG[key] && !configHide.includes(key)) {
          filteredState[key] = state[key];
        }
      });
      return filteredState;
    };
    return false;
  },
  buildConfigTable (obj) {
    let configs = ['bkgSize','height'];
    let configTableRows = configs.map(function(config, i) {
      let value = this.state[obj][config];
      return <tr key={i}>
        <td>{configTableDescription[config]}</td>
        <td><input style={{textAlign: 'center'}} type='text' value={value} onChange={this.handleTextChange.bind(null, config)} /></td>
        <td></td>
      </tr>
    }.bind(this));
    return configTableRows;
  },
  getImageSource() {
    let type = this.state.imageSource;
    switch(type) {
      case 2:
        return imageMDArray;
        break;
      case 1:
      default:
        return imageArray;
    }
  },
  render() {
    let {orientation, posY} = this.state;

    let codeSectionHeader = {
      padding: '0 1em',
      textAlign: 'center'
    };
    // let galleryConfigTable = this.buildConfigTable();
    let filteredState = this.filter(this.state);
    let imageSource = this.getImageSource();
    let secondaryConfig = this.state.imageSource == 2 ?
          <div style={{float: 'left', width: '100%', justifyContent: 'space-around'}} className='flxbx flxwp'>
              <h3 style={{width: '100%'}}>Secondary Jewels</h3>
              <div>
                <h4>Layout</h4>
                <button className={"btn btn-default"+(this.isConfigSet('secondary', 'orientation', 'vertical') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'secondary', 'orientation', 'vertical')}>Vertical</button>
                <button className={"btn btn-default"+(this.isConfigSet('secondary', 'orientation', 'horizontal') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null,  'secondary', 'orientation', 'horizontal')}>Horizontal</button>
              </div>
              <div>
                <h4>Y Axis</h4>
                <button className={"btn btn-default"+(this.isConfigSet('secondary', 'posY', 'top') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'secondary', 'posY', 'top')}>Top</button>
                <button className={"btn btn-default"+(this.isConfigSet('secondary', 'posY', 'bot') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'secondary', 'posY', 'bot')}>Bot</button>
              </div>
              <div>
                <h4>X Axis</h4>
                <button className={"btn btn-default"+(this.isConfigSet('secondary', 'posX', 'left') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'secondary', 'posX', 'left')}>Left</button>
                <button className={"btn btn-default"+(this.isConfigSet('secondary', 'posX', 'right') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'secondary', 'posX', 'right')}>Right</button>
              </div>
          </div>
                    : null;
    return (
      <div style={{padding: '2em'}} className=''>

      <div style={{width: '100%', textAlign: 'center', fontSize: '2.5em'}}><a href='https://github.com/michaellyons/react-amazon-gallery'>React Amazon Gallery</a></div>
      <div style={{width: '100%', textAlign: 'center', fontSize: '1em'}}>This is a React JS Component inspired by clean gallery design.</div>
      <div style={{width: '100%', padding: '1em', height: '40%', display: 'flex', flexWrap: 'wrap', position: 'relative', borderRadius: 4}}>
        <div className='col-6 col-lg-6 col-sm-6 col-md-6'>
          <div className='flxbx'>
            <h4 style={{margin: 'auto 0'}}>One Dimension</h4>
          </div>
          <hr />
          <WorkingGallery config={this.state} images={imageArray} />
        </div>

        <div className='col-6 col-lg-6 col-sm-6 col-md-6'>
          <div className='flxbx'>
            <h4 style={{margin: 'auto 0'}}>Two Dimensions</h4>
          </div>
          <hr />
          <WorkingGallery config={this.state} images={imageMDArray} />
      </div>
        <div style={{width: '40%', textAlign: 'center', margin: '1em auto'}}>
          <div style={codeSectionHeader}><h4>Installation</h4></div>
          <pre><code>{"npm install react-amazon-gallery"}</code></pre>
        </div>
    </div>
      <hr />
      <div style={{padding: ''}} className='container'>

        <form style={{textAlign: 'center', margin: '1em'}} action="https://github.com/michaellyons/react-amazon-gallery">
            <button className={'button button1'} type="submit" value="View Github Project">View Github Project</button>
        </form>
        <div className='col-6 col-lg-6 col-sm-6 col-md-6'>
          <div style={codeSectionHeader}><h4>Usage</h4></div>
          <pre><code>{"import React from 'react';"}
              <br />{"import Gallery from 'react-amazon-gallery';"}
              <br /><br />{"let images = [-image-array-here-]';"}
              <br />{"let config = {-config-object-here};"}
              <br /><br />{"<"+"Gallery images={images} "+(Object.keys(filteredState).length > 0 ? 'config={config}' : '')+" />"}
              </code></pre>
          <div style={codeSectionHeader}><h4>1 Dimension Images</h4></div>
          <pre ><code dangerouslySetInnerHTML={createMarkup('let images1D = '+library.json.prettyPrint(imageArray)+';')}></code></pre>
          <div style={codeSectionHeader}><h4>2 Dimension Images</h4></div>
          <pre ><code dangerouslySetInnerHTML={createMarkup('let images2D = '+library.json.prettyPrint(imageMDArray)+';')}></code></pre>
        </div>
        <div className='col-6 col-lg-6 col-sm-6 col-md-6'>
          <div style={codeSectionHeader}><h4>Customization</h4></div>
          <pre ><code dangerouslySetInnerHTML={createMarkup('let default_config = '+library.json.prettyPrint(DEFAULT_CONFIG)+';')}></code></pre>
        </div>
      </div>
    </div>
    );
  }
});

export default App;

          // <h3 style={{width: '100%'}}>Gallery Settings</h3>
          // <table style={{width: '100%'}}>
          // <tbody>
          //   {galleryConfigTable}
          //   <tr><td>Overlay</td><td onClick={this.changeConfig.bind(null, 'overlay', !this.state.overlay)}>{this.state.overlay ? 'On' : 'Off'}</td></tr>
          // </tbody>
          // </table>
          // <div style={{float: 'left', width: '100%', justifyContent: 'space-around'}} className='flxbx flxwp'>
          //     <h3 style={{width: '100%'}}>Main Jewels</h3>

          //     <div>
          //       <h4>Layout</h4>
          //       <button className={"btn btn-default"+(this.isConfigSet('main', 'orientation', 'vertical') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'main', 'orientation', 'vertical')}>Vertical</button>
          //       <button className={"btn btn-default"+(this.isConfigSet('main', 'orientation', 'horizontal') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'main', 'orientation', 'horizontal')}>Horizontal</button>
          //     </div>
          //     <div>
          //       <h4>Y Axis</h4>
          //       <button className={"btn btn-default"+(this.isConfigSet('main', 'posY', 'top') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'main', 'posY', 'top')}>Top</button>
          //       <button className={"btn btn-default"+(this.isConfigSet('main', 'posY', 'bot') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'main', 'posY', 'bot')}>Bot</button>
          //     </div>
          //     <div>
          //       <h4>X Axis</h4>
          //       <button className={"btn btn-default"+(this.isConfigSet('main', 'posX', 'left') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'main', 'posX', 'left')}>Left</button>
          //       <button className={"btn btn-default"+(this.isConfigSet('main', 'posX', 'right') ? ' active' : '')} type="submit" onClick={this.changeConfig.bind(null, 'main', 'posX', 'right')}>Right</button>
          //     </div>
          // </div>
          // {secondaryConfig}
      // <div style={{width: '100%', justifyContent: 'center', display: 'flex', padding: '1em'}}>
      //   <button onClick={this.changeImageSource.bind(null, 1)} className={'button '+(this.state.imageSource == 1 ? 'button1' : 'button2')}>1 Dimension</button>
      //   <button onClick={this.changeImageSource.bind(null, 2)} className={'button '+(this.state.imageSource == 2 ? 'button1' : 'button2')}>2 Dimensions</button>
      // </div>

          //       <div style={codeSectionHeader}><h4>Prerequisites</h4></div>
          // <div>Use <a href='http://www.npmjs.org'>NPM</a> for package bundling and <a href='http://facebook.github.io/react/'>React JS</a></div>

