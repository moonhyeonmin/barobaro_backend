import Mongoose from "mongoose";
import userInfo from "./src/schema/userInfo.js"

const { Schemna } = Mongoose;
const adminSchema = new Schemna({
    majorid : {
        type : Number,
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
});

const admin = Mongoose.model('admin', adminSchema);

export {adminSchema, admin};
