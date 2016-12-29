/* eslint-disable no-underscore-dangle */
const utils = require('util');

exports.normalizeMongoResponse = (docOrDocs) => {
  const isArray = utils.isArray(docOrDocs);
  const docs = isArray ? docOrDocs : [docOrDocs];
  const normlizedDocs = docs.map((el) => {
    const doc = el;
    doc.id = doc._id;
    delete doc._id;
    return doc;
  });
  return isArray ? normlizedDocs : normlizedDocs[0];
};
