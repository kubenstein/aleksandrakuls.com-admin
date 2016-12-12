import ConcertsRepository from 'data/ConcertsRepository.jsx';
import * as concertsEvents from './events/concerts-events';

export const fetchConcerts = () => (dispatch) => {
  new ConcertsRepository().all().then((concerts) => {
    dispatch(concertsEvents.fetched(concerts));
  });
};
