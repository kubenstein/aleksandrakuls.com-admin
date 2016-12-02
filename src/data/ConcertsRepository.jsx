export default class ConcertsRepository {
  all() {
    return [
      { id: '1', date: '1/12/2014', textPL: 'text PL 1', textEN: 'text EN 1' },
      { id: '2', date: '2/12/2014', textPL: 'text PL 2', textEN: 'text EN 2' },
      { id: '3', date: '3/12/2014', textPL: 'text PL 3', textEN: 'text EN 3' }
    ];
  }

  find(id) {
    return this.all().find(concert => concert.id === id);
  }
}
