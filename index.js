const express = require("express")
const cors = require("cors")
const app = express()
const apiRouter = require('./routes/api/router')

// Middleware
app.use(express.json())
app.use(cors())

/// Api Router
app.use('/api', apiRouter);

app.listen(4000, () => console.log("port 4000"))
