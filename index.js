import express from 'express';
import dbConnect from './utils/db.js';



//inicialize server
const app = express();


//conect to mongoDB
dbConnect();

//conect to port 
app.listen(3000, ()=>{
    console.log('Server Running on port 3000');
});

