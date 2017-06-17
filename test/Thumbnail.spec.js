import React from 'react';
import Thumbnail from '../src/Thumbnail';
import { mount, shallow, render } from 'enzyme';
import PropTypes from 'prop-types';

describe('(Component) Thumbnail', () => {
  let _component;

  beforeEach(() => {
    _component = shallow(
      <Thumbnail
      index={0}
      i={0}
      place={'main'}
      hlSize={4}
      img='test.jpg'
      hlColor="#fe001a" />);
  })

  it('Should exist.', () => {
    expect(_component).to.exist
  })
  describe('(Props)', () => {

  })

})
