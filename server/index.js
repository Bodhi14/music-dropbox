const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../server/Connect');
const songData = require('../server/models/songs');
const songs = require('../server/models/songs');
const app = express();

dotenv.config();

connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api", async(req, res) => {
   let song = new songData();
   song.songID = req.body.songId;
   song.songName = req.body.songName;
   song.songLink = req.body.songLink;
   const doc = await song.save();
   res.json(req.body);
})

app.get("/api", async(request, response)=> {
      const docs = await songs.find({});
      response.json(docs);
})

app.get("/api/:id", async(req, res)=> {
   const doc = await songs.findById(req.params.id);
   res.json(doc);
})

app.delete("/api/:id", async(req, res)=> {
   const result = await songs.findOneAndDelete({_id: req.params.id});
   res.send(result);
})

const port = process.env.PORT;

app.listen(port, () => {
   console.log("Server is running on port " + port);
});






