import { bypassRequestLoginUrl } from '../config'

export default function (req, res, next) {
  if (_.includes(bypassRequestLoginUrl, req.originalUrl))
    return next()

  const { token: userToken } = req.headers
  const hashedToken = Accounts._hashLoginToken(userToken)
  const user = Meteor.users.findOne({ 'services.resume.loginTokens.hashedToken': hashedToken })

  if (! user)
    return res.status(500).send('login failed.')

  const credential = _.find(user.services.resume.loginTokens, ['hashedToken', hashedToken])

  // todo 检查 credential.when 到期

  req.user = _.omit(user, 'services')

  req.user.tokenExpiredAt = credential.when

  next()
}
