import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        const connection = await connect(`${process.env.MONGO_URI}`);
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log('Error: ', error.message);
        throw new Error('Error connecting to the database');
    }
}

export default connectDB;