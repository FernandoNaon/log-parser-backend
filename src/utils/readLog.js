const axios = require("axios");
const fs = require('fs')



const getLogs = async () => {
  try {
      const allLogs = await axios.get(
          `https://blast-recruiting.s3.eu-central-1.amazonaws.com/NAVIvsVitaGF-Nuke.txt`
          );
// const cleanLogs = allLogs.data.toString().split('\n')
const cleanLogs = allLogs.data.toString().split("\r\n")

console.log(cleanLogs)
const matchStart = cleanLogs.filter(el=> el.includes('Match_Start'))
const findFirstIndex = (el) => el === matchStart[matchStart.length - 1]
const firstIndex = cleanLogs.findIndex(findFirstIndex);
const currentGame = cleanLogs.slice(firstIndex, cleanLogs.length[-1])
    return (currentGame);
  } catch (error) {
    console.log(error)
  }
};


module.exports = {getLogs}