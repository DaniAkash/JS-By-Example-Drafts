module.exports = {
  posts: posts
};

const low = require('lowdb'),
  fileAsync = require('lowdb/lib/storages/file-async');

const db = low('db.json', {
  storage: fileAsync
});

// db.defaults({ posts: [] })
//   .write()

function posts(req, res) {
    // console.log(db);
    // console.log(db.get('posts'))
    const posts = db.get('posts').value();
    console.log(posts);

    res.status(200).json({posts});
}