import express from 'express'
import rout from './rout'

const app = express()

app.set('view engine', 'ejs')

app.use(rout)

app.listen(3032, () => console.log('server running in HTTP://localhost:3032'))