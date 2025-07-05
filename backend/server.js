const express = require('express');
const cors = require('cors');
const sequelize = require('./sequelizeConfig');
const { User, Post } = require('./models/models');

const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
// To remove  res.setHeader('X-Powered-By', 'Express'); error :
app.disable('x-powered-by');

//midlleware 
app.use(cors());
// Body-parser replacement
app.use(express.json()); 

// // Test database connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connection established successfully.');
//     return sequelize.sync({ force: false }); // Use { force: true } cautiously; it drops tables if they exist
//   })
//   .then(() => {
//     console.log('Database synchronized.');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });

// // Synchronize models with the database
// sequelize.sync({ force: false }) // Use { force: true } cautiously; it drops tables if they exist
//   .then(() => {
//     console.log('Database & tables created!');
//   })
//   .catch((error) => {
//     console.error('Error creating database:', error);
//   });

// Test database connection and synchronize models
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    return sequelize.sync({ force: false }); // Use { force: true } cautiously; it drops tables if they exist
  })
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Routers :
app.use('/api/todo', todoRoutes); 
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.listen(process.env.PORT || 5000);
// Another way to write the above line :
// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
//   });