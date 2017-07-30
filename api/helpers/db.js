const low = require('lowdb'),
  fileAsync = require('lowdb/lib/storages/file-async');

const db = low('db.json', {
  storage: fileAsync
});

module.exports = {db};