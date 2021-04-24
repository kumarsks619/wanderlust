const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const {
    transporter,
    getPasswordResetURL,
    resetPasswordTemplate,
} = require('../utils/passwordResetUtils')

const usePasswordHashToMakeToken = ({
    password: passwordHash,
    _id: userID,
    createdAt,
}) => {
    createdAt = new Date(createdAt).toISOString()
    const secret = passwordHash + '-' + createdAt

    const token = jwt.sign({ userID }, secret, {
        expiresIn: 3600, // 1 hour
    })
    return token
}

const sendPasswordResetEmail = async (req, res) => {
    const { email } = req.params

    try {
        const foundUser = await User.findOne({ email })

        const token = usePasswordHashToMakeToken(foundUser)
        const url = getPasswordResetURL(foundUser, token)
        const emailTemplate = resetPasswordTemplate(foundUser, url)

        const sendEmail = () => {
            transporter.sendMail(emailTemplate, (err, info) => {
                if (err) {
                    res.status(500).json('Error sending email')
                } else {
                    // console.log(`** Email sent **`, info)
                    res.status(200).json('Go and check your mail inbox.')
                }
            })
        }
        sendEmail()
    } catch (err) {
        res.status(404).json('No user with that email')
    }
}

const receiveNewPassword = async (req, res) => {
    const { userID, token } = req.params
    const { password } = req.body

    const foundUser = await User.findOne({ _id: userID })

    if (foundUser) {
        const secret =
            foundUser.password + '-' + new Date(foundUser.createdAt).toISOString()

        try {
            const payload = jwt.verify(token, secret)

            if (String(payload.userID) === String(foundUser._id)) {
                const newPasswordHash = await bcrypt.hash(password, 13)

                foundUser.password = newPasswordHash
                await foundUser.save()

                res.status(200).send('Password reset successful!')
            }
        } catch (err) {
            res.status(404).json('Link tempered/expired !!!')
        }
    } else {
        res.status(404).json('Invalid user')
    }
}

module.exports = {
    sendPasswordResetEmail,
    receiveNewPassword,
}
