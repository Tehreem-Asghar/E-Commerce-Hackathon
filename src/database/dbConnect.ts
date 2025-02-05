const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    // Check if the connection is already established
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.mongodbConnectionString);
      console.log("Mongodb Connected");
    }
  } catch (error) {
    console.error("Mongodb Connection Failed:", error);
  }
};

export default dbConnect;





// const mongoose = require("mongoose");

// const dbConnect = async () => {


//   try {
    

//   // Check if the connection is already established
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(process.env.mongodbConnetionString, {
//          // Optional: Remove these options if using the latest mongoose version
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });

//       console.log("Mongodb Connected");
//     }
//   } catch (error) {
//     console.error("Mongodb Connection Failed:", error);
//   }
// };

// export default dbConnect






















//    mongoose.connect(process.env.MONGODB_UR,{
//     tls : true
//    })
//     .then(()=> console.log("Database successfully!"))
//     .catch((err : any)=> console.log("hey there is some error", err))
