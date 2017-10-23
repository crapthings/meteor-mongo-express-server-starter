import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import LoadAPI from '/imports/api'

const Express = function() {
  const fn = express()
  WebApp.rawConnectHandlers.use(Meteor.bindEnvironment(fn))
  return fn
}

const app = Express()
const router = express.Router()

const PORT = process.env.POST || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

LoadAPI({ router })

app.use('/api', Meteor.bindEnvironment(router))

app.listen(PORT, function () {
  console.log(`service is running at ${PORT}`)
})
