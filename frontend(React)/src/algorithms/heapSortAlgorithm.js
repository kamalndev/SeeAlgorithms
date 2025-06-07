function swap(array, index1, index2) {
    [array[index1], array[index2]] = [array[index2], array[index1]];
}

function heapify(array,index,length = array.length, animations) {
    let largest = index;
    const left = index * 2 + 1;
    const right = index * 2 + 2;

    // compare element to left child
    if (left < length) {
        animations.push(['compare', index, left])
        if(array[left] > array[largest]) {
            largest = left;
        }
    }

    // compare element to right child
    if(right < length) {
        animations.push(['compare', largest, right])
        if(array[right] > array[largest]) {
            largest = right;
        }
    }

    // if child was larger, swap and continue
    if (largest !== index) {
        swap(array, index, largest);
        animations.push(['swap', index, largest, array[index],array[largest]]);
        // heapify down the heap
        heapify(array,largest,length, animations)
    }
}

export default function heapSortAlgorithm(inputArray) {
    const animations = [];
    const array = inputArray.slice();
    const length = array.length;

    const lastParent = Math.floor((length - 2) / 2)

    for (let i = lastParent; i >= 0; i--) {
        heapify(array,i, length, animations)
    }
    // move max elements to the end of the array
    for (let i = length - 1; i > 0; i--) {
        // max element of unsorted is at index 0, so swap
        swap(array, 0, i);
        animations.push(['swap', 0, i, array[0], array[i]]);
        // reheapify array, from beginning to end of unsorted section
        heapify(array, 0, i, animations);
    }
    return animations;
}