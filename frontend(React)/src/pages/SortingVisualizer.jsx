import React from 'react';
import '../styles/SortingVisualizer.css';
import { mergeSortFunction } from '../algorithms/mergeSortAlgorithm.js';
import quickSortFunction from "../algorithms/quickSortAlgorithm.js";

let ANIMATION_SPEED_MS = 3; //


// Helper functions

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
            numberOfArrayBars: 200,
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

    flashGreen(delay) {
        if (delay <= 0) return;

        const arrayBars = document.getElementsByClassName('arrayBar');

        /* turn every bar green */
        setTimeout(() => {
            for (let bar of arrayBars) bar.style.backgroundColor = '#00FF00';
        }, delay);

        /* back to turquoise 1 s later */
        setTimeout(() => {
            for (let bar of arrayBars) bar.style.backgroundColor = 'turquoise';
        }, delay + 1000);
    }

    // Sorting ALgorithms

    bubbleSort() {
        // yellow indicates two bars are being compared, red indicates bars just swapped heights
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
        // yellow indicates bar being compared to pivot, purple indicates pivot, red indicates being swapped
        const animations = quickSortFunction([...this.state.array]);
        const arrayBars = document.getElementsByClassName('arrayBar');
        let step = 0;

        for (let i = 0; i < animations.length; i++) {

            const [type, barOneIndex, barTwoIndex, newHeightOne, newHeightTwo] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;

            if (type === "compare") {
                // flash yellow
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'yellow';
                    barTwoStyle.backgroundColor = 'purple';
                }, step++ * ANIMATION_SPEED_MS);

            }

            else if (type === "swap") {
                setTimeout(() => {
                    arrayBars[barOneIndex].style.backgroundColor = 'red';
                    arrayBars[barTwoIndex].style.backgroundColor = 'red';
                    arrayBars[barOneIndex].style.height = `${newHeightOne}px`;
                    arrayBars[barTwoIndex].style.height = `${newHeightTwo}px`;
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
        // yellow is two bars are being compared (left sub array vs right sub array)
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
            if (runTime > 0) this.flashGreen(runTime + 20);
            setTimeout(
                () => this.setState({ isSorting: false }),
                runTime + 70
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
