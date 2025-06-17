const express = require('express');
const cors = require('cors');
const pool = require("./db");

const app = express();
// To remove  res.setHeader('X-Powered-By', 'Express'); error :
app.disable('x-powered-by');

//midlleware 
app.use(cors());
app.use(express.json()); 

app.listen(5000);  
// Another way to write the above line :
// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
//   });