import routes from './routes'

const endpoints = [
  require('./status').default,
  Meteor.isDevelopment && require('./examples').default,
  require('./routes').default,
]

export default function ({ router }) {
  _.map(endpoints, registerEndpoint({ router }))
}

function registerEndpoint({ router }) {
  return function (endpoint) {
    endpoint({ router })
  }
}
