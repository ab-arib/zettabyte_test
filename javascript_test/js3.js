// Question
// Given a object data, return the data multiple by 3 and sort the data.
// Expected output : { j: 0, k: 9, i: 18, l: 36 }

const data = { i: 6, j: null, k: 3, l: 12 };

function result(data) {
  // write your code here
  let result = {};
  let temp = [];
  const keys = Object.keys(data);
  for (const key of keys) {
       temp.push({
            key: key,
            value: data[key]*3
       });
  }
  const sortedData = temp.sort((a, b) => {
      return (a.value > b.value) ? 1 : -1
  });
  sortedData.forEach(data => {
      result[data.key] = data.value
  });
  return result;
}
// masih belum nemu sort object

console.log(result(data));