const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const { Sequelize, Op } = require('sequelize'); // Import Sequelize and Op
const sequelize = require('../sequelizeConfig'); // Import the sequelize instance

const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, status, password, username, role, permissionAllocated } = req.body;

    if (!["active", "inactive"].includes(status)) {
      throw new Error('Status can only be active or inactive');
    }

    if (!["admin", "operator", "supervisor"].includes(role)) {
      throw new Error('Role can only be admin, operator, or supervisor');
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: email },
          { username: username },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new Error('Email already exists');
      }
      if (existingUser.username === username) {
        throw new Error('Username already exists');
      }
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      status,
      password: hashedPassword,
      username,
      role,
      permissionAllocated,
    });

    // Respond with the created user (excluding the password)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        status: user.status,
        username: user.username,
        role: user.role,
        permissionAllocated: user.permissionAllocated,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      error: 'An error occurred while creating the user', 
      message: err.message // Include the error message in the response
    });
  }
};

const getUserByID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the user data (excluding the password)
    res.status(200).json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        status: user.status,
        username: user.username,
        role: user.role,
        permissionAllocated: user.permissionAllocated,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while retrieving the user' });
  }
};

const getAllUsers = async (req, res, next) => {
    try {
      // Retrieve all users from the database
      const users = await User.findAll();
  
      // Respond with the list of users (excluding passwords)
      res.status(200).json({
        users: users.map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          status: user.status,
          username: user.username,
          role: user.role,
          permissionAllocated: user.permissionAllocated,
        })),
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while retrieving users' });
    }
  };

module.exports = {
  createUser,
  getUserByID,
  getAllUsers
};