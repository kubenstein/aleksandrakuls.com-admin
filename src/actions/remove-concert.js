import * as ConcertsEvents from './events/concerts-events';

export default function removeConcert(concert, dispatch) {
  const concertToRemove = concert;
  return new Promise((resolve, _reject) => {
    dispatch(ConcertsEvents.removed(concertToRemove));
    resolve(concertToRemove);
  });
}
