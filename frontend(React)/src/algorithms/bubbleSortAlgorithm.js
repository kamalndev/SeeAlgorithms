export default function bubbleSortAlgorithm(array) {
    const bubbleSortArray = array.slice();
    const animations = [];
    const size = bubbleSortArray.length;
  
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size - i - 1; j++) {

        animations.push(['compare', j, j + 1]); // compare two array elements

        if (bubbleSortArray[j] > bubbleSortArray[j + 1]) {
          [bubbleSortArray[j], bubbleSortArray[j + 1]] = [bubbleSortArray[j + 1], bubbleSortArray[j]]; // swap the array elements
          animations.push([ 'swap', j, j + 1, bubbleSortArray[j],bubbleSortArray[j + 1]  ]);
        }
      }
    }
  
    return animations;
  }
  