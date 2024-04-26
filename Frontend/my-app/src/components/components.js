import Main from "./main/main.js"
import {BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Profile from "./profile/profile.js"
import Evalution from "./evaluation/evaluation.js"
import Simulate from "./simulate/simulate.js"

export default function Components() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to='/profile' />} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/simulate" element={<Simulate/>} />
                <Route path="/evaluation" element={<Evalution />} />
                
            </Routes>
        </Router>
    )
}