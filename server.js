const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// init app
const app = express();

// setting path for env file 
require('dotenv').config({
    path: './config/index.env'
});

mongoose
    .connect(
        process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        },
    )
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(err))

app.use(cors());
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use(morgan(process.env.MODE))


// routes
app.use('/api/user' , require('./route/auth.route'))
app.use('/api' , require('./route/index.route'))

// Page not Found
app.use((req,res)=>{
    res.status(404).json({msg: "Page not Found"})
});


// starting server at port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=> console.log(`server is running at port ${PORT}`))