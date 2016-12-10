import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import ConcertList from 'components/concerts/ConcertList.jsx';

describe('Concerts', () => {
  let element;

  beforeEach(() => {
    const instance = TestUtils.renderIntoDocument(<ConcertList />);
    element = ReactDOM.findDOMNode(instance);
  });

  it('renders list of concerts', () => {
    expect(element.textContent).to.include('Concert list');
    expect(element.textContent).to.include('concert text PL 1');
  });
});
