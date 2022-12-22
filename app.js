const express = require("express");
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: process.env.ORIGIN_CORS,
  optionsSuccessStatus: 200
}

app.use(cors())

app.get("/recaptcha", async (req, res) => {
  const { token } = req.query;
  try {
    const { data } = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`);
    const { 'error-codes': error, success } = data;
    if (!success) {
      throw error[0]
    }
    return res.status(200).send({ success });
  } catch (error) {
    return res.status(404).send({ error })
  }
});

app.listen(port);