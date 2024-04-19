import Main from "./main/main.js"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Profile from "./profile/profile.js"

export default function Components() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </Router>
    )
}