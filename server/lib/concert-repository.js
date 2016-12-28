const mongojs = require('mongojs');
const normalizeMongoResponse = require('./utils').normalizeMongoResponse;

const db = mongojs(process.env.MONGODB_URI, ['concerts']);

exports.all = () => {
  return new Promise((resolve, reject) => {
    db.concerts.find((err, concerts) => {
      if (err) {
        return reject(err);
      }
      return resolve(normalizeMongoResponse(concerts));
    });
  });
};

exports.add = (concert) => {
  return new Promise((resolve, reject) => {
    db.concerts.insert(concert, (err, addedConcert) => {
      if (err) {
        return reject(err);
      }
      return resolve(normalizeMongoResponse(addedConcert));
    });
  });
};

exports.update = (id, concert) => {
  return new Promise((resolve, reject) => {
    db.concerts.findAndModify({
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
};

exports.remove = (id) => {
  return new Promise((resolve, _reject) => {
    db.concerts.findOne({ _id: mongojs.ObjectId(id) }, (_findErr, concert) => {
      db.concerts.remove({ _id: mongojs.ObjectId(id) }, { justOne: true }, (_removeErr) => {
        return resolve(normalizeMongoResponse(concert));
      });
    });
  });
};
