import mongoose from 'mongoose';

// console.log(process.env.MONGODB_URL)

const connectDB = async ()=>{
    try {
      const connectionInstance = await mongoose.connect(
        `${process.env.MONGODB_URL}/shortUrl`
      );
      
      console.info(`MongoDb Connected ${connectionInstance.connection.host}`)
      //console.log(connectionInstance)
    } catch (error) {
        console.error(`MongoDb not connected ${error}`);
        process.exit(1)
    }

}

export default connectDB;