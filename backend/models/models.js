const User = require('./userModel');
const Post = require('./postModel');

// Establish relationships
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

// Export models
module.exports = { User, Post };