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
