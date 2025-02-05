
import mongoose ,{Schema} from "mongoose";

const userSchema = new Schema({
    // name: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    // role: { type: String, default: "user" },
    name : { 
        type : Schema.Types.String,
        required : [true , "Name field is  required"]
    },
    email : { 
        type : Schema.Types.String,
        required : [true , " Email is  required"],
        unique : true,
        trim : true
    },
    password : { 
        type : Schema.Types.String,
        required : [true , "Password field is  required"]
    },
    role: {
        type: String,
        enum:["admin","user"],
        required: [true , "Role is required"],
      },
     
})


export const user  = mongoose.models.User ||  mongoose.model("User" , userSchema)