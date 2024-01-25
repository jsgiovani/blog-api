import express from 'express';
import dbConnect from './utils/db.js';
import dotenv from 'dotenv';



//inicialize server
const app = express();

//require .env enviroment
dotenv.config();

//conect to mongoDB
dbConnect();

//conect to port 
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
});

