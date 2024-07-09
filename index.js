const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
// to use content in env file
require('dotenv').config()


var morgan = require('morgan')
var path = require('path')
var rfs = require('rotating-file-stream')
//intialiazing app of express
const app = express();

app.use(bodyParser.json())

var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
  });
   
  // setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

// connect to database
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true})

const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connection successful!'));




//connecting the routes
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
app.use('/api/v1/user/', userRouter);
app.use('/product/',productRouter);
 
app.listen(process.env.PORT || 3000, ()=> console.log(`Server is running on port ${process.env.PORT || 3000}`))