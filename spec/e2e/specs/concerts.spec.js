const mongojs = require('mongojs');
const expect = require('chai').expect;

const db = mongojs(process.env.MONGODB_URI, ['concerts']);

describe('User', () => {
  beforeEach(() => {
    return new Promise((resolve) => {
      db.concerts.remove(() => {
        resolve();
      });
    });
  });

  it('can see concert list', () => {
    whenVisitingConcertPage();
    userCanSeeConcertList();
  });

  it('can remove a concert from the list', () => {
    createConcert('Concert to delete');
    whenVisitingConcertPage();
    userRemovesTheConcert('Concert to delete');
    userCanNotSeeTheConcert('Concert to delete');
  });

  it('can add a new concert', () => {
    whenVisitingConcertAddPage();
    andSubmittingAConcertForm('Just added Concert title');
    userCanSeeTheConcert('Just added Concert title');
  });

  it('can not add an invalid concert', () => {
    whenVisitingConcertAddPage();
    andSubmittingAConcertForm(' ');
    userCanSee('Polish text cant be empty');
  });

  it('can edit a concert', () => {
    createConcert('concert to edit');
    whenVisitingConcertEditPage('concert to edit');
    andSubmittingAConcertForm('Just edited Concert title');
    userCanSeeTheConcert('Just edited Concert title');
  });

  it('can remove a concert from the edit page', () => {
    createConcert('Concert to delete');
    whenVisitingConcertEditPage('Concert to delete');
    userRemovesTheConcert('Concert to delete');
    userCanNotSeeTheConcert('Concert to delete');
  });

  it('can not wrongly edit a concert', () => {
    createConcert('concert to edit');
    whenVisitingConcertEditPage('concert to edit');
    andSubmittingAConcertForm(' ');
    userCanSee('Polish text cant be empty');
  });

  // private

  function whenVisitingConcertPage() {
    browser.url('/');
  }

  function whenVisitingConcertAddPage() {
    whenVisitingConcertPage();
    browser.click('a*=Add New Concert');
    userCanSee('Add Concert Form');
  }

  function whenVisitingConcertEditPage(concertTitle) {
    whenVisitingConcertPage(concertTitle);

    const links = browser.$$('a*=Edit');
    const link = links[links.length - 1];
    link.click();
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

  function userCanNotSeeTheConcert(concertTitle) {
    userCanNotSee(concertTitle);
  }

  function userCanSeeConcertList() {
    userCanSee('Concert List');
  }

  function userCanSee(text) {
    expect($('body').getText()).to.include(text);
  }

  function userCanNotSee(text) {
    expect($('body').getText()).to.not.include(text);
  }

  function createConcert(concertTitle) {
    const concert = {
      date: '2016-12-02',
      textPL: concertTitle,
      textEN: concertTitle
    };
    db.concerts.insert(concert, () => {});
  }

  function userRemovesTheConcert(_concertTitle) {
    const links = browser.$$('button*=Delete');
    const link = links[links.length - 1];
    link.click();
    browser.alertAccept();
  }
});
