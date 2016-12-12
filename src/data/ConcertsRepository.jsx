const concertsDb = [
  { id: '1', date: '1/12/2014', textPL: 'concert text PL 1', textEN: 'concert text EN 1' },
  { id: '2', date: '2/12/2014', textPL: 'concert text PL 2', textEN: 'concert text EN 2' },
  { id: '3', date: '3/12/2014', textPL: 'concert text PL 3', textEN: 'concert text EN 3' }
];

export default class ConcertsRepository {
  all() {
    return new Promise((resolve) => {
      resolve(concertsDb);
    });
  }

  find(id) {
    return new Promise((resolve) => {
      this.all().then((concerts) => {
        const concert = concerts.find(aConcert => aConcert.id === id);
        resolve(concert);
      });
    });
  }
}
