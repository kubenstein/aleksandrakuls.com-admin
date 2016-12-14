import ConcertsRepository from 'store/repositories/concerts-repository.js';
import * as ConcertsEvents from './events/concerts-events';

export const fetchConcerts = (dispatch) => {
  new ConcertsRepository().all().then((concerts) => {
    dispatch(ConcertsEvents.fetched(concerts));
  });
};
