import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const URI_DB = process.env.URI_DB;

const connect = async() =>{
    try {
        await mongoose.connect(URI_DB);
        console.log('MongoDB connect successfully');

    } catch (error) {
        console.log('MongoDB connect error', error);
    }
};

export {connect};
