const getData = (req, res) => {
    try {
        return res.status(200).send("ok")
    } catch (error) {
        return res.status(400).send("nmo'lyapti bormi o'g'riq?")
    }
}