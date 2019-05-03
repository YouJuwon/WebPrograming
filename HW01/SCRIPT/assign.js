initSetting();

var modal = document.getElementById('scheduleModal');
var btuClose = document.getElementById("close");
var btuAdd = document.getElementById("add");

btuClose.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/*year.setAttribute(id, day); 이렇게 id를 부여가능*/

function initSetting() {
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let date = dateObj.getDate();
    let day = new Date(year + '-' + month + '-' + 1).getDay();
    let dCount = daysCount(year, month);
    document.getElementById("calendarDate").innerHTML = year + '年 ' + month + '月';

    numberInit(dCount, date, day);
}

function numberInit(dCount, date, day) {
    var calBody = document.getElementById("calBody").getElementsByTagName("tr");
    for (var i = 0, count = 1, firstLine; i < 6 && count <= dCount; i++) {
        firstLine = calBody.item(i).getElementsByTagName("td");
        for (var j = 0, tdObj; j < 7 && count <= dCount; j++) {
            if (day > 0) day -= 1;
            else {
                tdObj = firstLine.item(j);
                tdObj.innerHTML = count;
                tdObj.setAttribute("id", "day"+count);
                count++;
                setBackgroundColor(date, tdObj);
            }
        }
    }
}

function setBackgroundColor(date, tdObj) {
    var objNodeValue = tdObj.childNodes[0].nodeValue;
    if (date == objNodeValue) {
        addSetDate(tdObj, objNodeValue, "#96e3ff");
    } else if (date > objNodeValue) {
        tdObj.style.backgroundColor = "#e3e4ea";
    } else {
        addSetDate(tdObj, objNodeValue, "#d9e8ce");
    }
}

function addSetDate(tdObj, objNodeValue, color) {
    tdObj.style.backgroundColor = color;
    tdObj.ondblclick = function () {
        modal.style.display ="block";
        document.getElementById("scheduleText").innerHTML = objNodeValue + "日 일정추가";
        btuAdd.onclick = function(){
            var inputText = document.getElementById("txtField").value;
            modal.style.display = "none";
            var para = document.createElement("p");
            para.appendChild(document.createTextNode(inputText));
            para.setAttribute("class", "schedule");
            console.log(para);//test
            tdObj.appendChild(para);
        }
    }
}

function daysCount(year, month) {
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if (((year % 400) == 0 || (year % 4) == 0 && (year % 100) != 0)) {
                return 29;
            } else {
                return 28;
            }
    }
}