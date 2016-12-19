import { forEach } from 'lodash';
import * as ConcertsEvents from 'actions/events/concerts-events';

const initialState = {
  concerts: {},
};

export default (state = initialState, action = null) => {
  switch (action.type) {
    case ConcertsEvents.FETCHED: {
      const fetchedConcerts = action.payload.concerts;
      const updatedConcerts = Object.assign({}, state.concerts);
      forEach(fetchedConcerts, (c) => {
        updatedConcerts[c.id] = c;
      });
      return Object.assign({}, state, {
        concerts: updatedConcerts,
      });
    }

    case ConcertsEvents.ADDED: {
      const concert = action.payload.concert;
      const updatedConcerts = Object.assign({}, state.concerts);
      updatedConcerts[concert.id] = concert;
      return Object.assign({}, state, {
        concerts: updatedConcerts
      });
    }

    case ConcertsEvents.UPDATED: {
      const concert = action.payload.concert;
      const updatedConcerts = Object.assign({}, state.concerts);
      updatedConcerts[concert.id] = concert;
      return Object.assign({}, state, {
        concerts: updatedConcerts
      });
    }

    case ConcertsEvents.REMOVED: {
      const concert = action.payload.concert;
      const updatedConcerts = Object.assign({}, state.concerts);
      delete updatedConcerts[concert.id];
      return Object.assign({}, state, {
        concerts: updatedConcerts
      });
    }

    default:
      return state;
  }
};
