import Main from "./main/main.js"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

export default function Components() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </Router>
    )
}