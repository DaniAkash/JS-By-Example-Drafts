module.exports = {
  addPost,
  post,
};

const db = require('../helpers/db').db;
const _ = require('lodash');

function addPost(req, res) {
    db.get('posts')
        .unshift(req.body)
        .write()
        .then(() => res.status(200).json({message: 'Post added Successfully'}))
        .catch(error => res.status(500).json({message: 'Unable to add post!'}));
}

function post(req, res) {
    const posts = db.get('posts').value();

    const post = _.find(posts, {id: req.swagger.params.id.value});

    if(post) {
        res.status(200).json(post);
        return;
    }
    res.status(400).json({message: 'no posts found'})
}