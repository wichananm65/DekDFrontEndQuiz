const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({origin: true});

exports.proxyMangadex = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const url = 'https://api.mangadex.org' + req.url;

      const response = await axios({
        method: req.method,
        url,
        headers: {
        },
        data: req.body,
        params: req.query
      });
      res.status(response.status).send(response.data);
    } catch (error) {
      console.error(error);
      res.status(error.response?.status || 500).send(error.message);
    }
  });
});
