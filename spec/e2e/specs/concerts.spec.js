const expect = require('chai').expect;

describe('User', () => {
  it('can see concert list', () => {
    browser.url('/');

    expect(browser.getText('body')).to.include('Concert list');
    expect(browser.getText('body')).to.include('concert text PL 1');
  });

  it('can see new concert form', () => {
    browser.url('/');
    browser.click('a*=Add New Concert');

    expect(browser.getText('body')).to.include('Add concert Form');
  });
});
