import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from '../src';
import moment from 'moment';
import marked from 'marked';
import ParallaxWrap from './Parallax';
import LazyImage from './LazyImage';
import './main.css';
import '../styles/main.css';

import './mui-github-markdown.css';
import './prop-type-description.css';

const stringThing = (curve, vars) =>
{ return '```javascript\n\
import React, { Component } from \'react\' \
import Gallery from \'react-amazon-gallery\' \
\n\
\n\
\n\
class AwesomeComponent extends Component {\n\
  constructor(props) {\n\
    super(props);\n\
  }\n\
  render() {\n\
    let images = [\n\
      "./images/image_1.jpg",\n\
      "./images/image_2.jpg",\n\
      "./images/image_3.jpg",\n\
      "./images/image_4.jpg",\n\
      ...\n\
    ];\n\
    return <Gallery images={data} />\n\
  }\n\
}\n\
```'}

let ImageArray1D = [
  './public/sample_array/land0.jpg',
  './public/sample_array/land1.jpg',
  './public/sample_array/land2.jpg',
  './public/sample_array/land3.jpg',
  './public/sample_array/land4.jpg',
];
let ImageArray2D = [
  [
  './public/sample_map/blck_0.jpg',
  './public/sample_map/blck_1.jpg',
  './public/sample_map/blck_2.jpg',
  './public/sample_map/blck_3.jpg',
  './public/sample_map/blck_4.jpg',
  './public/sample_map/blck_5.jpg',
  ],
  [
  './public/sample_map/blue_0.jpg',
  './public/sample_map/blue_1.jpg',
  './public/sample_map/blue_2.jpg',
  './public/sample_map/blue_3.jpg',
  './public/sample_map/blue_4.jpg',
  './public/sample_map/blue_5.jpg',
  ],
  [
  './public/sample_map/red_0.jpg',
  './public/sample_map/red_1.jpg',
  './public/sample_map/red_2.jpg',
  './public/sample_map/red_3.jpg',
  './public/sample_map/red_4.jpg',
  './public/sample_map/red_5.jpg',
  ]
];

const SECTION_TITLE_STYLE = {
  margin: '0px 0px 20px 0px',
  padding: 10,
  borderBottom: '1px solid lightgrey'
};
const SECTION_STYLE = {
  padding: 10
};

const COLOR_INPUT_STYLE = {
  position: 'relative',
  height: 34,
  width: 60,
  boxShadow: '0px 0px 4px grey',
  margin: 4,
  borderRadius: 34,
};
const CHECKBOX_INPUT_STYLE = {
  width: 18,
  margin: '0px 36px',
  textAlign: 'center'
};
const BTN_STYLE = {
  margin: '0px 8px'
};
const OPTION_STYLE = {
  borderBottom: '1px solid lightgrey'
};

function formatData(data) {
  var obj = {};
  data.keys.map(function(k, i) {
    obj[k] = data.data[i];
  });
  obj.rawDate = data.date;
  return obj;
}
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interp: 'curveCardinal',
      titleBkg: '#111111',
      textColor: '#FFFFFF',
      labelColor: '#FFFFFF',
      mainBkg: '#263238',
      imageSource: 1,
      showCode: {},
      data: []
    };
    this.handleResize = this.handleResize.bind(this)
    this.getSize = this.getSize.bind(this)
    this.setData = this.setData.bind(this)
    this.handleDataChange = this.handleDataChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.toggleCode = this.toggleCode.bind(this)
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
  handleResize () {
    this.setState({ ...this.getSize() })
  }
  getSize () {
    return {w: window.innerWidth, h: window.innerHeight}
  }
  setData(key, val) {
    let { ...state } = this.state;
    state[key] = val;
    // console.log(key, e.target.value);
    this.setState(state);
  }
  handleDataChange(key, e) {
    let { ...state } = this.state;
    state[key] = e.target.value;
    // console.log(key, e.target.value);
    this.setState(state);
  }
  handleCheckboxChange(key) {
    let { ...state } = this.state;
    state[key] = !state[key];
    // console.log(key, state[key]);
    this.setState(state);
  }
  buildPropRow(row, i) {
    return <tr key={i} style={OPTION_STYLE}>
              <td className='col-xs-2 propKey'>{row.key}</td>
              <td className='col-xs-2 propType'>{row.type}</td>
              <td>{row.default}</td>
              <td><div
                style={{margin: ''}}
                dangerouslySetInnerHTML={{__html: marked(row.desc || '')}} /></td>
           </tr>
  }
  toggleCode(key) {
    let { ...state } = this.state;
    let { showCode } = state;
    showCode[key] = !showCode[key];
    // console.log(key, showCode[key]);
    this.setState({showCode});
  }
  buildTable(title, header, rows) {
    return <table className='displayTable' style={{padding: 20, width: '100%'}}>
              <thead>
              <tr>
               {header.map((h, i) => <th style={{paddingLeft: 10}} key={i}>{h}</th>)}
               </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
  }
  buildColorDiv(key, value) {
    return <div key={key} style={{position: 'relative', margin: '6px 0px', boxShadow: '0px 0px 4px grey', height: 34, width: 60, borderRadius: 34, background: value}}>
          <input
            type='color'
            style={{...COLOR_INPUT_STYLE, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0}}
            value={value}
            onChange={this.handleDataChange.bind(null, key)} />
      </div>
  }
  render() {

    let {
      h,
      w,
      titleBkg,
      imageSource,
      progressColor,
      textColor,
      done,
      launch,
      interp,
      showCode,
      title,
      data,
      records,
      mainBkg,
    } = this.state;
    let generalOptions = this.buildTable('Props', ['Name', 'Type', 'Default', 'Description'], [
      {
        key: 'images',
        type: 'Array<String>',
        desc: 'Array of image src locations'
      },
      {
        key: 'width',
        type: 'string|number',
        default: '400',
        desc: 'Width of the Container div',
        component: null
      },
      {
        key: 'height',
        default: '400',
        type: 'string|number',
        desc: 'Height of the Container div',
        component: null
      },
      {
        key: 'bkgSize',
        type: 'string',
        default: 'contain',
        desc: 'CSS Background Size for Gallery image.',
        component: null
      },
      {
        key: 'id',
        type: 'string',
        default: '',
        desc: 'The string id applied to the SVG component',
        component: null
      },
      {
        key: 'style',
        type: 'object',
        default: ``,
        desc: 'Override the default style object.',
        component: null
      },
      {
        key: 'containerStyle',
        type: 'object',
        default: ``,
        desc: 'Override the default container style object.',
        component: null
      }
    ].map((item, i) => {
      return this.buildPropRow(item, i);
    }));

    return <div className='rootBkg' style={{color: 'white'}}>
            <div style={{width: '100%', position: 'fixed', top: 0, left: 0}}>
                <ParallaxWrap
                  full={true}
                  background={<LazyImage src={'./public/ses_10_prep.jpg'} />}
                  style={{ minHeight: h }}>
                  </ParallaxWrap>
            </div>
            <div className='container'>
            <div style={{ transition: 'all 0.9s ease-out', position: 'relative', zIndex: 1, paddingBottom: 120}}>
              <div style={{marginBottom: 30, textAlign: 'center'}} >
                <h1>React Amazon Gallery</h1>
                <h4>{`npm install react-amazon-gallery`}</h4>
                <h4>{`yarn add react-amazon-gallery`}</h4>
              </div>
              <div style={{marginBottom: 30, textAlign: 'center'}}>
                <h3>{`Inspired by Amazon's simple product display.`}</h3>
              </div>
              <div className='flex' style={{marginBottom: 20}}>
                <div className='btn-group' style={{margin: 'auto'}}>
                  <button
                    className={'btn btn-primary '+ (imageSource === 1 ? 'active' : '')}
                    onClick={this.setData.bind(null, 'imageSource', 1)}>
                    1 Dimension
                  </button>
                  <button
                    className={'btn btn-primary '+ (imageSource === 2 ? 'active' : '')}
                    onClick={this.setData.bind(null, 'imageSource', 2)}>
                    2 Dimension
                  </button>
                </div>
              </div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Gallery images={imageSource === 2 ? ImageArray2D : ImageArray1D} />
              </div>

              <div className='glassBkg'>
              <div className='pad2'>
                <div className='flex' style={{marginBottom: 20}}>
                <span style={{fontSize: 24, margin: 'auto 0px'}}>{"<Gallery />"}</span>
                <div style={{marginLeft: 'auto'}}>
                  <button
                    className={'btn '+ (showCode['gallery'] ? 'btn-disabled' : 'btn-primary')}
                    onClick={this.toggleCode.bind(null, 'gallery')}>
                    {showCode['gallery'] ? 'Hide Code' : 'Show Code'}
                  </button>
                </div>
                </div>
                <div className={'accordion ' + (!showCode['gallery'] && 'accordionClosed')}>
                  <div className='accordionContent'>
                    <div
                      style={{margin: '10px 0'}}
                      dangerouslySetInnerHTML={{__html: marked(stringThing(interp))}} />
                  </div>
                </div>
                <h3 style={SECTION_TITLE_STYLE}>{"Properties"}</h3>
                {generalOptions}
              </div>
              </div>
            </div>
            </div>
          </div>
  }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {

  ReactDOM.render(
    <Demo style={{backgroundColor: 'none'}} />,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./main', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

render();
