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
        .then(() => {
            res.status(200).json({message: 'Post added Successfully'});
        })
        .catch(console.error);
}

function post(req, res) {
    const posts = db.get('posts').value();

    const post = _.find(posts, {id: req.swagger.params.id.value});

    if(post) {
        res.status(200).json(post);
    }
    res.status(400).json({message: 'no posts found'})
}