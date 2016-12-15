import * as ConcertsEvents from './events/concerts-events';

export default function addConcert(concert, dispatch) {
  const concertToAdd = concert;
  return new Promise((resolve) => {
    concertToAdd.id = Math.random().toString();
    dispatch(ConcertsEvents.added(concertToAdd));
    resolve(concertToAdd);
  });
}
