const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({origin: true});

exports.proxyMangadex = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const baseUrl = "https://api.mangadex.org";
      const url = baseUrl + req.url;

      const response = await axios({
        method: req.method,
        url,
        headers: {},
        data: req.body,
        params: req.query,
      });
      res.status(response.status).send(response.data);
    } catch (error) {
      console.error(error);
      const statusCode = (error.response && error.response.status) || 500;
      res.status(statusCode).send(error.message);
    }
  });
});
