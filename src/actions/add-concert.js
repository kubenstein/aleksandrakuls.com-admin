import * as ConcertsEvents from './events/concerts-events';

export default function addConcert(concert, dispatch) {
  return new Promise((resolve) => {
    dispatch(ConcertsEvents.added(concert));
    resolve(concert);
  });
}
