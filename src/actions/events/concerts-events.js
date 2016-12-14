export const FETCHED = 'concertsFetched';
export const fetched = concerts => ({
  type: FETCHED,
  payload: {
    concerts: concerts
  }
});

export const ADDED = 'concertAdded';
export const added = concert => ({
  type: ADDED,
  payload: {
    concert: concert
  }
});
