const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT  || 8080;
app.get("/", (req, res)=> {
    res.sendFile(path.resolve('../client/public', 'index.html'));
});

app.use(express.static('../client/public'));

app.listen(port, () => {
   console.log("Server is running on port " + port);
});




