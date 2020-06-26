'use strict'
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {})
  article.associate = function(models) {
    // associations can be defined here
    models.article.belongsTo(models.author)
    models.article.hasMany(models.comment)
    models.article.belongsToMany(models.tag, {through: 'articlesTags'})
  }
  return article
}
// author.prototype.getFullName = function () {
//   return this.firstName + " " + this.lastName
// }
// return author 
