/**
 * Direction:
 * Find the higher value from the array bellow
 *
 * Expected Result:
 * 8
 */
 let numbers = [3, 1, 2, 3, 7, 5, 6, 8, 2, 1];

 // boleh pake Math methode kah?
 function result(numbers) {
     // Your Code Here
    return Math.max(...numbers);
 }

 // non math methode
 function alternative(numbers) {
    let maxNum;
    for (let i = 0; i < numbers.length; i++) {
        if (i == 0) {
            maxNum = numbers[i];
            continue;
        }
        if (numbers[i] > maxNum) {
            maxNum = numbers[i]
        }
    }
    return maxNum;
 }
 
 console.log(result(numbers));
 console.log(alternative(numbers));