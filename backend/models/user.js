import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const {Schema} = mongoose;

const userSchema = new Schema ({
    username:{ type: String, required:true, unique: true },
    password:{ type: String, required: true },
    firstName:String,
    lastName:String,
    emailAddress:{ type: String, required: true, unique:true },
    isAdmin: { type: Boolean, required: true },
    albums: [{

    type:mongoose.Types.ObjectId,required:true, ref:"Album"
     }]
}, {timestamps:true})




userSchema.pre("save", async function(next){
if(!this.firstName){
    this.firstName="John";
}

if(!this.lastName){
    this.lastName="Doe"
} 

const securePassword = await bcrypt.hash(this.password, 12);
this.password = securePassword;

next()
})
const User = mongoose.model("User", userSchema)
export default User;