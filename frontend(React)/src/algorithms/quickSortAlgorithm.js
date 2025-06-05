export default function quickSortFunction(arr, lo = 0, hi = arr.length - 1, animations = []) {
    if (lo >= hi) return animations;

    const p = partition(arr, lo, hi, animations);
    quickSortFunction(arr, lo, p, animations);  // left side
    quickSortFunction(arr, p + 1, hi, animations); // right side
    return animations;
}

function partition(arr, lo, hi, animations) {
    const pivotIdx = Math.floor((lo + hi) / 2);
    const pivot    = arr[pivotIdx];

    let i = lo - 1;
    let j = hi + 1;

    while (true) {
        do {                                       // scan from the left
            i++;
            animations.push(['compare', i, pivotIdx]);
        } while (arr[i] < pivot);

        do {                                       // scan from the right
            j--;
            animations.push(['compare', j, pivotIdx]);
        } while (arr[j] > pivot);

        if (i >= j) return j;                      // split point reached

        [arr[i], arr[j]] = [arr[j], arr[i]];       // in-place swap
        animations.push(['swap', i, j, arr[i], arr[j]]);          // log the swap , with heights
    }
}
