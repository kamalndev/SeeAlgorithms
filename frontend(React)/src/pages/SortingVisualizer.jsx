import React from 'react';
import '../styles/SortingVisualizer.css';
import { mergeSortFunction } from '../algorithms/mergeSortAlgorithm.js';
import quickSortFunction from '../algorithms/quickSortAlgorithm.js';
import heapSortAlgorithm from '../algorithms/heapSortAlgorithm.js';
import bubbleSortAlgorithm from '../algorithms/bubbleSortAlgorithm.js';
import SortSidebar from '../ui/SortSidebar.jsx';


// const ANIMATION_SPEED_MS = 3;

const MIN_SPEED = 3;
const MAX_SPEED = 30;



export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      chosenAlgo: '',
      isSorting: false,
      speedSliderValue: 3,
      numberOfArrayBars: 100,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

//   generate new array button
  resetArray = () => {
    const array = [];
    for (let i = 0; i < this.state.numberOfArrayBars; i++) {
      array.push(Math.floor(Math.random() * (700 - 5 + 1)) + 5);
    }
    this.setState({ array });
  };

  // flash green once sorted 
  flashGreen(delay) {
    if (delay <= 0) return;
    const bars = document.getElementsByClassName('arrayBar');
    setTimeout(() => [...bars].forEach(b => (b.style.backgroundColor = '#00FF00')), delay);
    setTimeout(() => [...bars].forEach(b => (b.style.backgroundColor = 'turquoise')), delay + 1000);
  }

  

bubbleSort() {
  const speed = MAX_SPEED - this.state.speedSliderValue + MIN_SPEED;
  const animations = bubbleSortAlgorithm([...this.state.array]);
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
        }, step++ * speed);
  
      } else if (type === 'swap') {
        setTimeout(() => {
          barOneStyle.backgroundColor = 'red';
          barTwoStyle.backgroundColor = 'red';
          barOneStyle.height = `${newHeightOne}px`;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, step++ * speed);
      }
  
      // reset colors
      setTimeout(() => {
        barOneStyle.backgroundColor = 'turquoise';
        barTwoStyle.backgroundColor = 'turquoise';
      }, step++ * speed);
    }
  
    return step * speed;
  }
  

  
  quickSort() {
    const speed = MAX_SPEED - this.state.speedSliderValue + MIN_SPEED;
    const anim = quickSortFunction([...this.state.array]);
    const bars = document.getElementsByClassName('arrayBar');
    let step = 0;
    for (const [type, i, j, hI, hJ] of anim) {
      const s1 = bars[i].style,
        s2 = bars[j].style;
      if (type === 'compare') {
        setTimeout(() => {
          s1.backgroundColor = 'yellow';
          s2.backgroundColor = 'purple';
        }, step++ * speed);
      } else {
        setTimeout(() => {
          s1.backgroundColor = s2.backgroundColor = 'red';
          bars[i].style.height = `${hI}px`;
          bars[j].style.height = `${hJ}px`;
        }, step++ * speed);
      }
      setTimeout(() => {
        s1.backgroundColor = s2.backgroundColor = 'turquoise';
      }, step++ * speed);
    }
    return step * speed;
  }


  mergeSort() {
    const speed = MAX_SPEED - this.state.speedSliderValue + MIN_SPEED;
    const anim = mergeSortFunction(this.state.array);
    const bars = document.getElementsByClassName('arrayBar');
    for (let i = 0; i < anim.length; i++) {
      const isColor = i % 3 !== 2;
      if (isColor) {
        const [a, b] = anim[i];
        const color = i % 3 === 0 ? 'yellow' : 'turquoise';
        setTimeout(() => {
          bars[a].style.backgroundColor = color;
          bars[b].style.backgroundColor = color;
        }, i * speed);
      } else {
        const [idx, h] = anim[i];
        setTimeout(() => (bars[idx].style.height = `${h}px`), i * speed);
      }
    }
    return anim.length * speed;
  }

  
  heapSort() {
    const speed = MAX_SPEED - this.state.speedSliderValue + MIN_SPEED;
    const anim = heapSortAlgorithm([...this.state.array]);
    const bars = document.getElementsByClassName('arrayBar');
    let step = 0;
    for (const [type, i, j, hI, hJ] of anim) {
      const s1 = bars[i].style,
        s2 = bars[j].style;
      if (type === 'compare') {
        setTimeout(() => {
          s1.backgroundColor = 'purple';
          s2.backgroundColor = 'yellow';
        }, step++ * speed);
      } else {
        setTimeout(() => {
          s1.backgroundColor = s2.backgroundColor = 'red';
          bars[i].style.height = `${hI}px`;
          bars[j].style.height = `${hJ}px`;
        }, step++ * speed);
      }
      setTimeout(() => {
        s1.backgroundColor = s2.backgroundColor = 'turquoise';
      }, step++ * speed);
    }
    return step * speed;
  }

  
  handleSort = () => {
    if (this.state.isSorting) return;

    this.setState({ isSorting: true }, () => {
      const { chosenAlgo } = this.state;
      let duration = 0;

      switch (chosenAlgo) {
        case 'mergeSort':
          duration = this.mergeSort();
          break;
        case 'quickSort':
          duration = this.quickSort();
          break;
        case 'heapSort':
          duration = this.heapSort();
          break;
        case 'bubbleSort':
          duration = this.bubbleSort();
          break;
        default:
          break;
      }

      if (duration > 0) {
        const sorted = [...this.state.array].sort((a, b) => a - b); 
        setTimeout(() => this.setState({ array: sorted }), duration + 20); // 🆕 after animations
        this.flashGreen(duration + 70);
      }

      setTimeout(() => this.setState({ isSorting: false }), duration + 70);
    });
  };

  renderAlgoButton(name, label) {
    const { chosenAlgo, isSorting } = this.state;
    const active = chosenAlgo === name;
    return (
      <button
        onClick={() => this.setState({ chosenAlgo: name })}
        disabled={isSorting}
        style={{ color: active ? '#E04050' : 'black', opacity: isSorting && !active ? 0.35 : 1 }}
      >
        {label}
      </button>
    );
  }

  render() {
    const { array, isSorting, chosenAlgo, speedSliderValue} = this.state;
    return (
        <div className="sortingPage">
          <SortSidebar
              chosenAlgo={chosenAlgo}
              isSorting={isSorting}
              onResetArray={this.resetArray}
              onHandleSort={this.handleSort}
              onSelectAlgo={(algo) => this.setState({ chosenAlgo: algo })}
          />
          <div className="arrayContainer">
            {array.map((v, idx) => (
                <div key={idx} className="arrayBar" style={{ height: `${v}px` }} />
            ))}

            <div className={"sliderContainer"}>
              <label htmlFor={"speedRange"}>Speed of algorithm:</label>
              <input
                id={"speedRange"}
                type="range"
                min ={MIN_SPEED}
                max ={MAX_SPEED}
                value = {speedSliderValue}
                disabled={isSorting}
                onChange={e => this.setState({ speedSliderValue: Number(e.target.value) })}
                />
            </div>
          </div>
        </div>
    );
  }
}
