const validateRegisterInputs = (
    firstName,
    lastName,
    email,
    password,
    confirmPassword
) => {
    const errors = {}

    const nameRegEx = /^([a-zA-Z\s]+)$/

    if (firstName) {
        if (firstName.trim() === '') errors.firstName = 'First name must not be empty!!!'
        else if (firstName.trim().length > 30)
            errors.firstName = 'First name exceeded the maximum characters limit!!!'
        else if (!firstName.match(nameRegEx))
            errors.firstName = "First name can't have numbers or special characters!!!"
    } else errors.firstName = 'First name is a required field!!!'

    if (lastName) {
        if (lastName.trim().length > 30)
            errors.lastName = 'Last name exceeded the maximum characters limit!!!'
        else if (!lastName.match(nameRegEx))
            errors.lastName = "Last name can't have numbers or special characters!!!"
    }

    if (email) {
        if (email.trim() === '') errors.email = 'Email address must not be empty!!!'
        else if (email.trim().length > 64) errors.email = 'Email address too long!!!'
        else {
            const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
            if (!email.match(regEx)) errors.email = 'Invalid email address!!!'
        }
    } else errors.email = 'Email address is a required field!!!'

    if (password && confirmPassword) {
        if (password.trim() === '') errors.password = 'Password must not be empty!!!'
        else if (password.trim() !== confirmPassword.trim())
            errors.password = 'Passwords must match!!!'
    } else errors.password = 'Both password fields are required!!!'

    return {
        valid: Object.keys(errors).length > 0 ? false : true,
        errors,
    }
}

const validateLoginInputs = (email, password) => {
    const errors = {}

    if (email) {
        if (email.trim() === '') errors.email = 'Email address must not be empty!!!'
        else if (email.trim().length > 64) errors.email = 'Email address too long!!!'
        else {
            const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
            if (!email.match(regEx)) errors.email = 'Invalid email address!!!'
        }
    } else errors.email = 'Email address is a required field!!!'

    if (password) {
        if (password.trim() === '') errors.password = 'Password must not be empty!!!'
    } else errors.password = 'Password is a required field!!!'

    return {
        valid: Object.keys(errors).length > 0 ? false : true,
        errors,
    }
}

const validateBookingInputs = (name, email, contact, persons) => {
    const errors = {}

    const nameRegEx = /^([a-zA-Z\s]+)$/

    if (name) {
        if (name.trim() === '') errors.name = 'Name must not be empty!!!'
        else if (name.trim().length > 30)
            errors.name = 'Name exceeded the maximum characters limit!!!'
        else if (!name.match(nameRegEx))
            errors.name = "Name name can't have numbers or special characters!!!"
    } else errors.name = 'Name is a required field!!!'

    if (email) {
        if (email.trim() === '') errors.email = 'Email address must not be empty!!!'
        else if (email.trim().length > 64) errors.email = 'Email address too long!!!'
        else {
            const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
            if (!email.match(regEx)) errors.email = 'Invalid email address!!!'
        }
    } else errors.email = 'Email address is a required field!!!'

    if (contact) {
        if (contact.trim() === '') errors.contact = 'Contact number must not be empty!!!'
        else {
            const regEx = /^[6-9]\d{9}$/
            if (!contact.match(regEx)) errors.contact = 'Invalid Contact Number!!!'
        }
    } else errors.contact = 'Contact number is a required field!!!'

    if (persons) {
        if (persons == 0)
            errors.persons = 'There must be at least one person to do the Booking!!!'
        if (persons < 0) errors.persons = "Number of Persons can't have NEGATIVE value!!!"
        if (persons > 10)
            errors.persons = 'Maximum 10 seats can be booked by one account!!!'
    } else errors.persons = 'Number of Persons is a required field!!!'

    return {
        valid: Object.keys(errors).length > 0 ? false : true,
        errors,
    }
}

const validateEnquiryInputs = (name, email, message) => {
    const errors = {}

    if (name) {
        if (name.trim() === '') errors.name = 'First name must not be empty!!!'
        else if (name.trim().length > 30)
            errors.name = 'First name exceeded the maximum characters limit!!!'
    } else errors.name = 'First name is a required field!!!'

    if (email) {
        if (email.trim() === '') errors.email = 'Email address must not be empty!!!'
        else if (email.trim().length > 64) errors.email = 'Email address too long!!!'
        else {
            const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
            if (!email.match(regEx)) errors.email = 'Invalid email address!!!'
        }
    } else errors.email = 'Email address is a required field!!!'

    if (message) {
        if (message.trim() === '') errors.message = 'Message must not be empty!!!'
        else if (message.trim().length < 10) errors.message = 'Message too short!!!'
        else if (message.trim().length > 100) errors.message = 'Message too long!!!'
    } else errors.message = 'Message is a required field!!!'

    return {
        valid: Object.keys(errors).length > 0 ? false : true,
        errors,
    }
}

const validateCustomInputs = (customDetails) => {
    const errors = {}

    const { duration, spotTransport, stay, food } = customDetails

    if (duration.start && duration.end) {
        if (duration.start > duration.end) {
            errors.duration = "Start Date can't be ahead of End Date!!!"
        }
    } else {
        errors.duration = 'Start and End dates are required!!!'
    }

    if (spotTransport && Object.keys(spotTransport).length > 0) {
        if (spotTransport.mode === '')
            errors.spotTransport =
                'Mode of Transport at Vacation Spot must not be empty!!!'
    } else
        errors.spotTransport = 'Mode of Transport at Vacation Spot is a required field!!!'

    if (stay && Object.keys(stay).length > 0) {
        if (stay.preference === '') errors.stay = 'Stay Preference must not be empty!!!'
    } else errors.stay = 'Stay Preference is a required field!!!'

    if (food && Object.keys(food).length > 0) {
        if (food.preference === '') errors.food = 'Food Preference must not be empty!!!'
    } else errors.food = 'Food Preference is a required field!!!'

    return {
        valid: Object.keys(errors).length > 0 ? false : true,
        errors,
    }
}

module.exports = {
    validateRegisterInputs,
    validateLoginInputs,
    validateBookingInputs,
    validateEnquiryInputs,
    validateCustomInputs,
}
