import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import registerRoutes from '/imports/api'

import { requestLogin } from '/imports/middleware'

const Express = function() {
  const _express = express()
  WebApp.rawConnectHandlers.use(Meteor.bindEnvironment(_express))
  return _express
}

const app = Express()
const router = express.Router()

const PORT = process.env.POST || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// uncomment to request login
// router.use(requestLogin)

registerRoutes({ router })

app.use('/api', Meteor.bindEnvironment(router))

app.listen(PORT, function () {
  console.log(`service is running at ${PORT}`)
})
