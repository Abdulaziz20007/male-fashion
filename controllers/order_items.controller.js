const { errorHandler } = require("../helpers/error_handler");
const Orders_items = require("../schema/Orders_items");
const ordersItemsValidation = require("../validations/ordersItems.validation")



const createOrderItem = async (req, res) => {
    try {
        const { error, value } = ordersItemsValidation(req.body);
        if (error) { errorHandler(err, res) }

        const newOrderItem = await Orders_items.create(value);

        return res.status(201).send(newOrderItem)

    } catch (error) {
        errorHandler(err, res)
    }
}


const updateOrderItem = async (req, res) => {
    try {

        const { error, value } = ordersItemsValidation(req.body);
        if (error) { errorHandler(err, res) }
        
        const id = req.params.id        
        const updatedOrderItem = await Orders_items.findOneAndUpdate(id,value, {new:true});

        return res.status(200).send(updatedOrderItem)

    } catch (error) {
        errorHandler(err, res)
    }
}

const deleteOrderItem = async (req, res) => {
    try {

        const id = req.params.id        
        const deletedOrderItem = await Orders_items.findByIdAndDelete(id, value, {new:true});

        return res.status(200).send(deletedOrderItem);

    } catch (error) {
        errorHandler(err, res)
    }
}

const getOrderItems = async (req, res) => {
    try {

        const orderItems = await Orders_items.find();

        return res.status(200).send(orderItems);

    } catch (error) {
        errorHandler(err, res)
    }
}

const getOrderItemById = async (req, res) => {
    try {
        
        const orderItem = await Orders_items.findById(req.params.id);

        return res.status(200).send(orderItem);

    } catch (error) {
        errorHandler(err, res)
    }
}


module.exports = {
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
    getOrderItems,
    getOrderItemById
}