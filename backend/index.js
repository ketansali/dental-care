require("dotenv").config();
require("./config/db");

const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const corsOptionsDelegate = require('./middleware/cors')
const routes = require("./routes/index");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/404");
const PORT = process.env.PORT;
const path = require('path')



// format
app.use(
  express.json({
    limit: "1024mb",
  })
);
app.use(
  express.urlencoded({
    limit: "1024mb",
    extended: true,
  })
);

// cors
app.use(cors(corsOptionsDelegate));

// fileupload
app.use(fileUpload());

//static path
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// api routes
app.use("/api", routes);

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
