import axios from 'axios';
import * as ConcertsEvents from './events/concerts-events';

export default function fetchConcerts(dispatch) {
  return axios.get('/api/concerts').then((response) => {
    const concerts = response.data;
    dispatch(ConcertsEvents.fetched(concerts));
  });
}
