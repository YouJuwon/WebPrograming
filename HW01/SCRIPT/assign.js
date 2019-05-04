initSetting();

var scheduleModal = document.getElementById('scheduleModal');
var modifyModal = document.getElementById('modifyModal');


window.onclick = function (event) {
    if (event.target == scheduleModal) {
        addClose();
    }
    if (event.target == modifyModal) {
        modifyModal.style.display = "none";
    }
}

function addClose() {
    scheduleModal.style.display = "none";
}

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
        tdDbclick(tdObj, objNodeValue);
    }
}

function tdDbclick(tdObj, objNodeValue) {
    scheduleModal.style.display ="block";
    document.getElementById("scheduleText").innerHTML = objNodeValue + "日 일정추가";
    document.getElementById("add").onclick = function(){
        scheduleModal.style.display = "none";
        tdObj.appendChild(addSchedule());
    }
    document.getElementById("close").onclick = addClose;
}

function addSchedule() {
    var inputText = document.getElementById("txtField").value;

    return makeP(makeOutputText(inputText), makeButton());
}

function makeP(outputText, btuX){
    var para = document.createElement("p");
    para.setAttribute("class", "schedule");
    para.appendChild(outputText);
    para.appendChild(btuX);

    return para;
}

function makeButton() {
    var btuX = document.createElement("button");
    btuX.setAttribute("class", "xButton");
    btuX.innerHTML = 'x';
    btuX.onclick = function(){
        modifySchedule(btuX);
    }

    return btuX;
}

function modifySchedule(btuX) {
    document.getElementById("modifyDate").valueAsDate = new Date();
    modifyModal.style.display = "block";
    document.getElementById("delete").onclick = function () {
        btuX.parentNode.parentNode.removeChild(btuX.parentNode);
        modifyModal.style.display = "none";
    }
}

function makeOutputText(inputText) {
    var outputText = document.createElement("input")
    outputText.setAttribute("class", "outputText");
    outputText.setAttribute("type", "text");
    outputText.value= inputText;

    return outputText;
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