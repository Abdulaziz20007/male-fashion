const { errorHandler } = require("../helpers/error_handler")
const Orders = require("../schema/Orders")
const ordersValidation = require("../validations/orders.validation")

const createOrder = async (req, res) => {
    try {

        const {error, value} = ordersValidation(req.body)
        if(error){
            errorHandler(error, res)
        }
        
        const newOrder = await Orders.create(value)
        
        res.status(201).send(newOrder)

    } catch (error) {
        errorHandler(error, res)
    }
}

const getOrders = async (req, res) => {
    try {
        
        const orders = await Orders.find().populate("user_id", ["name","surname"])

        if(orders[0]){
            return res.status(400).send({msg: "order not found"})
        }
        
        
        res.status(200).send(orders)
        
    } catch (error) {
        errorHandler(error, res)
    }
}


const getOrderById = async (req, res) => {
    try {

        const {id} = req.params

        const orders = await Orders.find().populate("user_id", ["name","surname","phone", "email","is_active", "refresh_token"])

        if(orders[0]){
            return res.status(400).send({msg: "order not found"})
        }
        
        res.status(200).send(orders)
        
    } catch (error) {
        errorHandler(error, res)
    }
}



const updateOrder = async (req, res) => {
    try {
        
        const {id} = req.params

        const {error, value} = ordersValidation(req.body)
        if(error){
            errorHandler(error, res)
        }

        const updatedOrder = await Orders.findOneAndUpdate({_id:id}, {...value}, {new:true})

        if(updatedOrder[0]){
            return res.status(400).send({msg: "order not found"})
        }

        res.status(200).send(updatedOrder)

    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteOrder = async (req, res) => {
    try {
        
        const {id} = req.params


        const deleteOrder = await Orders.findOneAndDelete({_id:id},{new:true})

        if(deleteOrder){
            return res.status(400).send({msg: "order not found"})
        }

        res.status(200).send(deleteOrder)

    } catch (error) {
        errorHandler(error, res)
    }
}


module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
}