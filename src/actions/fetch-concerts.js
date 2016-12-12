import ConcertsRepository from 'store/repositories/ConcertsRepository.js';
import * as concertsEvents from './events/concerts-events';

export const fetchConcerts = () => (dispatch) => {
  new ConcertsRepository().all().then((concerts) => {
    dispatch(concertsEvents.fetched(concerts));
  });
};
