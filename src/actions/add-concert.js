import * as ConcertsEvents from './events/concerts-events';
import ConcertValidator from './validators/concert-validator';

export default function addConcert(concert, dispatch) {
  const concertToAdd = concert;
  concertToAdd.id = Math.random().toString();

  return new ConcertValidator(concert).validate().then((validConcert) => {
    dispatch(ConcertsEvents.added(validConcert));
  });
}
