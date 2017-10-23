const routes = [
  require('./status').default,
  Meteor.isDevelopment && require('./examples').default,
  require('./routes').default,
]

export default function ({ router }) {
  _.map(routes, registerRoutes({ router }))
}

function registerRoutes({ router }) {
  return function (route) {
    route({ router })
  }
}
