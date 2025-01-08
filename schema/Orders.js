const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref : "Users",
        required: true
    },
    total_amount: {
        type: Number,
        required : true
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'cancelled'],
        default: 'pending'
    },
    shopping_address:{
        type : String,
        required : true,
        trim : true
    }
});

module.exports = model("Orders", orderSchema)