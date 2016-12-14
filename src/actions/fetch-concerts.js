import * as ConcertsEvents from './events/concerts-events';

const concerts = [
  { id: '1', date: '2014-12-02', textPL: 'concert text PL 1', textEN: 'concert text EN 1' }
];

export default function fetchConcerts(dispatch) {
  return new Promise((resolve) => {
    dispatch(ConcertsEvents.fetched(concerts));
    resolve(concerts);
  });
}
