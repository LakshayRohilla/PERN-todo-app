const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConfig');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Ensures the field is not empty
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validates the format of the email
    },
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'), // Example statuses
    allowNull: false, // Explicitly prevent null values
    defaultValue: 'active', // Default status
    validate: {
      notEmpty: true, // Ensure the field is not empty
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100], // Ensures password length is between 8 and 100 characters
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  role: {
    type: DataTypes.ENUM('admin', 'operator', 'supervisor'), // Example roles
    allowNull: false, // Prevent null values
    validate: {
      notEmpty: true, // Ensure the field is not empty
    },
  },
  permissionAllocated: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Array of strings for permissions
    allowNull: false, // Prevent null values
    validate: {
      isArrayNotEmpty(value) {
        if (!Array.isArray(value) || value.length === 0) {
          throw new Error('User Permission allocated array must contain at least one permission.');
        }
      },
    },
  },
}, {
  timestamps: true, // Enable automatic createdAt and updatedAt fields
});

module.exports = User;