import mongoose from "mongoose";

const { Schema } = mongoose;
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

const submit = mongoose.model('submit', submitSchema);

module.exports = submit;