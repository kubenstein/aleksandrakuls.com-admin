const mongojs = require('mongojs');
const normalizeMongoResponse = require('./utils').normalizeMongoResponse;

class ConcertRepository {
  constructor(mongoDbUri) {
    this.db = mongojs(mongoDbUri, ['concerts']);
  }

  clean() {
    return new Promise((resolve, _reject) => {
      this.db.concerts.remove(() => {
        resolve();
      });
    });
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
    const concertToAdd = this.timestampedConcert(concert);
    return new Promise((resolve, reject) => {
      this.db.concerts.insert(concertToAdd, (err, addedConcert) => {
        if (err) {
          return reject(err);
        }
        return resolve(normalizeMongoResponse(addedConcert));
      });
    });
  }

  update(id, concert) {
    const concertToUpdate = this.timestampedConcert(concert);
    return new Promise((resolve, reject) => {
      this.db.concerts.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: concertToUpdate },
        new: true
      }, (err, updatedConcert) => {
        if (err) {
          return reject(err);
        }
        return resolve(normalizeMongoResponse(updatedConcert));
      });
    });
  }

  softRemove(id) {
    return new Promise((resolve, _reject) => {
      this.db.concerts.findOne({ _id: mongojs.ObjectId(id) }, (_findErr, concert) => {
        const concertToSoftRemove = normalizeMongoResponse(concert);
        concertToSoftRemove.deletedAt = new Date();

        this.update(concertToSoftRemove.id, concertToSoftRemove).then((softRemovedConcert) => {
          return resolve(softRemovedConcert);
        });
      });
    });
  }

  removeAllSoftRemoved() {
    return new Promise((resolve, _reject) => {
      this.db.concerts.remove(
        { deletedAt: { $exists: true } },
        (_removeErr) => {
          return resolve();
        }
      );
    });
  }

  markAllAsDeployed() {
    const date = new Date();
    return new Promise((resolve, reject) => {
      this.db.concerts.update(
        {},
        { $set: { deployedAt: date } },
        { multi: true },
        (err) => {
          if (err) {
            return reject(err);
          }
          return resolve();
        });
    });
  }

  // private

  timestampedConcert(concert) {
    const result = concert;
    result.updatedAt = new Date();
    return result;
  }
}

module.exports = ConcertRepository;
