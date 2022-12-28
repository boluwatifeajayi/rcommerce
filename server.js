//hi there

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const connectDB = require('./config/db');
const config = require('./config/database');
const path = require('path');

const settings = 'production'

require('dotenv').config();

connectDB();

const port = process.env.PORT || 8080;
//import routes

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

//app
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

// serve frontend


// Serve static assets in production
if (settings === 'production') {
  // Set static folder
 
  app.use(express.static(path.join(__dirname, './frontend/build')))



  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

