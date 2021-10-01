const express = require("express");
const createError = require("http-errors");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/select_all", async (req, res, next) => {
  axios({
    method: "post",
    url: "http://172.16.3.15/jack/rest-api/index.php/OracleDB/query",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      sql: "SELECT INVNO,SVDATE,BILLMUAD,LCCODE,STDCODE,D_ESC,QTY,UP,CHARGEAMT,CLAIMUP,CLAIMAMOUNT,SVREFID,CLAIMCAT FROM VIEW_JACK_M1",
    },
  })
    .then(function (response) {
      console.log(response.data);

      var currentdate = new Date();

      var datetimeNew =
        req.query.svdate +
        "|" +
        currentdate.getHours() +
        "-" +
        currentdate.getMinutes() +
        "-" +
        currentdate.getSeconds() +
        "-";

      const stream = fs.createWriteStream("./select_all.txt");
      stream.once("open", async function (fd) {
        const header = `<?xml version="1.0" encoding="windows-874"?>
<ClaimRec System="OP" PayPlan="CS" Version="0.93">
<Header>
<HCODE>11320</HCODE>
<HNAME>โรงพยาบาลหัวหิน</HNAME>
<DATETIME>${datetimeNew}</DATETIME>
<SESSNO>0000</SESSNO>
<RECCOUNT>${response.data.length}</RECCOUNT>
</Header>
<Dispensing>\n`;
        stream.write(header);
        await response.data.map(async (row) => {
          // console.log(row.SVDATE);
          if (row.SVDATE == req.query.svdate) {
            await stream.write(
              row.INVNO +
                "|" +
                row.SVDATE +
                "|" +
                row.BILLMUAD +
                "|" +
                row.LCCODE +
                "|" +
                row.STDCODE +
                "|" +
                row.D_ESC +
                "|" +
                row.QTY +
                "|" +
                row.UP +
                "|" +
                row.CHARGEAMT +
                "|" +
                row.CLAIMUP +
                "|" +
                row.CLAIMAMOUNT +
                "|" +
                row.SVREFID +
                "|" +
                row.CLAIMCAT +
                "\n"
            );
          }
        });

        await stream.write("</DispensedItems>\n</ClaimRec>");

        await stream.end();
        // const file = `./select_all.txt`;
        // res.download(file); // Set disposition and send it.
      });
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
