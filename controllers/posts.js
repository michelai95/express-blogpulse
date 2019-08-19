var async = require('async');
var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /posts - create a new post
router.post('/', function(req, res) {
  // Turn the tags string into an array
  var tags = [];
  if(req.body.tags){
    tags = req.body.tags.split(",");
    // tags = tags.filter(function(t){ return t.trim() != ""; });
  }

  db.post.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then(function(post) {
    // If I have tags, I want to find/create and add them
    if (tags.length > 0) {
      // NOT ASYNC SOLUTION (RACE CONDITION)
      tags.forEach(function(t) {
        db.tag.findOrCreate({
          where: { content: t.trim() }
        })
        .spread(function(newTag, wasCreated){
          post.addTag(newTag); // Add relation to join table
        })
      });
      res.redirect('/posts/' + post.id);

      // ASYNC SOLUTION
      // async.forEach(tags, function(t, done){
      //   db.tag.findOrCreate({
      //     where: { content: t.trim() }
      //   })
      //   .spread(function(newTag, wasCreated){
      //     post.addTag(newTag)
      //     .then(function(){
      //       done();
      //     })
      //     .catch(done);
      //   })
      //   .catch(done);
      // }, function() {
      //   res.redirect('/posts/' + post.id); // Go to created post's show page
      // });
    }
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /posts/new - display form for creating new posts
router.get('/new', function(req, res) {
  db.author.findAll()
  .then(function(authors) {
    res.render('posts/new', { authors: authors });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /posts/:id - display a specific post and its author
router.get('/:id', function(req, res) {
  db.post.find({
    where: { id: req.params.id },
    include: [db.author, db.comment, db.tag]
  })
  .then(function(post) {
    if (!post) throw Error();
    res.render('posts/show', { post: post });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

router.post('/:id/comments', function(req, res) {
  db.comment.create({
    name: req.body.name || 'Anonymous',
    content: req.body.content,
    postId: req.params.id
  }).then(function(comment) {
    res.redirect('/posts/' + req.params.id);
  });
});

module.exports = router;