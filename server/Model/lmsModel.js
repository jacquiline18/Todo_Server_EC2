import mongose from  'mongoose';
const lmsSchema = mongose.Schema({
    name: {
        type:String, require:true},
        email:{type:String, require:true},
        password:{type:String, require:true},
            role: { type: String, default:"public" }
})
const lmsCollection=mongoose.model("users", lmsSchema); 
export default lmsCollection;