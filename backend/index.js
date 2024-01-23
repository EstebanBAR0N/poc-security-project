const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post("/eval", (req, res) => {
  console.log("/eval route, expression: ", req.body.expression.toString());

  try {
    var exec = require("child_process").exec;
    var result = "";

    exec(req.body.expression, function (error, stdout, stderr) {
      result = stdout || stderr;

      console.log("result: ", result);

      if (error !== null) {
        console.log("exec error: " + error);
      }

      res.json({ result: result });
    });
  } catch (error) {
    res.status(400).json({ error: "Evaluation error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
