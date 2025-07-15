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
  userId: { // Foreign key to reference User model's id
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Ensure this matches the actual table name if exists, if not then just provide the model name here like(User)
      key: 'id',
    },
  },
  username: { // Additional field for storing username
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  timestamps: true, // Enable automatic createdAt and updatedAt fields
});

module.exports = Post;