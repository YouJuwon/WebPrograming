initSetting();

function initSetting() {
  let dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let date = dateObj.getDate();
  let day =  new Date(year+'-'+month+'-'+1).getDay();
  let dayCount = daysCount(year, month);

  document.getElementById("calendarDate").innerHTML = year + '年 ' +month + '月';

  var calBody = document.getElementById("calBody").getElementsByTagName("tr");

  numberInit(calBody, dayCount, date);

}

function numberInit(calBody, dayCount, date) {
  for (var i=0, count = 1, firstLine; i<6 && count <= dayCount ; i++){
    firstLine = calBody.item(i).getElementsByTagName("td");
    for(var j=0, tdObj; j<7 && count <= daysCount; j++) {
      if(day > 0) day -= 1;
      else {
        tdObj = firstLine.item(j);
        tdObj.innerHTML = count;
        count++;
        setBackgroundColor(date,tdObj);
      }
    }
  }
}

function setBackgroundColor(date, tdObj) {
  if(date == tdObj.childNodes[0].nodeValue) {
    tdObj.style.backgroundColor = "#96e3ff";
  }else if(date > tdObj.childNodes[0].nodeValue){
    tdObj.style.backgroundColor = "#e3e4ea";
  }else {
    tdObj.style.backgroundColor = "#d9e8ce";
  }

}

function daysCount(year, month){ //월의 일수를 구함
  switch(month){
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
      return 31;

    case 4: case 6: case 9: case 11:
      return 30;

    case 2:
      if(((year%400)==0||(year%4)==0&&(year%100)!=0)){
        return 29;
      }
      else{
        return 28;
      }
  }

}



// document.getElementById('addList').addEventListener("click", function() {
//   var itemName = prompt("Enter item name", "w3schools");
//   if (itemName === null || itemName ==="") {
//     alert("Are you leaving?");
//     return;
//   }
//   var urlName = prompt("Enter url", "https://www.w3schools.com");
//   if (urlName === null || urlName ==="") {
//     alert("Are you really going to leave?");
//     return;
//   }
//   var elem = document.createElement('li');
//   elem.innerHTML = '<a href="' + urlName + '"target="_blank">' + itemName + "</a>";
//   document.getElementById('itemList').append(elem);
//
//
// });
