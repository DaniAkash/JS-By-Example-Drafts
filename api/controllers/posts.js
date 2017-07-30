module.exports = {
  posts: posts
};

const db = require('../helpers/db').db;


// db.defaults({ posts: [] })
//   .write()

function posts(req, res) {
    const posts = db.get('posts').value();

    res.status(200).json({posts});
}