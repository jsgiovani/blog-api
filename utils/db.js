import mongoose from "mongoose";


const dbConnect = async() =>{
    
    try {
        let mongodbCredentials = 'mongodb+srv://jsgiovani:jsgiovani@jsgiovani.4xm83u0.mongodb.net/';
        const connection = await mongoose.connect(mongodbCredentials);
        const url =  `${connection.connection.host}:${connection.connection.host}`;
        console.log(`Mongo DB connected to: ${url}`); 

    } catch (error) {
        console.log('error connecting to mongo db',error);
        process.exit(1);
    }
}

export default dbConnect