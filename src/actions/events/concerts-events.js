export const FETCHED = 'concertsFetched';
export const fetched = concerts => ({
  type: FETCHED,
  payload: {
    concerts: concerts
  }
});
