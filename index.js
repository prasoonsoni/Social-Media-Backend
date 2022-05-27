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
app.use('/auth/register', require('./routes/authentication/register'))
app.use('/auth/login', require('./routes/authentication/login'))
app.use('/auth/getuser', require('./routes/authentication/getuser'))

// endpoints for updating
app.use('/update/password', require('./routes/update/updatepassword'))
app.use('/update/username', require('./routes/update/updateusername'))
app.use('/update/profile', require('./routes/update/updateprofile'))

// endpoints for posts
app.use('/post/create', require('./routes/posts/createpost'))
app.use('/post/update', require('./routes/posts/updatepost'))
app.use('/post/addlike', require('./routes/posts/addlike'))
app.use('/post/deletelike', require('./routes/posts/deletelike'))
app.use('/post/adddislike', require('./routes/posts/adddislike'))


app.listen(port, () => {
    console.log(`Social Media Backend listening on http://localhost:${port}`)
})