import axios from 'axios';
import * as ConcertsEvents from './events/concerts-events';
import ConcertValidator from './validators/concert-validator';

export default function addConcert(concert, dispatch) {
  return validate(concert)
    .then(validConcert => sendRequest(validConcert))
    .then((updatedConcert) => {
      dispatch(ConcertsEvents.updated(updatedConcert));
      return updatedConcert;
    });
}

// private

function validate(concert) {
  return new ConcertValidator(concert).validate();
}

function sendRequest(concert) {
  const id = concert.id;
  return axios.post(`/api/concerts/${id}`, { concert: concert }).then((response) => {
    const addedConcert = response.data;
    return addedConcert;
  });
}
