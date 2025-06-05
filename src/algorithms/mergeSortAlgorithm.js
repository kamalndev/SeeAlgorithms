export function mergeSortFunction(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const helperArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, helperArray, animations);
    return animations;
}

function mergeSortHelper(array, start, end, helperArray, animations) {
    if (start === end) return;
    const middle = Math.floor((start + end) / 2);
    mergeSortHelper(helperArray, start, middle, array, animations);
    mergeSortHelper(helperArray, middle + 1, end, array, animations);
    doMerge(array, start, middle, end, helperArray, animations);
}

function doMerge(
    array,
    start,
    middle,
    end,
    helperArray,
    animations,
) {
    let k = start;
    let i = start;
    let j = middle + 1;
    while (i <= middle && j <= end) {
        // comparing these values, push to change color
        animations.push([i, j]);
        // push a second time to revert color
        animations.push([i, j]);
        if (helperArray[i] <= helperArray[j]) {
            //  overwrite the value at index k in the original array with the
            // value at index i in the helper array.
            animations.push([k, helperArray[i]]);
            array[k++] = helperArray[i++];
        } else {
            // overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, helperArray[j]]);
            array[k++] = helperArray[j++];
        }
    }
    while (i <= middle) {
        // comparing these values, push to change color
        animations.push([i, i]);
        // push a second time to revert color
        animations.push([i, i]);
        // overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, helperArray[i]]);
        array[k++] = helperArray[i++];
    }
    while (j <= end) {
        // change color
        animations.push([j, j]);
        // revert color
        animations.push([j, j]);
        // overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, helperArray[j]]);
        array[k++] = helperArray[j++];
    }
}