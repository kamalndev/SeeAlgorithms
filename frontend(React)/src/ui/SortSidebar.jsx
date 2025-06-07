import React from "react";
import "../styles/SortSidebar.css";
import { SortSidebarData } from "./SortSidebarData.jsx";

const SortSidebar = ({ chosenAlgo, isSorting, onResetArray, onHandleSort, onSelectAlgo }) => {
    return (
        <div className="SortSidebar">
            <ul className={"SortSidebarList"}>
                {SortSidebarData.map((val, key) => {
                    const handleClick = () => {
                        if (isSorting) return; // Disable clicks while sorting

                        if (val.type === "link") {
                            window.location.pathname = val.link;
                        } else if (val.type === "reset") {
                            onResetArray();
                        } else if (val.type === "selectAlgo") {
                            onSelectAlgo(val.algo);
                        } else if (val.type === "sort") {
                            onHandleSort();
                        }
                    };

                    // Prevent clicks on links while sorting, unless it's the current page link
                    const itemIsDisabled = isSorting && val.type !== "link";

                    return (
                        <li
                            key={key}
                            className={`SortSidebarRow ${chosenAlgo === val.algo ? "active" : ""} ${itemIsDisabled ? "disabled" : ""}`}
                            onClick={itemIsDisabled ? null : handleClick}
                            id={val.type === "link" && window.location.pathname === val.link ? "active" : ""}
                        >
                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SortSidebar; 