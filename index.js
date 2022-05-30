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
    const timeInDate = recordObj.timeInEvents[0].date
    const timeOutDate = recordObj.timeOutEvents[0].date

    if (timeInDate === date && timeOutDate === date) {
    const timeIn = recordObj.timeInEvents[0].hour
    const timeOut = recordObj.timeOutEvents[0].hour
    const hoursWorked = Number(timeOut) - Number(timeIn)
    return Number(String(hoursWorked)[0])
    }
};

function wagesEarnedOnDate(recordObj, date) {
    const timeInDate = recordObj.timeInEvents[0].date
    const timeOutDate = recordObj.timeOutEvents[0].date

    if (timeInDate === date && timeOutDate === date) {
        return recordObj.payPerHour * hoursWorkedOnDate(recordObj,date)
    }
};