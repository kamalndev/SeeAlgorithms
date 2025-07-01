import React from "react";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import MergeIcon from '@mui/icons-material/Merge';
import ReorderIcon from '@mui/icons-material/Reorder';


export const SortSidebarData = [

  { title: "Generate New Array", icon: <RestartAltIcon />, type: "reset" },
  { title: "Bubble Sort", icon: <BubbleChartIcon />, type: "selectAlgo", algo: "bubbleSort" },
  { title: "Quick Sort", icon: <RocketLaunchIcon />, type: "selectAlgo", algo: "quickSort" },
  { title: "Merge Sort", icon: <MergeIcon />, type: "selectAlgo", algo: "mergeSort" },
  { title: "Heap Sort", icon: <ReorderIcon />, type: "selectAlgo", algo: "heapSort" },
  { title: "Sort!", icon: <PlayArrowIcon />, type: "sort" },
]; 