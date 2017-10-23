// common user api

export default function ({ router }) {

  router.post('/login',
    checkLogin,
    requestLoginToken,
  )

  router.post('/register',
    checkRegister,
    registerUser,
  )

}

function checkLogin(req, res, next) {
  const { user, password } = req.body
  if (! user)
    return res.status(500).send('missing "user" field.')

  if (! password)
    return res.status(500).send('missing "password" field.')

  next()
}

function requestLoginToken(req, res) {
  const { user, password } = req.body

  const selector = { $or: [
    { username: user },
    { 'emails.address': user },
  ] }

  const _user = Meteor.users.findOne(selector)

  if (! _user)
    return res.status(500).send('user not found.')

  const { userId } = Accounts._checkPassword(_user, password)

  if (! userId)
  return res.status(500).send('login failed.')

  const token = Accounts._generateStampedLoginToken()
  const data = { ...token,  userId, user: _.omit(_user, 'services') }

  Accounts._insertLoginToken(userId, token)

  res.json({ data })
}

function checkRegister(req, res, next) {
  const { user, username, email, password } = req.body

  if (! username && ! email)
    return res.status(500).send('missing username or email field.')

  if (! password)
    return res.status(500).send('missing password field.')

  next()
}

function registerUser(req, res) {
  const { username, email, password } = req.body
  const user = { password }

  if (username && ! email)
    user.username = username

  if (email && ! username)
    user.email = email

  if (username && email)
    _.extend(user, { username, email })

  try {
    const userId = Accounts.createUser(user)
    res.json({ userId })
  } catch(err) {
    res.status(500).send(err.reason)
  }
}
