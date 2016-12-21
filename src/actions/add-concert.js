import axios from 'axios';
import * as ConcertsEvents from './events/concerts-events';
import ConcertValidator from './validators/concert-validator';

export default function addConcert(concert, dispatch) {
  return validate(concert)
    .then(validConcert => sendRequest(validConcert))
    .then((addedConcert) => {
      dispatch(ConcertsEvents.added(addedConcert));
      return addedConcert;
    });
}

// private

function validate(concert) {
  return new ConcertValidator(concert).validate();
}

function sendRequest(concert) {
  return axios.post('/api/concerts/', { concert: concert }).then((response) => {
    const addedConcert = response.data;
    return addedConcert;
  });
}
