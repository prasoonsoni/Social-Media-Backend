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
app.use('/update', require('./routes/updateRoutes'))

// endpoints for posts
app.use('/post', require('./routes/postRoutes'))


app.listen(port, () => {
    console.log(`Social Media Backend listening on http://localhost:${port}`)
})