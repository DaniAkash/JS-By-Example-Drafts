module.exports = {
  posts,
};

const db = require('../helpers/db').db;

function posts(req, res) {
    const posts = db.get('posts').value();

    res.status(200).json({posts});
}