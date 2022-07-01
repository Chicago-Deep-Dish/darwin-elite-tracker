export default function grindStreak(dateArray) {
  let count = 0;
  let nonISODateArray = [];
  dateArray.forEach((date) => {
    nonISODateArray.push(date.toISOString().slice(0, 10));
  });

  let filteredArr = removeDuplicateStringsFromArray(nonISODateArray);

  for (let i = 0; i < filteredArr.length - 3; i++) {
    let date1 = null;
    let date2 = null;
    let date3 = null;
    let date4 = null;

    date1 = new Date(addOneDay(filteredArr[i])).toISOString().slice(0, 10);
    date2 = filteredArr[i + 1];
    date3 = new Date(addOneDay(filteredArr[i + 1])).toISOString().slice(0, 10);
    date4 = filteredArr[i + 2];

    if (date1 === date2) {
      if (date3 === date4) {
        count++;
        do {
          i++;
        } while (
          i < filteredArr.length - 3 &&
          new Date(addOneDay(filteredArr[i + 2])).toISOString().slice(0, 10) ===
            new Date(addOneDay(filteredArr[i + 3])).toISOString().slice(0, 10)
        );
      }
    }
  }

  return count;
}

function removeDuplicateStringsFromArray(array) {
  return array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
}

function addOneDay(date) {
  date = new Date(date);
  return date.setDate(date.getDate() + 1);
}
// function incrementDate(iso, x) {
//   const date = new Date(iso);
//   date.setDate(date.getDate() + x);
//   return date;
// }

// function ISOtoDateMonthYear(date) {
//   // date = new Date(date);
//   const year = date.getFullYear().toString();
//   let month = date.getMonth() + 1;
//   let dt = date.getDate().toString();

//   if (dt < 10) {
//     dt = "0" + dt;
//   }
//   if (month < 10) {
//     month = "0" + month;
//   }
//   return `${Number(year)}/${Number(month)}/${Number(dt)}`;
// }
// function getDatesFromArrayBetweenTwoDates(startDate, endDate, array) {
//   const dates = [];
//   let currentDate = startDate;
//   while (currentDate <= endDate) {
//     dates.push(array.includes(currentDate));
//     currentDate = incrementDate(currentDate, 1);
//   }
//   return dates;
// }

// function confirmIfDateIsInDateArray(date, dateArray) {
//   return dateArray.includes(date);
// }

// function sortDateObjectsByDate(dateArray) {
//   return dateArray.sort((a, b) => {
//     return a.date - b.date;
//   });
// }

// function checkDate(fromDate, toDate, dateCheck) {
//   var d1 = ISOtoDateMonthYear(fromDate).split("/");
//   var d2 = ISOtoDateMonthYear(toDate).split("/");
//   var c = ISOtoDateMonthYear(dateCheck).split("/");

//   var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
//   var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
//   var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

//   return check > from && check < to;
// }
