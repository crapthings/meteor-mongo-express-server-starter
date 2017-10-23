// an exanples route

export default function ({ router }) {

  router.get('/examples',

    function (req, res) {
      const examples = Examples.find().fetch()
      const data = { examples }
      return res.json({ data })
    },

  )

}
