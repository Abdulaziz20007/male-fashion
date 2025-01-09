const { errorHandler } = require("../helpers/error_handler")

const createOrder = async (req, res) => {
    try {
        const {} = req.body
        res.send(req.body)
    } catch (error) {
        errorHandler(error, res)
    }
}


module.exports = {
    createOrder
}