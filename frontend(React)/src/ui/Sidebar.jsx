import React from "react";
import "../styles/Sidebar.css";
import { SidebarData } from "./SidebarData.jsx";

function Sidebar() {
    return (
        <div className="Sidebar">
            <ul className={"SidebarList"}>
                {SidebarData.map((val, key) => (
                    <li
                        key={key}
                        className={"SidebarRow"}
                        id={window.location.pathname == val.link ? "active" : ""}
                        onClick={() => {
                            window.location.pathname = val.link;
                        }}
                    >
                        <div id = "icon">{val.icon}</div>
                        <div id = "title">{val.title}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
