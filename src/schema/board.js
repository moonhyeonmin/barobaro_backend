import mongoose from "mongoose";

const { Schema } = mongoose;
const boardSchema = new Schema({
    type: {
        type: Number,
        required: true
    },
    title: {
        type : String,
        required: true
    },
    content : {
        type : String,
        required: true
    },
    image : {
        type : Buffer,
        required : false
    },
    major : {
        type : String,
        required: true
    },
    board_id : {
        type : Number,
        required : true
    }
});

const board = mongoose.model('board', boardSchema);

export {boardSchema, board};