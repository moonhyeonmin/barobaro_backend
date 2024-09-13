import Mongoose from "mongoose";

const { Schema } = Mongoose;
const submitSchema = ({
    userInfo : {
        type : Map,
        required : true
    },
    // details : {
    //     type : 
    //     required : true
    // }
});

const submit = Mongoose.model('submit', submitSchema);

export { submitSchema, submit };