const express = require('express');
const cors = express('cors');

const app = express();

//midlleware 
app.use(cors());
app.use(express.json()); 

app.listen(5000);