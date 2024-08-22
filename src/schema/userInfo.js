import mongoose from "mongoose";

const { Schema } = mongoose;
const userInfoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    phNumber: {
        type: String,
        required: true
    }
})

const userInfo = mongoose.model('userInfo', userInfoSchema);

export  { userInfoSchema, userInfo};