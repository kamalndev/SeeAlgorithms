// src/components/SortingVisualizer.jsx
import React, { useState, useEffect } from 'react';
import '../styles/SortingVisualizer.css';
import { mergeSortFunction } from '../algorithms/mergeSortAlgorithm.js';
import quickSortFunction from '../algorithms/quickSortAlgorithm.js';
import heapSortAlgorithm from '../algorithms/heapSortAlgorithm.js';
import bubbleSortAlgorithm from '../algorithms/bubbleSortAlgorithm.js';
import SortSidebar from '../ui/SortSidebar.jsx';

const MIN_SPEED = 3;
const MAX_SPEED = 30;

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [chosenAlgo, setChosenAlgo] = useState('');
  const [isSorting, setIsSorting] = useState(false);
  const [speedSliderValue, setSpeedSliderValue] = useState(MAX_SPEED);
  const numberOfArrayBars = 100;

  // on mount, generate array
  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArr = [];
    for (let i = 0; i < numberOfArrayBars; i++) {
      newArr.push(Math.floor(Math.random() * (700 - 5 + 1)) + 5);
    }
    setArray(newArr);
  };

  const flashGreen = delay => {
    if (delay <= 0) return;
    const bars = document.getElementsByClassName('arrayBar');
    setTimeout(
      () => [...bars].forEach(b => (b.style.backgroundColor = '#00FF00')),
      delay
    );
    setTimeout(
      () => [...bars].forEach(b => (b.style.backgroundColor = 'turquoise')),
      delay + 1000
    );
  };

  // compute ms delay from slider (higher slider = faster = smaller ms)
  const computeSpeed = () => MAX_SPEED - speedSliderValue + MIN_SPEED;

  const bubbleSort = () => {
    const speed = computeSpeed();
    const animations = bubbleSortAlgorithm([...array]);
    const arrayBars = document.getElementsByClassName('arrayBar');
    let step = 0;

    for (let k = 0; k < animations.length; k++) {
      const [type, barOneIndex, barTwoIndex, newHeightOne, newHeightTwo] = animations[k];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;

      if (type === 'compare') {
        setTimeout(() => {
          barOneStyle.backgroundColor = 'yellow';
          barTwoStyle.backgroundColor = 'yellow';
        }, step * speed);

      } else if (type === 'swap') {
        setTimeout(() => {
          barOneStyle.backgroundColor = 'red';
          barTwoStyle.backgroundColor = 'red';
          barOneStyle.height = `${newHeightOne}px`;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, step * speed);
      }

      // reset colors
      setTimeout(() => {
        barOneStyle.backgroundColor = 'turquoise';
        barTwoStyle.backgroundColor = 'turquoise';
      }, (step++ + 1) * speed);
    }

    return step * speed;
  };

  const quickSort = () => {
    const speed = computeSpeed();
    const animations = quickSortFunction([...array]);
    const arrayBars = document.getElementsByClassName('arrayBar');
    let step = 0;

    for (let k = 0; k < animations.length; k++) {
      const [type, barOneIndex, barTwoIndex, newHeightOne, newHeightTwo] = animations[k];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;

      if (type === 'compare') {
        setTimeout(() => {
          barOneStyle.backgroundColor = 'yellow';
          barTwoStyle.backgroundColor = 'purple';
        }, step * speed);

      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = 'red';
          barTwoStyle.backgroundColor = 'red';
          barOneStyle.height = `${newHeightOne}px`;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, step * speed);
      }

      // reset colors
      setTimeout(() => {
        barOneStyle.backgroundColor = 'turquoise';
        barTwoStyle.backgroundColor = 'turquoise';
      }, (step++ + 1) * speed);
    }

    return step * speed;
  };

  const mergeSort = () => {
    const speed = computeSpeed();
    const animations = mergeSortFunction([...array]);
    const arrayBars = document.getElementsByClassName('arrayBar');

    for (let k = 0; k < animations.length; k++) {
      if (k % 3 !== 2) {
        const [barOneIndex, barTwoIndex] = animations[k];
        const color = k % 3 === 0 ? 'yellow' : 'turquoise';
        setTimeout(() => {
          arrayBars[barOneIndex].style.backgroundColor = color;
          arrayBars[barTwoIndex].style.backgroundColor = color;
        }, k * speed);
      } else {
        const [barOneIndex, newHeightOne] = animations[k];
        setTimeout(() => {
          arrayBars[barOneIndex].style.height = `${newHeightOne}px`;
        }, k * speed);
      }
    }

    return animations.length * speed;
  };

  const heapSort = () => {
    const speed = computeSpeed();
    const animations = heapSortAlgorithm([...array]);
    const arrayBars = document.getElementsByClassName('arrayBar');
    let step = 0;

    for (let k = 0; k < animations.length; k++) {
      const [type, barOneIndex, barTwoIndex, newHeightOne, newHeightTwo] = animations[k];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;

      if (type === 'compare') {
        setTimeout(() => {
          barOneStyle.backgroundColor = 'purple';
          barTwoStyle.backgroundColor = 'yellow';
        }, step * speed);

      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = 'red';
          barTwoStyle.backgroundColor = 'red';
          barOneStyle.height = `${newHeightOne}px`;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, step * speed);
      }

      // reset colors
      setTimeout(() => {
        barOneStyle.backgroundColor = 'turquoise';
        barTwoStyle.backgroundColor = 'turquoise';
      }, (step++ + 1) * speed);
    }

    return step * speed;
  };

  const handleSort = () => {
    if (isSorting) return;
    setIsSorting(true);

    let duration = 0;
    switch (chosenAlgo) {
      case 'mergeSort':
        duration = mergeSort();
        break;
      case 'quickSort':
        duration = quickSort();
        break;
      case 'heapSort':
        duration = heapSort();
        break;
      case 'bubbleSort':
        duration = bubbleSort();
        break;
      default:
        break;
    }

    if (duration > 0) {
      const sorted = [...array].sort((a, b) => a - b);
      setTimeout(() => setArray(sorted), duration + 20);
      flashGreen(duration + 70);
    }
    setTimeout(() => setIsSorting(false), duration + 70);
  };

  return (
    <div className="sortingPage">
      <SortSidebar
        chosenAlgo={chosenAlgo}
        isSorting={isSorting}
        onResetArray={resetArray}
        onHandleSort={handleSort}
        onSelectAlgo={setChosenAlgo}
      />

      <div className="arrayContainer">
        {array.map((v, idx) => (
          <div key={idx} className="arrayBar" style={{ height: `${v}px` }} />
        ))}

        <div className="sliderContainer">
          <label htmlFor="speedRange">Speed of algorithm:</label>
          <input
            id="speedRange"
            type="range"
            min={MIN_SPEED}
            max={MAX_SPEED}
            value={speedSliderValue}
            disabled={isSorting}
            onChange={e => setSpeedSliderValue(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
