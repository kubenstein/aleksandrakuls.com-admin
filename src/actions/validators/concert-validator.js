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
    if (!concert.date.trim()) errors.push('Date cant be empty');
    if (!concert.textPL.trim()) errors.push('Polish text cant be empty');
    return errors;
  }
}
