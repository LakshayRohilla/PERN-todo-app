const Post = require('../models/postModel');
const User = require('../models/userModel'); // Assuming you might need user data for creating posts

// Function to create a new post
const createPost = async (req, res, next) => {
  try {
    const { title, content, username } = req.body; // Extract username from the request body

    // Validate username and find the user
    const user = await User.findOne({ where: { username } }); // Find user by username
    if (!user) {
      return res.status(404).json({ error: 'Cant create a post as user does not found!!!' });
    }

    // Create a new post
    const post = await Post.create({
      title,
      content,
      userId: user.id, // Use the user's ID to associate the post
      username: user.username, // Store the username in the post
    });

    // Respond with the created post
    res.status(201).json({
      message: 'Post created successfully',
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        userId: user.id, 
        username: user.username, 
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: 'An error occurred while creating the post',
      message: err.message,
    });
  }
};

// Function to get all posts
const getAllPosts = async (req, res, next) => {
  try {
    // Retrieve all posts from the database
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['id', 'username', 'email'] }], // Include user data if needed
    });

    // Respond with the list of posts
    res.status(200).json({
      posts: posts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        userId: post.userId,
        user: post.User, // Assuming you want to include user data
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      })),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: 'An error occurred while retrieving posts',
      message: err.message,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};