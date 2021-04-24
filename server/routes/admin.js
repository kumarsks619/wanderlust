const express = require('express')

const {
    registerAdmin,
    loginAdmin,
    getBookings,
    getEnquiries,
    deleteEnquiry,
    addCarousel,
    getCarousel,
    deleteCarousel,
    addAdvtBanner,
    deleteAdvtBanner,
    getAdvtBanner,
} = require('../controllers/admin')
const {
    addDestination,
    getDestinations,
    setPrices,
    getPrices,
    getAllCustom,
} = require('../controllers/createOwn')

const router = express.Router()

// router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.get('/get-bookings', getBookings)
router.get('/get-enquiries', getEnquiries)
router.delete('/delete-enquiry/:enquiryID', deleteEnquiry)
router.post('/add-carousel', addCarousel)
router.get('/get-carousel', getCarousel)
router.delete('/delete-carousel/:carouselID', deleteCarousel)
router.route('/advt').post(addAdvtBanner)
router.route('/advt').get(getAdvtBanner)
router.route('/advt/:advtID').delete(deleteAdvtBanner)
router.route('/create-own').post(addDestination).get(getDestinations)
router.route('/create-own/price').post(setPrices).get(getPrices)
router.route('/create-own/custom').get(getAllCustom)

module.exports = router
