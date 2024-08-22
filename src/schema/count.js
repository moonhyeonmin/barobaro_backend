import mongoose from "mongoose";

const { Schema } = mongoose;
const countSchema = ({
    cnt : {
        type: Number,
        required: true
    },
    board_id : {
        type : Number,
        required : true
    }
});

const count = mongoose.model('count', countSchema);

export {countSchema, count};