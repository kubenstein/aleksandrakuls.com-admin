import ConcertsRepository from 'data/ConcertsRepository.jsx';
import * as concertsEvents from './events/concerts-events';

const concerts = new ConcertsRepository().all();

export const fetchConcerts = () => (dispatch) => {
  dispatch(concertsEvents.fetched(concerts));
};
