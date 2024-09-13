import Mongoose from "mongoose";

const { Schema } = Mongoose;
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

const count = Mongoose.model('count', countSchema);

export {countSchema, count};