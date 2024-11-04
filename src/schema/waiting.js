import Mongoose from "mongoose";

const { Schema } = Mongoose;
const waitingSchema = ({
    cnt : {
        type: Number,
        required: true
    },
    board_id : {
        type : Number,
        required : true
    }
});

const waiting = Mongoose.model('waiting', waitingSchema);

export {waitingSchema, waiting};