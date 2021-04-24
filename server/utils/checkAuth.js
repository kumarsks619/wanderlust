require('dotenv').config({ path: '../.env' })
const jwt = require('jsonwebtoken')



const validateAdminRequest = (req) => {
    const authHeader = req.headers.authorization

    let error = ""

    if (authHeader) {
        const adminToken = authHeader.split("admin ")[1]
    
        if (adminToken) {
            try {
                jwt.verify(adminToken, process.env.ADMIN_TOKEN_KEY)
                return ""
            } catch (err) {
                error = "Invalid/Expired Token!!! Login Again."
            }
        }
    } else
        error = "Authorization headers must be provided!!!"

    return error
}


const validateUserRequest = (req) => {
    const authHeader = req.headers.authorization
    
    let error = ""

    if (authHeader) {
        const userToken = authHeader.split("user ")[1]
        
        if (userToken) {
            try {
                jwt.verify(userToken, process.env.USER_TOKEN_KEY)
                return ""
            } catch (err) {
                error = "Invalid/Expired Token!!! Login Again."
            }
        }
    } else
        error = "Authorization headers must be provided!!!"

    return error
} 



module.exports = {
    validateAdminRequest,
    validateUserRequest
}