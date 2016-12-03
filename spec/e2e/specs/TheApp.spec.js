const expect = require('chai').expect;

describe('the app', function() {
  it('is working', function() {
    expect(browser.url('/').getTitle()).to.equal('Aleksandra Kuls Admin');
  });
});