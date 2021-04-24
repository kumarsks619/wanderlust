import axios from 'axios'

import { SERVER_ADMIN_URL } from '../constants/urls'

export const getServices = () => axios.get(`${SERVER_ADMIN_URL}/service/get-services`)
export const getService = (serviceID) =>
    axios.get(`${SERVER_ADMIN_URL}/service/get-service/${serviceID}`)

export const adminLogin = (adminDetails) =>
    axios.post(`${SERVER_ADMIN_URL}/login`, adminDetails)

export const addService = (serviceDetails, adminToken) =>
    axios.post(`${SERVER_ADMIN_URL}/service/add`, serviceDetails, {
        headers: {
            authorization: `admin ${adminToken}`,
        },
    })

export const deleteService = (adminToken, serviceID) =>
    axios.delete(`${SERVER_ADMIN_URL}/service/delete-service/${serviceID}`, {
        headers: {
            authorization: `admin ${adminToken}`,
        },
    })

export const getBookings = (adminToken) =>
    axios.get(`${SERVER_ADMIN_URL}/get-bookings`, {
        headers: {
            authorization: `admin ${adminToken}`,
        },
    })

export const getEnquiries = (adminToken) =>
    axios.get(`${SERVER_ADMIN_URL}/get-enquiries`, {
        headers: {
            authorization: `admin ${adminToken}`,
        },
    })

export const deleteEnquiry = (adminToken, enquiryID) =>
    axios.delete(`${SERVER_ADMIN_URL}/delete-enquiry/${enquiryID}`, {
        headers: {
            authorization: `admin ${adminToken}`,
        },
    })

export const getTrending = () => axios.get(`${SERVER_ADMIN_URL}/service/get-trending`)

export const addCarousel = (carouselDetails, adminToken) =>
    axios.post(`${SERVER_ADMIN_URL}/add-carousel`, carouselDetails, {
        headers: {
            authorization: `admin ${adminToken}`,
        },
    })

export const getCarousel = () => axios.get(`${SERVER_ADMIN_URL}/get-carousel`)

export const deleteCarousel = (adminToken, carouselID) =>
    axios.delete(`${SERVER_ADMIN_URL}/delete-carousel/${carouselID}`, {
        headers: {
            authorization: `admin ${adminToken}`,
        },
    })

export const addAdvtBanner = (advtData, adminToken) =>
    axios.post(`${SERVER_ADMIN_URL}/advt`, advtData, {
        headers: {
            authorization: `admin ${adminToken}`,
        },
    })

export const getAdvtBanner = () => axios.get(`${SERVER_ADMIN_URL}/advt`)

export const deleteAdvtBanner = (adminToken, advtID) =>
    axios.delete(`${SERVER_ADMIN_URL}/advt/${advtID}`, {
        headers: {
            authorization: `admin ${adminToken}`,
        },
    })

export const addDestination = (destinationDetails, adminToken) =>
    axios.post(`${SERVER_ADMIN_URL}/create-own`, destinationDetails, {
        headers: {
            authorization: `admin ${adminToken}`,
        },
    })

export const getDestinations = () => axios.get(`${SERVER_ADMIN_URL}/create-own`)

export const getPrices = () => axios.get(`${SERVER_ADMIN_URL}/create-own/price`)

export const updatePrices = (prices, adminToken) =>
    axios.post(`${SERVER_ADMIN_URL}/create-own/price`, prices, {
        headers: {
            authorization: `admin ${adminToken}`,
        },
    })

export const getCustoms = (adminToken) =>
    axios.get(`${SERVER_ADMIN_URL}/create-own/custom`, {
        headers: {
            authorization: `admin ${adminToken}`,
        },
    })
