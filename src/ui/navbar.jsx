import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
    console.log("navbar")
    return (

        <nav className="navbar">
            <Link to="/" className="siteTitle">SeeAlgorithms</Link>
            <ul>
                <li><Link to="/graphs">Graph Algorithms</Link></li>
                <li><Link to="/sort">Sorting Algorithms</Link></li>
                <li><Link to="/practice">Practice</Link></li>
            </ul>
        </nav>
    );
}
