import forEach from 'lodash.foreach';
import * as ConcertsEvents from 'actions/events/concerts-events';

const initialState = {
  concerts: {},
};

export default (state = initialState, action = null) => {
  switch (action.type) {
    case ConcertsEvents.FETCHED: {
      const concerts = {};
      const fetchedConcerts = action.payload.concerts;
      forEach(fetchedConcerts, (c) => {
        concerts[c.id] = c;
      });
      return Object.assign({}, state, {
        concerts: concerts,
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

    default:
      return state;
  }
};
