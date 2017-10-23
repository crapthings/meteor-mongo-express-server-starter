// list all avaible routes

export default function ({ router }) {

  router.get('/',

    function (req, res) {
      const api = _.map(router.stack, 'route.path')
      const data = { api }
      return res.json({ data })
    },

  )

}
