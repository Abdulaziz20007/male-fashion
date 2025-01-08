const { Schema, model } = require("mongoose");

const orderItemsSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref : "Orders",
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref : "Product",
        required: true
    },
    product_id: {
        type: Number,
        required: true
    },
    unit_price: {
        type: Number,
        required: true
    }
    
});

module.exports = model("OrderItems", orderItemsSchema)
