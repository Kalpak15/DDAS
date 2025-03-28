const express = require('express');
const cors = require('cors');
const ddas = require("./routes/auth");
const app = express();
require('dotenv').config()

const port = process.env.PORT || 3000
app.use(cors()); //

app.use(express.json())
const dbConnect = require("./config/Database");
dbConnect();

app.use("/v1/auth", ddas);


// A simple route
app.get('/', (req, res) => {
    res.send('Hello, this is my first backend!');
});



// Start the server
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});