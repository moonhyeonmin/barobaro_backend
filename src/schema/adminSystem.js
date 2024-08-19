import mongoose, { mongo } from "mongoose";
import userInfo from "./src/schema/userInfo.js"

const { Schemna } = mongoose;
const adminSchema = new Schemna({
    majorid : {
        type: Number,
        required: true
    },
    majorname : {
        type : String,
        required : true
    },
    userInfo : {
        type : userInfo, // 이 부분 맞는지 모르겠음
        required: true
    }
})

const admin = mongoose.model('admin', adminSchema);

module.exports = admin;
