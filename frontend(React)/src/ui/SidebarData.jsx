import React from "react";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import HomeIcon from "@mui/icons-material/Home";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import LoginIcon from "@mui/icons-material/Login";

export const SidebarData = [  
  { title: "SeeAlgorithms",   icon: <HomeIcon />,   link: "/"       },
  { title: "Login/Signup",    icon: <LoginIcon />,  link: "/login"  },
  { title: "Sorting Visualizer", icon: <SignalCellularAltIcon />, link: "/sort" },
  // { title: "Practice",        icon: <BeenhereIcon />, link: "/practice" }
];
