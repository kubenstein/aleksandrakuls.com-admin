import * as ConcertsEvents from './events/concerts-events';
import ConcertValidator from './validators/concert-validator';

export default function updateConcert(concert, dispatch) {
  return new ConcertValidator(concert).validate().then((validConcert) => {
    dispatch(ConcertsEvents.updated(validConcert));
  });
}
