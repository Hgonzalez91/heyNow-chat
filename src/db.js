import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://heynow01:HeyNowChat@heynow.r5btf.mongodb.net/?retryWrites=true&w=majority&appName=HeyNow');
    console.log('DB is connected')
  } catch (error) {
    console.log(error);
  }
};
