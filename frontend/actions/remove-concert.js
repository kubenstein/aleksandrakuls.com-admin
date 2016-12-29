import axios from 'axios';
import * as ConcertsEvents from './events/concerts-events';

export default function removeConcert(concert, dispatch) {
  const id = concert.id;

  return axios.delete(`/api/concerts/${id}`)
  .then((response) => {
    const removedConcert = response.data;
    dispatch(ConcertsEvents.removed(removedConcert));
  });
}
