import mongoose from "mongoose"

async function connectToMongoDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://shirishti2002:NCyphd1jSRvPiLej@cluster0.btqjbkd.mongodb.net/?retryWrites=true&w=majority",
      {}
    );
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectToMongoDB;
