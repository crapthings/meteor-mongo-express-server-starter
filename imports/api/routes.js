export default function ({ router }) {

  router.get('/',

    function (req, res) {
      const endpoints = _.map(router.stack, 'route.path')
      const data = { endpoints }
      return res.json({ data })
    },

  )

}
