const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const connectToDatabase = require('./db/db')
connectToDatabase()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Social Media Backend')
})

// endpoints for authentication
app.use('/auth/register', require('./routes/authentication/register'))


app.listen(port, () => {
    console.log(`Social Media Backend listening on http://localhost:${port}`)
})