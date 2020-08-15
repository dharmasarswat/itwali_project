const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const morgan = require('morgan')

// init app
const app = express();

// setting path for env file 
require('dotenv').config({
    path: './config/index.env'
})

app.use(cors());
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use(morgan(process.env.MODE))

// Page not Found
app.use((req,res)=>{
    res.status(404).json({msg: "Page not Found"})
})

// starting server at port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=> console.log(`server is running at port ${PORT}`))