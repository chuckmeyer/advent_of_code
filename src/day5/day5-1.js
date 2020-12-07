var fs = require('fs');

let getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function(err, data) {
      resolve(data.toString().split('\n').filter(n => n));
    });
})};

function binRange(low,high,char) {
  let mid = parseInt((high-low)/2) + low;
  if(char.match(/F|L/)){
    return [low,mid];
  } else if(char.match(/B|R/)){
    return [mid+1,high];
  } else {
    return null;    
  }
}

function findSeatId(boardingPass){
  const rowPart = boardingPass.slice(0,7).split('');
  const colPart = boardingPass.slice(7,10).split('');
  const rowRange = [0,127];
  const colRange = [0,7];

  range = rowRange;
  rowPart.forEach(char => range = binRange(range[0],range[1],char));
  let row = range[0];

  range = colRange;
  colPart.forEach(char => range = binRange(range[0],range[1],char));
  let column = range[0];

  return parseInt(row*8+column);
}

async function highestSeatId() {
  try {
    let boardingPasses = await getFile('input.txt');
    seatIds = boardingPasses.map(findSeatId);
    console.log(Math.max.apply(null,seatIds));
  } catch (err) {
    console.log(err);
  }
}

highestSeatId();