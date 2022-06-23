const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const connectToDatabase = require('./db/db')
connectToDatabase()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<center><h1>Welcome to Social Media Backend</h1>' +
        '<h3><a href="https://github.com/prasoonsoni/Social-Media-Backend" target="_blank">Visit Repository</a></h3></center>')
})

// endpoints for authentication
app.use('/auth', require('./routes/userRoutes'))

// endpoints for updating
app.use('/update/password', require('./routes/update/updatePassword'))
app.use('/update/username', require('./routes/update/updateUsername'))
app.use('/update/profile', require('./routes/update/updateProfile'))

// endpoints for posts
app.use('/post/create', require('./routes/posts/createPost'))
app.use('/post/update', require('./routes/posts/updatePost'))
app.use('/post/addlike', require('./routes/posts/addLike'))
app.use('/post/deletelike', require('./routes/posts/deleteLike'))
app.use('/post/adddislike', require('./routes/posts/addDislike'))
app.use('/post/deletedislike', require('./routes/posts/deleteDislike'))


app.listen(port, () => {
    console.log(`Social Media Backend listening on http://localhost:${port}`)
})