import MemoryAdapter from 'store/adapters/memory-adapter.js';

export default class ConcertsRepository {
  constructor() {
    this.adapter = new MemoryAdapter();
  }

  empty() {
    return {
      id: '-1',
      date: '',
      textPL: '',
      textEN: ''
    };
  }

  all() {
    return this.adapter.all('concerts');
  }

  add(concert) {
    return this.adapter.add('concerts', concert);
  }

  update(concert) {
    return this.adapter.update('concerts', concert);
  }

  find(id) {
    return this.adapter.find('concerts', id);
  }
}
