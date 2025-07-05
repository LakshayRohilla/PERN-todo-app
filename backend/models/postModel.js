const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConfig');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Ensures the field is not empty
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', // References the User model
      key: 'id',
    },
  },
}, {
  timestamps: true, // Enable automatic createdAt and updatedAt fields
});

module.exports = Post;