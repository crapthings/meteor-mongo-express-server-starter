Meteor.isDevelopment && Meteor.startup(function () {
  Examples.remove({})
  _.times(30, n => {
    Examples.insert({
      title: faker.lorem.sentence(),
    })
  })
})
