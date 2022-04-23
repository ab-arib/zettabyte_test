/**
 * Direction
 * Get name of the day of 4 days ago from today
 *
 * Expected result:
 * 1. if date now = monday
 * 2. then result = thursday
 */
function result() {
  // write your code here
    const days = [
        'saturday','monday','sunday','tuesday',
        'wednesday', 'thursday', 'friday'
    ]
    let fourDayAgo;
    const date = new Date();
    const today = date.getDay();
    const minToday = today - 3;
    if (minToday < 0) {
        const abs = Math.abs(minToday);
        fourDayAgo = days.length - abs;
    } else {
        fourDayAgo = minToday;
    }
    if (fourDayAgo)
    console.log(`
    if date now = ${days[today]}
    then result = ${days[fourDayAgo]}
    `);
    return days[fourDayAgo];
}

console.log(result());