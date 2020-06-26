'use strict';
module.exports = (sequelize, DataTypes) => {
  const articlesTags = sequelize.define('articlesTags', {
    articleId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  articlesTags.associate = function(models) {
    // associations can be defined here
  };
  return articlesTags;
};