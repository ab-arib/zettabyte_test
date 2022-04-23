/**
 * Direction
 * Divide students to all of groups & students must sorted by first name
 * 
 * Expected Result
 * [
 *   [
 *     { "firstName": "Belle", "lastName": "Norton" },
 *     { "firstName": "Finnley", "lastName": "Rennie" }
 *   ],
 *   [
 *     { "firstName": "Kai", "lastName": "Lyons" },
 *     { "firstName": "Peyton", "lastName": "Gardner" }
 *   ],
 *   [{ "firstName": "Tatiana", "lastName": "Dickerson" }]
 * ]
 */
const students = [
    { firstName: 'Kai', lastName: 'Lyons' },
    { firstName: 'Belle', lastName: 'Norton' },
    { firstName: 'Finnley', lastName: 'Rennie' },
    { firstName: 'Tatiana', lastName: 'Dickerson' },
    { firstName: 'Peyton', lastName: 'Gardner' },
];
const groups = 3;

function result(students, groups) {
    // your code here
    let arrResult = [];
    let sortByFirstName = students.sort((a, b) => {
        return (a.firstName > b.firstName) ? 1 : -1;
    });
    const studentDevide = sortByFirstName.length / groups;
    const num = studentDevide.toFixed(0);
    let dataArray = sortByFirstName;
    do {
        let tempArr = [];
        for (let i = 0; i < num; i++) {
            if (!dataArray[0]) { break };
            tempArr.push(dataArray[0]);
            dataArray  = dataArray.slice(1);
        }
        arrResult.push(tempArr);
    } while (dataArray.length > 0);
    return arrResult;
}

console.log(result(students, groups));