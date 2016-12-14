import foreach from 'lodash/foreach';
import * as ConcertsEvents from 'actions/events/concerts-events';

const initialState = {
  concerts: {},
};

export default (state = initialState, action = null) => {
  switch (action.type) {
    case ConcertsEvents.FETCHED: {
      const fetchedConcerts = action.payload.concerts;
      const updatedConcerts = Object.assign({}, state.concerts);
      fetchedConcerts.forEach((c) => {
        updatedConcerts[c.id] = c;
      });
      return Object.assign({}, state, {
        concerts: updatedConcerts,
      });
    }

    case ConcertsEvents.ADDED: {
      const concerts = state.concerts;
      concerts.push(action.payload.concert);
      return Object.assign({}, state, {
        concerts: concerts
      });
    }

    default:
      return state;
  }
};
