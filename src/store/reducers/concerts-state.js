import * as ConcertsEvents from 'actions/events/concerts-events';

const initialState = {
  concerts: [],
};

export default (state = initialState, action = null) => {
  switch (action.type) {
    case ConcertsEvents.FETCHED:
      return Object.assign({}, state, {
        concerts: action.payload.concerts,
      });

    default:
      return state;
  }
};
