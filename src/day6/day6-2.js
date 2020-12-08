var fs = require('fs');

var getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function(err, data) {
      resolve(data.toString().replace(/\n*$/, "").split(/\n{2,}/g).map(group => group.split(/\s+/g)));
    });
})};

function getAnswerCount(group) {
  let allAnswers = [];
  let unanimousAnswers = [];
  
  group.forEach(answerString => {
    allAnswers = [...allAnswers, ...answerString.split('')];
  })
  const uniqueAnswers = allAnswers.filter((item,index) => allAnswers.indexOf(item) === index);
  uniqueAnswers.forEach(char => {
    if(group.filter(answer => answer.includes(char)).length === group.length){
      unanimousAnswers.push(char);
  }});
  return unanimousAnswers.length;
}

async function tallyAnswers() {
  try {
    var answerGroups = await getFile('input.txt');
    console.log(answerGroups.map(getAnswerCount).reduce((total,count) => total + count));
  } catch (err) {
    console.log(err);
  }
}

tallyAnswers();