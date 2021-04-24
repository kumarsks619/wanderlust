require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')
const serviceRoutes = require('./routes/service')
const passwordResetRoutes = require('./routes/passwordReset')

const app = express()

app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/admin', adminRoutes)
app.use('/admin/service', serviceRoutes)
app.use('/user', userRoutes)
app.use('/password-reset', passwordResetRoutes)

app.get('/', (req, res) => {
    res.send('<h1>WanderLust backend is up and running!</h1>')
})

const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected!')
        return app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
    })
    .catch((err) => console.error(err.message))
