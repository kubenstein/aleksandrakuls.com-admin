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

export const UPDATED = 'concertUpdated';
export const updated = concert => ({
  type: UPDATED,
  payload: {
    concert: concert
  }
});

export const REMOVED = 'concertRemoved';
export const removed = concert => ({
  type: REMOVED,
  payload: {
    concert: concert
  }
});
