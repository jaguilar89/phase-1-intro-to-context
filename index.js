function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(nestedArray) {
    let recordsArray = nestedArray.map(innerArray => createEmployeeRecord(innerArray))
    return recordsArray;
};

function createTimeInEvent(recordObj, dateStamp) {
    const updatedRecordObj = Object.assign({}, recordObj);
    const timeInHour = dateStamp.split(' ')[1];
    const timeInDate = dateStamp.split(' ')[0];
    const newTimeInEvent = {
        type: "TimeIn",
        hour: Number(timeInHour),
        date: timeInDate
    }
    updatedRecordObj.timeInEvents.push(newTimeInEvent);
    return updatedRecordObj
};

function createTimeOutEvent(recordObj, dateStamp) {
    const updatedRecordObj = Object.assign({}, recordObj);
    const timeOutHour = dateStamp.split(' ')[1];
    const timeOutDate = dateStamp.split(' ')[0];
    const newTimeOutEvent = {
        type: "TimeOut",
        hour: Number(timeOutHour),
        date: timeOutDate
    }
    updatedRecordObj.timeOutEvents.push(newTimeOutEvent);
    return updatedRecordObj
};

function hoursWorkedOnDate(recordObj, date) {
    const timeInDate = recordObj.timeInEvents.filter(event => event.date === date)
    const timeOutDate = recordObj.timeOutEvents.filter(event => event.date === date)
 
    let timeIn = String(timeInDate[0].hour)
    timeIn.length < 4 ? timeIn = "0" + timeIn : null
    const formattedTimeIn = timeIn.slice(0, 2) + ":" + timeIn.slice(2) // "0900" => "09:00" etc 
    let timeOut = String(timeOutDate[0].hour)
    timeOut.length < 4 ? timeIn = "0" + timeIn : null
    const formattedTimeOut = timeOut.slice(0, 2) + ":" + timeOut.slice(2)
    const hoursWorked = new Date(`${date} ${formattedTimeOut}`).getHours() - new Date(`${date} ${formattedTimeIn}`).getHours()

    return hoursWorked;
};

function wagesEarnedOnDate(recordObj, date) {
    return recordObj.payPerHour * hoursWorkedOnDate(recordObj, date)
};

function allWagesFor(recordObj) {
    let dates = recordObj.timeInEvents.map(event => event.date);
    let totalWages = dates.reduce((previousDate, currentDate) => {
        return wagesEarnedOnDate(recordObj, previousDate) + wagesEarnedOnDate(recordObj, currentDate)
    })
   return totalWages;
};