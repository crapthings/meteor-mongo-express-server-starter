const _replaceRemoteCollectionDriver = (collections, mongoUrl) => {
  const _driver = new MongoInternals.RemoteCollectionDriver(mongoUrl)

  _.each(collections, collection => {
    collection._driver = _driver
  })

  return _driver
}

export default {
  _replaceRemoteCollectionDriver,
}
