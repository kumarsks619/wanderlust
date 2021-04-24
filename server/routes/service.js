const express = require('express')

const {
    addService,
    getServices,
    deleteService,
    getService,
    getTrending
} = require("../controllers/service")

const router = express.Router()

router.post('/add', addService)
router.get('/get-services', getServices)
router.delete('/delete-service/:serviceID', deleteService)
router.get('/get-service/:serviceID', getService)
router.get('/get-trending', getTrending)


module.exports = router
