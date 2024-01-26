import express from 'express';
import dbConnect from './utils/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/AuthRoutes.js';



//inicialize server
const app = express();

//require .env enviroment
dotenv.config();


//require .json middleware to read data
app.use(express.json())

//conect to mongoDB
dbConnect();



//allow Cros-Origin Request
//allow CORS Origins
const whiteList = [process.env.FRONT_END_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(!origin){//for bypassing postman req with  no origin
            return callback(null, true);
        }

        if (whiteList.includes(origin)) {
            callback(null, true);
        }else{
            callback(new Error('Cors Error'));
        }
    },
    credentials:true,
}


app.use(cors(corsOptions));
app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
}))




//routes
app.use('/api/auth', authRoutes);


//middleware error
app.use((err, req, res, next) =>{
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        "success":false,
        statusCode,
        message
    });
});




//conect to port 
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
});

