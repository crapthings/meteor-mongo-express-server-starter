// check server status

export default function ({ router }) {

  router.get('/status',

    function (req, res) {
      return res.json({ status: 200 })
    },

  )

}
