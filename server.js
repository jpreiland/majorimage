const { PORT } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const dataRoutes = require('./routes/api/data')
const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use('/api', dataRoutes)

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))