const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const dataRoutes = require('./routes/api/data')
const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to mongo database'))
  .catch((err) => console.log(err))

app.use('/api/data', dataRoutes)
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))