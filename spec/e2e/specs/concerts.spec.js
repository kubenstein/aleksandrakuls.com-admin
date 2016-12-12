const expect = require('chai').expect;

describe('User', () => {
  it('can see concert list', () => {
    whenVisitingConcertPage();
    userCanSeeConcertList();
  });

  it('can add new concert', () => {
    whenVisitingConcertAddPage();
    addSubmittingAConcertForm('Just added Concert title');
    userCanSeeTheConcert('Just added Concert title');
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

  function addSubmittingAConcertForm(concertTitle) {
    browser.setValue('input[name=date]', '15/12/2016');
    browser.setValue('textarea[name=textPL]', concertTitle);
    browser.setValue('textarea[name=textEN]', concertTitle);
    browser.submitForm('#addConcertForm');
  }

  function userCanSeeTheConcert(concertTitle) {
    whenVisitingConcertPage();
    expect($('body').getText()).to.include(concertTitle);
  }

  function userCanSeeConcertList() {
    expect($('body').getText()).to.include('Concert list');
  }

  function userWillSeeTheForm() {
    expect($('body').getText()).to.include('Add concert Form');
  }
});
