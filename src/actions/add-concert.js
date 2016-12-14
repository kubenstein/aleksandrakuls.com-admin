import ConcertsRepository from 'store/repositories/concerts-repository.js';
import * as ConcertsEvents from './events/concerts-events';

export const addConcert = (concert, dispatch) => new ConcertsRepository().add(concert).then(() => {
  dispatch(ConcertsEvents.added(concert));
});
