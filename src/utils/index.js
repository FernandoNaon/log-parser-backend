const fs = require('fs')
const {getLogs} = require('./readLog')





//--------------------------Current Game -------------------------------------

// let logs =  await getLogs()
  
// const matchStart = txt.filter(el=> el.includes('Match_Start'))

// const findFirstIndex = (el) => el === matchStart[matchStart.length - 1]

// const firstIndex = logs.findIndex(findFirstIndex);

// const currentGame = logs.slice(firstIndex, logs.length[-1])



//--------------------------Scoreboard-------------------------------------

const getScoreboard = async() => {
    const currentGame = await getLogs()
  let scoreboard = []
      currentGame.filter(el =>{
           if(el.match('RoundsPlayed')){
           scoreboard.push(el)
  }
})
console.log(scoreboard)
  let finalScore = scoreboard.map(el=>el.slice(42,47))
  console.log(finalScore) 
  let finalRound = scoreboard.map(el=>el.slice(78.80))

  const result = {}

  finalRound.forEach((el, i )=>{
    result[el] =finalScore[i]
  })
 return (result)
}


//--------------------------kills per player-------------------------------


const getKillsPerPlayer = async(name) => {
  const currentGame = await getLogs()
  let totalKills = [];
  const regex = new RegExp('(' + name + ')(.*)(killed)','g');
  
  currentGame.filter(el => {
      if (el.match(regex)){
          totalKills.push(el)
      }
  })
  return totalKills.length
};

//--------------------------Round average length-------------------------------

const getAverage = async() =>{
  
  const currentGame = await getLogs();
  let round = [];
  var intervals = [];
  
  currentGame.filter((el =>{
  if(el.match('Round_End')){
      round.push(el)
    }
  }));
  let date = round.map(el=>el.slice(0,21));
  
  let eraseDash = date.map(el=>el.replace(/-/g, ""));

  let time =  eraseDash.map((el => new Date(el).getTime()));

    for (i = 0; i < time.length - 1; i++) {
      intervals[i] = time[i+1] - time[i];
    }
 
    let sum = intervals.reduce((a, b) => a + b, 0);	
    let average = sum / round.length
    // let finalAverage = average.splice(10, 18)
    let result = new Date(average)

    return(` 0${result.getMinutes()}:0${result.getSeconds()}`)

  }
  
  
  module.exports = {  getScoreboard, getKillsPerPlayer, getAverage   };
