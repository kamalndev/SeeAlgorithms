import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import GraphVisualizer from './pages/GraphVisualizer.jsx';
import Practice from './pages/Practice.jsx';
import SortingVisualizer from "./pages/SortingVisualizer.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Sidebar from "./ui/Sidebar.jsx"

function App() {
    return (
        <>
            <Sidebar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/graphs" element={<GraphVisualizer />} />
                    <Route path="/sort" element={<SortingVisualizer />} />
                    <Route path="/practice" element={<Practice />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                </Routes>
            </div>
        </>
    );
}

export default App;
