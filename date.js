
module.exports.getDate = getDate;
module.exports.getDay = getDay;

function getDate() {
  var today = new Date();
 const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var day = today.toLocaleDateString('en-US', options);
return day;
}


function getDay() {
  var today = new Date();
 const options = { weekday: 'long' };
var day = today.toLocaleDateString('en-US', options);
return day;
}
