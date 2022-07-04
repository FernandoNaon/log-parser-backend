const express = require("express");
const { getScoreboard, getKillsPerPlayer, getAverage } = require("./utils/index.js");
const server = express();
const {getLogs} = require('./utils/readLog.js')


server.use(express.json()); 

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});



server.get("/", async(req, res) => {
    const logs = await getLogs()
    console.log(logs+'ruta')
      res.json(logs);
  });


server.get("/scoreboard", async(req, res) =>{
      const scoreboard = await getScoreboard()
      res.json(scoreboard);
  });


server.get("/kills", async(req, res) =>{

    const { name } = req.query;
    const scoreboard = await getKillsPerPlayer(name)
    res.json(scoreboard);
});


server.get("/average", async(req, res) => {
    const average = await getAverage()
      res.json(average);
  });









  module.exports = { server };
