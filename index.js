import express from 'express';
import dbConnect from './utils/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes.js';



//inicialize server
const app = express();

//require .env enviroment
dotenv.config();


//require .json middleware to read data
app.use(express.json())

//conect to mongoDB
dbConnect();


//routes

app.use('/api/auth', authRoutes);


//middleware error
app.use((err, req, res, next) =>{
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});

//conect to port 
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
});

