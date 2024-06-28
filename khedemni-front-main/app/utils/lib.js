export function average(array) {
    if (array.length === 0) return 0; // Handle empty array
    const sum = array.reduce((acc, current) => acc + current, 0);
    const avg = sum / array.length;
    return parseFloat(avg).toFixed(1); // Ensure the result is a number with one decimal place
}
