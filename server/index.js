const express = require('express')
const cors = require('cors')
const { connect } = require('mongoose')
require('dotenv').config()
const upload = require("express-fileupload")

const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")
const commentRoutes = require("./routes/commentRoutes")
const favouriteRoutes = require("./routes/favouriteRoutes")
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const app = express()
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
// const corsOptions = { credentials: true, origin: "http://localhost:3000", optionsSuccessStatus: 200, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', }
app.use(cors({credentials: true, origin:"http://localhost:3000"}))
app.use(upload())

app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/favourites', favouriteRoutes)

app.use(notFound)
app.use(errorHandler)


connect(process.env.MONGO_URI)
    .then(
        app.listen(process.env.PORT || 5000, () => console.log(`Server started on port ${process.env.PORT}`))
    ).catch(error => { console.log(error) })


// mongodb+srv://<username>:<password>@cluster0.pzx62ws.mongodb.net/

// mongodb+srv://meettank:Me2002ett@nk@cluster0.pzx62ws.mongodb.net/?retryWrites=true&w=majority&appName=cluster0
// 152.59.3.169/32