import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortID:{
        type : String,
        required : true,
        unique : true
    },
    redirectURL:{
        type : String,
        required : true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    visitHistory: [{timestamp: {type: Number}}]
}, {timestamps: true});

const URL = mongoose.model("url", urlSchema);
export default URL