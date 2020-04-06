const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
var compression = require("compression");
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }))
app.use(compression());
app.use(cors());
app.use((req, res, next) => {
  res.set({
   "Access-Control-Allow-Origin": "http://localhost:3000",
   "Access-Control-Allow-Origin": "YOUR_MAIN_DOMAIN_URL",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
    "X-Frame-Options": "DENY"
  });
  res.setHeader("Cache-Control", "public, max-age=2592000");
  res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  next();
});
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "1000mb",
    parameterLimit: 10000000000000000000000000000
  })
);
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(express.static("views"));
app.use('/api', require('./routes'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
})
const port = process.env.PORT || 5000
app.listen(port, console.log(`Node App running at ${port}`));