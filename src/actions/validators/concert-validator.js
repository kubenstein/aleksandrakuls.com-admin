export default class ConcertValidator {
  constructor(concert) {
    this.concert = concert;
  }

  validate() {
    return new Promise((resolve, reject) => {
      const errors = this.validationErrors(this.concert);
      if (errors.length === 0) {
        resolve(this.concert);
      } else {
        reject(errors, this.concert);
      }
    });
  }

  validationErrors(concert) {
    const errors = [];
    if (!concert.date) errors.push('date cant be empty');
    if (!concert.textPL) errors.push('Polish text cant be empty');
    return errors;
  }
}
