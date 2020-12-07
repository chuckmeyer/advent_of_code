var fs = require('fs');

var getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function(err, data) {
      resolve(data.toString().split('\n').filter(n => n));
    });
})};

var myMove = (location, x, y, width) => {
  return new Promise((resolve, reject) => {
    location.y += y;
    location.x += x;
    if(location.x > width - 1){
      location.x = location.x - width;
    }
    resolve(location);
})};

async function mapRoute(x,y,myMap) {
  try {
    var trees = 0;
    var myLocation = {x:0, y:0};
    while (myLocation.y < myMap.length){
      if(myMap[myLocation.y][myLocation.x] === "#"){
        trees++;
      }
      myLocation = await myMove(myLocation, x, y, myMap[0].length);
    }
    return trees;
  } catch (err) {
    console.log(err);
  }
}

async function allRoutes() {
  var product = 1;
  var values = await getFile('input.txt');
  var myMap = values.map(line => line.split(''));
  const resultArray = await Promise.all([
    mapRoute(3,1,myMap),
    mapRoute(1,1,myMap),
    mapRoute(5,1,myMap),
    mapRoute(7,1,myMap),
    mapRoute(1,2,myMap)]);
  console.log(resultArray.reduce((product,value) => product * value));
}

allRoutes();