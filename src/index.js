import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./Home";
import reportWebVitals from "./reportWebVitals";
import GrapicalMethod from "./Pages/Roots of Equation/Grapical Method";
import BisectionMethod from "./Pages/Roots of Equation/Bisection Method";
import FalsePositionMethod from "./Pages/Roots of Equation/False-Position Method";
import NewtonRaphsonMethod from "./Pages/Roots of Equation/Newton-Raphson Method";
import OnePointIterationMethod from "./Pages/Roots of Equation/One-Point Iteration Method";
import SecantMethod from "./Pages/Roots of Equation/Secant Method";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Testclass from "./Testclass";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                    exact
                    path="/GrapicalMethod"
                    element={<GrapicalMethod />}
                />
                <Route
                    exact
                    path="/BisectionMethod"
                    element={<BisectionMethod />}
                />
                <Route
                    exact
                    path="/FalsePositionMethod"
                    element={<FalsePositionMethod />}
                />
                <Route
                    exact
                    path="/NewtonRaphsonMethod"
                    element={<NewtonRaphsonMethod />}
                />
                <Route
                    exact
                    path="/OnePointIterationMethod"
                    element={<OnePointIterationMethod />}
                />
                <Route exact path="/SecantMethod" element={<SecantMethod />} />
                <Route exact path="/Testclass" element={<Testclass />} />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
