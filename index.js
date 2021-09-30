const express = require("express");
const createError = require("http-errors");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/select_b", async (req, res, next) => {
  axios({
    method: "post",
    url: "http://172.16.3.15/jack/rest-api/index.php/OracleDB/query",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      sql: req.body.sql,
    },
  })
    .then(function (response) {
      console.log(response.data);
      res.send({ data: response.data, length: response.data.length });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
