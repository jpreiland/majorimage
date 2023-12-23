import { PORT } from './config.js'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import dataRoutes from './routes/api/data.js'
const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use('/api', dataRoutes)

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))