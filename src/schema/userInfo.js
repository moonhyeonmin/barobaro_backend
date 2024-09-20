import mongoose from "mongoose";

const { Schema } = mongoose;
const userInfoSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    id: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    phNumber: {
        type: String,
        required: false
    },
    userType: {
        type: Number,
        required: false
    }
})

const userInfo = mongoose.model('userInfo', userInfoSchema);

export  { userInfoSchema, userInfo};