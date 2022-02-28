import { render } from "@testing-library/react";
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import "./CSS/Panel.css";
import { evaluate, quantileSeq } from "mathjs";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            left: 0,
            right: 0,
            X0: 0,
            X1: 0,
            equation: "",
            size: 0,
            Chapter: "",
            Check: false,
            Criterion: 0.000001,
            arr: [],
            CheckPush: false
        };
    }
    
    Create_Graph  = () =>
    {
        return (
            <LineChart
                width={1000}
                height={600}
                data={this.state.arr}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis />
                <YAxis />
                <Tooltip />
                <Line
                        type="monotone"
                        dataKey="result"
                        stroke="#82ca9d"
                        />
            </LineChart>    
        );
    }

    handleChange = (event) => {
        // Get multiple input to
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value,
        });
    };

    handleSubmit = (event) => {
        switch (this.state.Chapter) {
            case "Bisection":
                this.Calculation();
                break;
            case "False Position Method":
                this.Calculation();
                break;
            case "One Point Iteration":
                this.Calculation();
                break;
            case "Newton Raphson":
                this.Calculation();
                break;
            case "Secant Method":
                this.Calculation();
                break;
            default:
                return <h1>Blank</h1>;
        }
        event.preventDefault();
    };

    Convert_Eq = (Eq, Var) => 
    {
        Eq = Eq.replace("x", Var);
        return evaluate(Eq);
    };

    CheckChapter = (name) => 
    {
        switch (name.target.name) {
            case "Bisection":
                console.log("Bisection");
                this.temp_arr = [];
                this.setState({
                    left: 0,
                    right: 0,
                    equation: "",
                    Check: true,
                    Chapter: "Bisection",
                    arr: [],
                    CheckPush: false
                });
                // console.log("Bisection");
                break;

            case "False Position Method":
                console.log("False Position");
                this.temp_arr = [];
                this.setState({
                    left: 0,
                    right: 0,
                    equation: "",
                    Check: true,
                    Chapter: "False Position Method",
                    arr: [],
                    CheckPush: false
                });
                break;

            case "One Point Iteration":
                console.log("One Point Iteration");
                this.temp_arr = [];
                this.setState({
                    X0: 0,
                    equation: "",
                    Check: true,
                    Chapter: "One Point Iteration",
                    arr: [],
                    CheckPush: false
                });
                break;

            case "Newton Raphson Iteration":
                console.log("Newton Raphson Iteration");
                this.temp_arr = [];
                this.setState({
                    X0: 0,
                    equation: "",
                    Check: true,
                    Chapter: "Newton Raphson Iteration",
                    arr: [],
                    CheckPush: false
                });
                break;

            case "Secant Method":
                console.log("Secant Method");
                this.temp_arr = [];
                this.setState({
                    X0: 0,
                    X1: 0,
                    equation: "",
                    Check: true,
                    Chapter: "Secant Method",
                    arr: [],
                    CheckPush: false
                });
                break;

            default:
                console.log("default");
        }
    };

    Cal_Error = (Xold, Xnew) => {
        return Math.abs((Xnew - Xold) / Xnew);
    };

    temp_arr = [];
    Calculation = () => {
        var total = 10;
        var L = parseFloat(this.state.left);
        var R = parseFloat(this.state.right);
        var X = 0;
        switch (this.state.Chapter) {
            case "Bisection":
                this.temp_arr = [];
                var M = (L+R)/2;
                var YR = this.Convert_Eq(this.state.equation, R);
                var YM = this.Convert_Eq(this.state.equation, M);
                console.log(L," ",R," ",(L + R));
                while (total > this.state.Criterion) {
                    M = (L + R) / 2;
                    console.log(M);
                    this.temp_arr.push({
                        result: M
                    });
                    YR = this.Convert_Eq(this.state.equation, R);
                    YM = this.Convert_Eq(this.state.equation, M);
                    if (YM * YR < 0) {
                        total = this.Cal_Error(M, L);
                        L = M;
                    } else {
                        total = this.Cal_Error(M, R);
                        R = M;
                    }
                }
                document.getElementById("Bisection Answer").innerHTML =
                    "Result : " + M.toFixed(6);
                if(this.state.CheckPush === false)
                {
                    this.setState({
                        CheckPush: true,
                        arr: this.temp_arr
                    });
                }
                break;

            case "False Position Method":
                this.temp_arr = [];
                this.temp_arr.push({
                        result: M
                    });
                var Answer = 0;
                while (total > this.state.Criterion) {
                    X = (L * this.Convert_Eq(this.state.equation, R) - R * this.Convert_Eq(this.state.equation, L)) /
                        (this.Convert_Eq(this.state.equation, R) -
                            this.Convert_Eq(this.state.equation, L));
                    var YR = this.Convert_Eq(this.state.equation, R);
                    var YX = this.Convert_Eq(this.state.equation, X);

                    if (YX * YR < 0) {
                        total = this.Cal_Error(X, L);
                        L = X;
                    } else {
                        total = this.Cal_Error(X, R);
                        R = X;
                    }                    
                    Answer = X;
                    this.temp_arr.push({
                        result: X
                    });
                }
                document.getElementById("False Position Answer").innerHTML =
                    "Result : " + Answer.toFixed(6);
                if(this.state.CheckPush === false)
                {
                    this.setState({
                        CheckPush: true,
                        arr: this.temp_arr
                    });
                }
                break;

            // case "One Point Iteration":
            //     var Xold = this.state.X0;
            //     while (total > this.state.Criterion) {
            //         var Xnew = Xold - this.state.equation / Math.derivatine;
            //         if (this.Cal_Error(Xnew, X) > this.state.Criterion) {
            //             total = this.Cal_Error(Xnew, Xold);
            //             Xold = Xnew;
            //         } else {
            //             console.log(Xnew + " " + this.Cal_Error(Xnew, Xold));
            //             return Xnew.toFixed(6);
            //         }
            //         console.log(Xnew.toFixed(6));
            //     }
            //     document.getElementById(
            //         "One Point Iteration Answer"
            //     ).innerHTML = "Result : " + Xnew.toFixed(6);
            //     break;

            // case "Newton Raphson Iteration":
            //     X = this.state.X0;
            //     while (total > this.state.Criterion) {
            //         let deltaX = -((7 - Math.pow(X, 2)) / (-2 * X));
            //         let Xnew = X + deltaX;

            //         if (this.Cal_Error(Xnew, Xold) > this.state.Criterion) {
            //             total = this.Cal_Error(Xnew, Xold);
            //             X = Xnew;
            //         } else {
            //             console.log(Xnew + " " + this.Cal_Error(Xnew, Xold));
            //             return Xnew.toFixed(6);
            //         }
            //         console.log(Xnew.toFixed(6));
            //     }
            //     break;

            case "Secant Method":
                break;

            default:
                console.log("Null");
        }
    };

    Input = () => {
        switch (this.state.Chapter) {
            case "Bisection":
                return (
                    <div>
                        <h1>Bisection Method</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Equation:
                                <input
                                    id="EQ_Bisection"
                                    type="text"
                                    name="equation"
                                    onChange={this.handleChange}
                                />
                                L:
                                <input
                                    id="L_Bisection"
                                    type="text"
                                    name="left"
                                    onChange={this.handleChange}
                                />
                                R:
                                <input
                                    id="R_Bisection"
                                    type="text"
                                    name="right"
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.equation}, {this.state.left}, {this.state.right}
                            </h1>
                            <h1 id="Bisection Answer" />
                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );

            case "False Position Method":
                return (
                    <div>
                        <h1>False Position Method</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Equation:{""}
                                <input
                                    id="EQ_False_Position"
                                    type="text"
                                    name="equation"
                                    onChange={this.handleChange}
                                />
                                L:{}
                                <input
                                    id="L_False_Position"
                                    type="text"
                                    name="left"
                                    onChange={this.handleChange}
                                />
                                R:{}
                                <input
                                    id="R_False_Position"
                                    type="text"
                                    name="right"
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.equation}, {this.state.left},{" "}
                                {this.state.right}
                            </h1>
                            <h1 id="False Position Answer" />{" "}
                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );

            case "One Point Iteration":
                return (
                    <div>
                        <h1>One Point Iteration</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Equation:{""}
                                <input
                                    id="EQ_One_Point"
                                    type="text"
                                    name="equation"
                                    onChange={this.handleChange}
                                />
                                X:{}
                                <input
                                    id="X_One_Point"
                                    type="text"
                                    name="X"
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.equation}, {this.state.X}
                            </h1>
                            <h1 id="One Point Iteration Answer" />{" "}
                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );
            default:
                return <div>Blank</div>;
        }
    };

    render = () => {
        return (
            <div>
                <div className="super-header">
                    <div className="header">
                        <h1>Numerical Method</h1>
                    </div>
                </div>

                <div id="Select Chapter">
                    <button name="Bisection" onClick={this.CheckChapter}>
                        Bisection
                    </button>

                    <button
                        name="False Position Method"
                        onClick={this.CheckChapter}
                    >
                        False Position Method
                    </button>

                    <button
                        name="One Point Iteration"
                        onClick={this.CheckChapter}
                    >
                        One Point Iteration
                    </button>

                    <button name="Taylor Series" onClick={this.CheckChapter}>
                        Taylor Series
                    </button>
                </div>
                <div className="home">{this.state.Check && this.Input()}</div>
            </div>
        );
    };
}

export default Home;