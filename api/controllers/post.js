module.exports = {
  addPost,
};

const db = require('../helpers/db').db;

function addPost(req, res) {
    console.log(req.body);
    const writeStatus = db.get('posts')
        .unshift(req.body)
        .write()
        .then(() => {
            res.status(200).json({message: 'Post added Successfully'});
        })
        .catch(console.error);
}