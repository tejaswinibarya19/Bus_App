var express = require('express');
var router = express.Router();
var bus = require('../models/Buses');


// router.get('/', (req, res) => {
//     bus.find({ companyName, startCity, totalseats, availableseats }, (err, result) => {
//         if (err) res.send(err)
//         else res.json({ result })
//     })
// })

router.post("/", async (req, res) => {
    try {
        const { startCity, destination } = req.query; // Use query params instead of req.body
        console.log(req.query)

        if (!startCity || !destination) {
            return res.status(400).json({ status: false, message: "startCity and destination are required" });
        }

        const buses = await bus.find({ startCity, destination });
            console.log(buses);
        if (buses.length === 0) {
            return res.status(404).json({ status: false, message: "No buses found for this route" });
        }

        res.json({ status: true, buses });
    } catch (error) {
        console.error("Error fetching buses:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});


router.post('/', (req, res) => {

    bus.findOne({ _id: req.body.bId }, (err, bus) => {
        if (err) {
            res.json({ status: false, message: "error while searching with ID" })
        }
        else
            res.json({ bus })
    })
})
















module.exports = router;
