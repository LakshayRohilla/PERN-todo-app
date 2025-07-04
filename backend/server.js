const express = require('express');
const cors = require('cors');
const sequelize = require('./sequelizeConfig');

const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express();
// To remove  res.setHeader('X-Powered-By', 'Express'); error :
app.disable('x-powered-by');

//midlleware 
app.use(cors());
// Body-parser replacement
app.use(express.json()); 

// Test database connection
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


app.listen(process.env.PORT || 5000);
// Another way to write the above line :
// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
//   });