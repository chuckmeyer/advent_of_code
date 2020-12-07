var fs = require('fs');

var getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function(err, data) {
      if (err) {
        return console.error(err);
      }
      values = data.toString().split('\n').map(Number);
      values.pop(); 
      resolve(values);
  });
})};

async function getValues() {
  var values = await getFile('day1-input.txt');
  /* for(var i = 0;i < values.length;i++){
    console.log(`"${values[i]}"`);
  }; */
  var res = await findSum(values, 2020);
  console.log(`${res[0]} * ${res[1]} * ${res[2]} = ${res[0] * res[1] * res[2]}` );
}

var myValues = getValues();

var findSum = (items, value) => {
  return new Promise((resolve, reject) => {
    for (var i=0; i<items.length; i++){
      for(var j=0; j<items.length; j++){
        if ((items[i] + items[j] < value) && (i != j)){
          for(var k=0; k<items.length; k++){
            if(i != j != k){
              console.log(`${items[i]} + ${items[j]} + ${items[k]} = ${items[i]
  + items[j] + items[k]}`);
              if(items[i] + items[j] + items[k] == value){
                resolve([items[i], items[j], items[k]]);
    }}}}}}
  });
}
