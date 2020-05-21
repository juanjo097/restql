const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mysql = require('mysql');

const app = express();


var options = 
{
    origin : 'http://localhost:8080'
};

app.use(cors(options));

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// db variables
const db_config = require('./app/config/db.cnf');

const connection = mysql.createConnection({
    host     : db_config.HOST,
    port     : db_config.PORT,
    user     : db_config.USER,
    password : db_config.PASS,
    database : db_config.DB
  });

connection.connect(
    ()=>
    {
        console.log("Success to connect with DB");
    },
    (_err) =>
    {
        console.log("Error to connect with DB", _err);
    }
);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
