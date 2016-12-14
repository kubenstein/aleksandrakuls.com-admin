import * as ConcertsEvents from './events/concerts-events';

export default function updateConcert(concert, dispatch) {
  return new Promise((resolve) => {
    dispatch(ConcertsEvents.updated(concert));
    resolve(concert);
  });
}
