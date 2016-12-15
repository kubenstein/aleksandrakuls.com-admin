const expect = require('chai').expect;

describe('User', () => {
  it('can see concert list', () => {
    whenVisitingConcertPage();
    userCanSeeConcertList();
  });

  it('can add a new concert', () => {
    whenVisitingConcertAddPage();
    andSubmittingAConcertForm('Just added Concert title');
    userCanSeeTheConcert('Just added Concert title');
  });

  it('can not add an invalid concert', () => {
    whenVisitingConcertAddPage();
    andSubmittingAConcertForm('');
    userCanSee('Polish text cant be empty');
  });

  it('can edit a concert', () => {
    whenCreatingAndGoingToConcertEditPage('concert to edit');
    andSubmittingAConcertForm('Just edited Concert title');
    userCanSeeTheConcert('Just edited Concert title');
  });

  it('can not wrongly edit a concert', () => {
    whenCreatingAndGoingToConcertEditPage('concert to edit');
    andSubmittingAConcertForm('');
    userCanSee('Polish text cant be empty');
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

  function whenCreatingAndGoingToConcertEditPage(concertTitle) {
    whenVisitingConcertAddPage();
    andSubmittingAConcertForm(concertTitle);
    userCanSeeConcertList();
    browser.click('a*='+ concertTitle);
  }

  function andSubmittingAConcertForm(concertTitle) {
    browser.selectorExecute('input[name=date]', (elements) => {
      const element = elements[0];
      element.value = '2016-12-02';
    });
    browser.setValue('textarea[name=textPL]', concertTitle);
    browser.setValue('textarea[name=textEN]', concertTitle);
    browser.submitForm('#concertForm');
  }

  function userCanSeeTheConcert(concertTitle) {
    userCanSee(concertTitle);
  }

  function userCanSeeConcertList() {
    userCanSee('Concert list');
  }

  function userWillSeeTheForm() {
    userCanSee('Add concert Form');
  }

  function userCanSee(text) {
    expect($('body').getText()).to.include(text);
  }    
});
