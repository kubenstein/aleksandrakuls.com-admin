const expect = require('chai').expect;

describe('User', () => {
  it('can see concert list', () => {
    whenVisitingConcertPage();
    userCanSeeConcertList();
  });

  it('can add new concert', () => {
    whenVisitingConcertAddPage();
    andSubmittingAConcertForm('Just added Concert title');
    userCanSeeTheConcert('Just added Concert title');
  });

  xit('can edit a concert', () => {
    whenVisitingConcertEditPage();
    andSubmittingAConcertForm('Just edited Concert title');
    userCanSeeTheConcert('Just edited Concert title');
  });

  // private

  function whenVisitingConcertPage() {
    browser.url('/');
  }

  function whenVisitingConcertAddPage() {
    whenVisitingConcertPage();
    browser.click('a*=Add New Concert');
    userWillSeeTheForm();
  }

  function andSubmittingAConcertForm(concertTitle) {
    browser.selectorExecute('input[name=date]', (elements) => {
      const element = elements[0];
      element.value = '2016-12-02';
    });
    browser.setValue('textarea[name=textPL]', concertTitle);
    browser.setValue('textarea[name=textEN]', concertTitle);
    browser.submitForm('#addConcertForm');
  }

  function userCanSeeTheConcert(concertTitle) {
    expect($('body').getText()).to.include(concertTitle);
  }

  function userCanSeeConcertList() {
    expect($('body').getText()).to.include('Concert list');
  }

  function userWillSeeTheForm() {
    expect($('body').getText()).to.include('Add concert Form');
  }
});
