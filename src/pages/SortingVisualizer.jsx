import React from 'react';
import '../styles/SortingVisualizer.css';
import { mergeSortFunction } from '../algorithms/mergeSortAlgorithm.js';
import quickSortFunction from "../algorithms/quickSortAlgorithm.js";

let ANIMATION_SPEED_MS = 200; //


// Helper functions

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}


//  Vizualizer Component

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            chosenAlgo: '',
            isSorting: false, // for locking ui while animation is running
            animationSpeed: 3,
            numberOfArrayBars: 10,
        };
    }


    componentDidMount() {
        this.resetArray();
    }

    // Generate New Array Code

    resetArray() {
        const array = [];
        for (let i = 0; i < this.state.numberOfArrayBars; i++) {
            // minimum of 5 for visibility on screen
            array.push(randomIntFromInterval(5, 700));
        }
        this.setState({ array });
    }

    // Sorting ALgorithms

    bubbleSort() {
        const arrayBars = document.getElementsByClassName('arrayBar');
        let bubbleArray = JSON.parse(JSON.stringify(this.state.array)); // creates a deep copy of array (from stackoverflow)
        let step = 0;

        for (let i = 0; i < bubbleArray.length; i++) {
            for (let j = 0; j < bubbleArray.length - i - 1; j++) {
                const barOneIndex = j;
                const barTwoIndex = j + 1;

                setTimeout(() => {
                    arrayBars[barOneIndex].style.backgroundColor = 'yellow';
                    arrayBars[barTwoIndex].style.backgroundColor = 'yellow';
                }, step++ * ANIMATION_SPEED_MS);

                if (bubbleArray[j] > bubbleArray[j + 1]) {
                    const heightOne = bubbleArray[j];
                    const heightTwo = bubbleArray[j + 1];

                    [bubbleArray[j], bubbleArray[j + 1]] = [heightTwo, heightOne];

                    setTimeout(() => {
                        arrayBars[barOneIndex].style.backgroundColor = 'red';
                        arrayBars[barTwoIndex].style.backgroundColor = 'red';
                        arrayBars[barOneIndex].style.height = `${heightTwo}px`;
                        arrayBars[barTwoIndex].style.height = `${heightOne}px`;
                    }, step++ * ANIMATION_SPEED_MS);
                }

                setTimeout(() => {
                    arrayBars[barOneIndex].style.backgroundColor = 'turquoise';
                    arrayBars[barTwoIndex].style.backgroundColor = 'turquoise';
                }, step++ * ANIMATION_SPEED_MS);
            }
        }
        return step * ANIMATION_SPEED_MS;
    }

    quickSort() {

        const animations = quickSortFunction(this.state.array);
        let step = 0;
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('arrayBar');
            const [type, barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            if (type == "compare") {
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'yellow';
                    barTwoStyle.backgroundColor = 'yellow';
                }, step++ * ANIMATION_SPEED_MS);
            }
            else if (type =="swap") {
                setTimeout(() => {
                    const heightOne = barOneStyle.height;
                    const heightTwo = barTwoStyle.height;
                    arrayBars[barOneIndex].style.backgroundColor = 'red';
                    arrayBars[barTwoIndex].style.backgroundColor = 'red';
                    arrayBars[barOneIndex].style.height = heightTwo;
                    arrayBars[barTwoIndex].style.height = heightOne;
                }, step++ * ANIMATION_SPEED_MS);
            }
            setTimeout(() => {
                arrayBars[barOneIndex].style.backgroundColor = 'turquoise';
                arrayBars[barTwoIndex].style.backgroundColor = 'turquoise';
            }, step++ * ANIMATION_SPEED_MS);
        }
        return step * ANIMATION_SPEED_MS;
    }

    mergeSort() {
        const animations = mergeSortFunction(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('arrayBar');
            const isColorChange = i % 3 !== 2;

            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'yellow' : 'turquoise';

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        return animations.length * ANIMATION_SPEED_MS; // duration
    }

    heapSort() {
        /* implement later */
        return 0; // NEW
    }

    // code for buttons
    handleSort = () => {
        if (this.state.isSorting) return;

        this.setState({ isSorting: true }, () => {
            const { chosenAlgo } = this.state;
            let runTime = 0;

            switch (chosenAlgo) {
                case 'mergeSort':
                    runTime = this.mergeSort();
                    break;
                case 'quickSort':
                    runTime = this.quickSort();
                    break;
                case 'heapSort':
                    runTime = this.heapSort();
                    break;
                case 'bubbleSort':
                    runTime = this.bubbleSort();
                    break;
                default:
                    break;
            }

            setTimeout(
                () => this.setState({ isSorting: false }),
                runTime + 50 /* small buffer */
            );
        });
    };

    renderAlgoButton(name, label) {
        const { chosenAlgo, isSorting } = this.state;
        const isCurrent = chosenAlgo === name;
        const fadeOut = isSorting && !isCurrent; // NEW: fade others while sorting

        return (
            <button
                onClick={() => this.setState({ chosenAlgo: name })}
                disabled={isSorting}
                style={{
                    color: isCurrent ? '#E04050' : 'black',
                    opacity: fadeOut ? 0.35 : 1, // NEW: visual fade
                }}
            >
                {label}
            </button>
        );
    }

    // render

    render() {
        const { array, isSorting } = this.state;

        return (
            <>
                <div className="arrayContainer">
                    {array.map((value, index) => (
                        <div
                            className="arrayBar"
                            key={index}
                            style={{ height: `${value}px` }}
                        />
                    ))}

                    <div className="sortingOptions">
                        <button onClick={() => this.resetArray()} disabled={isSorting}>
                            Generate New Array
                        </button>

                        {this.renderAlgoButton('bubbleSort', 'Bubble Sort')}
                        {this.renderAlgoButton('quickSort', 'Quick Sort')}
                        {this.renderAlgoButton('mergeSort', 'Merge Sort')}
                        {this.renderAlgoButton('heapSort', 'Heap Sort')}

                        {/*runs chosen algorithm*/}
                        <button onClick={this.handleSort} disabled={isSorting}>
                            Sort!
                        </button>
                    </div>
                </div>
            </>
        );
    }
}
