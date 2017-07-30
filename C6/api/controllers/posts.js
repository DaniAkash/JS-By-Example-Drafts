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

    if(posts.length) {
        res.status(200).json(posts);
    } else {
        res.status(400).json({message: 'No Posts found!'});
    }
}