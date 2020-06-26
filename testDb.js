var db = require('./models')

const errorHandler = error => {
    console.log(`🌙`)
    console.log(error)
}

// CREATE
// db.comment.create({
//     name: 'Paul Allen',
//     content: 'This is really neat! Thanks for posting',
//     articleId: 1
// }).then((comment) => {
//     console.log(comment.get())
// })

// READ
// var db = require('./models')

db.article.findOne({
    where: { id: 1 },
    include: [db.comment]
  }).then(function(article) {
    // by using eager loading, the article model should have a comments key
    console.log(article.comments)
  })

// // READ 
// // to find one of the artists and their article
// db.author.findone({
//     where: {
//         id: 1
//     }
// }).then(foundAuthor => {
//     console.log(`Here's ${foundAuthor.firstName} and their work is ${article.title}`)
// }).catch(errorHandler)