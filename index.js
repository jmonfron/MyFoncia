import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import middleware from './utils/middleware'

const app = express()

const dbUrl = process.env.DATABASE_URL
// // const url = 'mongodb://localhost:27017/myFonciaBdd';
// const url = `mongodb://database:27017/myFonciaBdd`;

console.log(dbUrl)
import routes from './routes'
mongoose.connect(dbUrl)

app.use(middleware)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)


app.listen(3000, () => {
  console.log('Serveur running on port 3000')
})

module.exports = app
