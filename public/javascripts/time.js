  var day = new Date();
  var dayOfTheWeek = day.getDay();
  var today = function(){
    switch(dayOfTheWeek){
    case 0:
      return "Sunday";
      break;
    case 0:
      return "Sunday";
      break;
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
    }
  }();
  var currentHour = day.getHours();
  var hour = function(){
    if(currentHour == 0){
      return '12';
    }
    if (currentHour < 10){
      return '0' + currentHour;
    } else {
      return currentHour;
    }
  }();
  var currentMinute = day.getMinutes();
  var AMPM = function(){
    if(currentHour <= 11){
      return "AM";
    } else {
      return "PM";
    }
  }();
  var minute = function(){
    if (currentMinute < 10){
      return '0' + currentMinute;
    } else {
      return currentMinute;
    }
  }();
