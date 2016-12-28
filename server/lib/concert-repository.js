const mongojs = require('mongojs');
const normalizeMongoResponse = require('./utils').normalizeMongoResponse;

class ConcertRepository {
  constructor(mongoDbUri) {
    this.db = mongojs(mongoDbUri, ['concerts']);
  }

  all() {
    return new Promise((resolve, reject) => {
      this.db.concerts.find((err, concerts) => {
        if (err) {
          return reject(err);
        }
        return resolve(normalizeMongoResponse(concerts));
      });
    });
  }

  add(concert) {
    return new Promise((resolve, reject) => {
      this.db.concerts.insert(concert, (err, addedConcert) => {
        if (err) {
          return reject(err);
        }
        return resolve(normalizeMongoResponse(addedConcert));
      });
    });
  }

  update(id, concert) {
    return new Promise((resolve, reject) => {
      this.db.concerts.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: concert },
        new: true
      }, (err, updatedConcert) => {
        if (err) {
          return reject(err);
        }
        return resolve(normalizeMongoResponse(updatedConcert));
      });
    });
  }

  remove(id) {
    return new Promise((resolve, _reject) => {
      this.db.concerts.findOne({ _id: mongojs.ObjectId(id) }, (_findErr, concert) => {
        this.db.concerts.remove({ _id: mongojs.ObjectId(id) }, { justOne: true }, (_removeErr) => {
          return resolve(normalizeMongoResponse(concert));
        });
      });
    });
  }
}

module.exports = ConcertRepository;
