let arr = [
  {
    name: "John",
    age: 22,
    hobies: ["cricket", "badminton", "travelling"],
    jobTitle: "Software Developer",
  },
  {
    name: "Jaskcon",
    age: 33,
    hobies: ["news", "sensex"],
    jobTitle: "Program Manager",
  },
  {
    name: "Ram Prasad",
    age: 67,
    hobies: ["cricket", "news"],
    jobTitle: "Retired Vateran",
  },
  {
    name: "Rahim",
    age: 13,
    hobies: ["comics"],
    jobTitle: "Student",
  },
];

function transform(input) {
  let p = {};
  for (let item of arr) {
    for (let hobby of item.hobies) {
      if (!p[hobby]) {
        p[hobby] = [];
      }
      p[hobby].push(item.name);
    }
  }
  console.log(p);
}

transform(arr);

// Please find the below
// Show me the list of people by hobies eg
//
/* let p = {
  cricket: ["John", "Ram Prasad"],
  badminton: ["John"],
  travelling: ["John"],
  news: ["Jaskcon","Ram Prasad"],
  sensex: ["Jaskcon"],
  comics: ["Rahim"]
}  */

const p = arr.reduce((newObj, item) => {
  for (let hobby of item.hobies) {
    if (!newObj[hobby]) newObj[hobby] = [];
    newObj[hobby].push(item.name);
  }
  return newObj;
}, {});
