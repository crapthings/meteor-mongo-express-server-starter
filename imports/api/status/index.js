// check server status

export default function ({ router }) {

  router.get('/status',

    function (req, res) {
      return res.status(200).send('service is running')
    },

  )

}
