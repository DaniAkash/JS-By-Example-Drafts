module.exports = {
  posts,
  author,
};

const db = require('../helpers/db').db;

function posts(req, res) {
    const posts = db.get('posts').value();

    res.status(200).json({posts});
}

function author(req, res) {
    const posts = db.get('posts').filter({author: req.swagger.params.name.value});

    res.status(200).json(posts);
}