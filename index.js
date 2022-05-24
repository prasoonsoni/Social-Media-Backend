const express = require('express')
const app = express()
const port = 3000
const connectToDatabase = require('./db/db')
connectToDatabase()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Social Media Backend listening on http://localhost:${port}`)
})