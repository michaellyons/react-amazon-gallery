import React from 'react';
import Gallery from '../src/Gallery';
import { mount, shallow, render } from 'enzyme';
import PropTypes from 'prop-types';

let OneDImageArray = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

describe('(Component) Gallery', () => {
  let _component;

  beforeEach(() => {
    _component = shallow(<Gallery images={OneDImageArray} />);
  })
  it('Should exist.', () => {
    expect(_component).to.exist
  })
  describe('(Props)', () => {
    
  })
  describe('(Thumbnails)', () => {
    it('Renders Thumbnails', () => {

    })
  })
})
