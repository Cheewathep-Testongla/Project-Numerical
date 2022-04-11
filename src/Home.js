import { render } from "@testing-library/react";
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import "./CSS/Panel.css";
import * as Math from "mathjs";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import { cos } from "mathjs";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // API
            API: [],
            // Chapter 1
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
            CheckPush: false,
            // Chapter 2
            metA: [],
            metB: [],
            metX: [],
            X: 0,
        };
    }
    componentDidMount() {
        console.log(this.state.Chapter);
        let text = "http://localhost:3001/"
        let url = text.concat("Bisection");
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                let genExample = data.map((chapter, id) => {
                    return (
                        <div key={id}>
                            <h3> {chapter.title}</h3>
                            <p> Equation: {chapter.equation}</p>
                        </div>
                    );
                });
                this.setState({ API: genExample });
            });
    }

    Create_Graph = () => {
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
                <Line type="monotone" dataKey="result" stroke="#82ca9d" />
            </LineChart>
        );
    };

    handleChange = (event) => {
        // Get multiple input to
        // this.temp_arr = [];
        // this.setState({
        //     arr: [],
        //     CheckPush: false,
        // });
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
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

            case "Cramer's Rule":
                this.Calculation();
                break;

            case "Newton's divided-differences":
                this.Calculation();
                break;

            case "Lagrange Interpolcation":
                this.Calculation();
                break;

            default:
                return <h1>Blank</h1>;
        }
        event.preventDefault();
    };

    Convert_Eq = (Eq, Var) => {
        Eq = Eq.replace("x", Var);
        return Math.evaluate(Eq);
    };

    CheckChapter = (name) => {
        switch (name.target.name) {
            case "Bisection":
                console.log(this.state.Chapter);
                this.setState({
                    left: 0,
                    right: 0,
                    equation: "",
                    Check: true,
                    Chapter: "Bisection",
                    arr: [],
                    CheckPush: false,
                });
                this.temp_arr = [];
                break;

            case "False Position Method":
                console.log(this.state.Chapter);
                this.setState({
                    left: 0,
                    right: 0,
                    equation: "",
                    Check: true,
                    Chapter: "False Position Method",
                    arr: [],
                    CheckPush: false,
                });
                this.temp_arr = [];
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
                    CheckPush: false,
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
                    CheckPush: false,
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
                    CheckPush: false,
                });
                break;

            case "Cramer's Rule":
                // console.log("Cramer's Rule");
                this.temp_arr = [];
                this.setState({
                    Chapter: "Cramer's Rule",
                    metA: [],
                    // metX: [],
                    metB: [],
                    CheckPush: false,
                    Check: true,
                });
                break;

            case "Newton's divided-differences":
                // console.log("Newton's divided-differences");
                this.temp_arr = [];
                this.setState({
                    Chapter: "Newton's divided-differences",
                    metA: [],
                    metX: [],
                    metB: [],
                    X: 0,
                    CheckPush: false,
                    Check: true,
                });
                break;

            case "Lagrange Interpolcation":
                // console.log("Lagrange Interpolcation");
                this.temp_arr = [];
                this.setState({
                    Chapter: "Lagrange Interpolcation",
                    metA: [],
                    metX: [],
                    metB: [],
                    X: 0,
                    CheckPush: false,
                    Check: true,
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
    divided_arr = [];
    count = 0;
    temp_count = 0;
    temp = 1;
    Recursive = (index1, index2) => {
        var X = JSON.parse(this.state.metX);
        var B = JSON.parse(this.state.metB);
        var A = JSON.parse(this.state.metA);

        if (this.temp_arr.length === 0) {
            this.temp_arr.push(B[X[0] - 1]);
            this.count++;
        }

        if (index1 > 0) {
            // console.log(B[X[index1] - 1]);
            // console.log(B[X[index2] - 1]);
            // console.log(A[X[index1] - 1]);
            // console.log(A[X[index2] - 1]);
            this.temp_arr.push(
                (B[X[index1] - 1] - B[X[index2] - 1]) /
                    (A[X[index1] - 1] - A[X[index2] - 1])
            );
            this.count++;

            // console.log((B[X[index1] - 1] - B[X[index2] - 1]) / (A[X[index1] - 1] - A[X[index2] - 1]));
            if (this.count % 2 === 0 && index2 !== 0) {
                // if (this.divided_arr.length === 0) {
                //     this.divided_arr.push(this.)
                // }
                // this.divided_arr.push(
                //     (this.temp_arr[this.count] -
                //         this.temp_arr[this.count - 1]) /
                //         A[index1] -
                //         A[index2]
                // );
                // console.log(this.divided_arr);
                console.log(this.temp_arr[this.count]);
                console.log(this.temp_arr[this.count - 1]);
                console.log(A[this.count - 1]);
                console.log(A[this.count - 2]);
            }

            // if (index2 === 0) {
            //     // console.log(A[B.length - 1]);
            //     // console.log(A[index2]);

            //     this.divided_arr.map((data) => {
            //         if (this.Answer === 0) this.Answer = data;
            //         else this.Answer -= data;
            //     });

            //     this.Answer = this.Answer / A[A.length - 1] - A[0];

            //     A.map((data) => {
            //         if (this.temp_count < this.count) {
            //             this.temp *= parseFloat(this.state.X) - data;
            //             console.log(parseFloat(this.state.X) - data);
            //         }
            //     });

            //     this.Answer = this.Answer * this.temp;
            // }

            // console.log(B[X[index1] - 1], B[X[index2] - 1]);
            return this.Recursive(index1 - 1, index2 - 1);
        }
    };

    Calculation = () => {
        var total = 10;
        var L = parseFloat(this.state.left);
        var R = parseFloat(this.state.right);
        var YR = 0;
        var YM = 0;
        var X = 0;
        var Xnew = 0;
        switch (this.state.Chapter) {
            case "Bisection":
                this.temp_arr = [];

                var M = (L + R) / 2;
                YR = this.Convert_Eq(this.state.equation, R);
                YM = this.Convert_Eq(this.state.equation, M);

                while (total > this.state.Criterion) {
                    M = (L + R) / 2;
                    console.log(M);
                    this.temp_arr.push({
                        result: M,
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
                this.Answer = M;

                document.getElementById("Bisection Answer").innerHTML =
                    "Result : " + this.Answer;

                if (this.state.CheckPush === false) {
                    this.setState({
                        CheckPush: true,
                        arr: this.temp_arr,
                    });
                }
                break;

            case "False Position Method":
                this.temp_arr = [];
                console.log("FPM");

                while (total > this.state.Criterion) {
                    X =
                        (L * this.Convert_Eq(this.state.equation, R) -
                            R * this.Convert_Eq(this.state.equation, L)) /
                        (this.Convert_Eq(this.state.equation, R) -
                            this.Convert_Eq(this.state.equation, L));
                    YR = this.Convert_Eq(this.state.equation, R);
                    var YX = this.Convert_Eq(this.state.equation, X);

                    if (YX * YR < 0) {
                        total = this.Cal_Error(L, X);
                        L = X;
                    } else {
                        total = this.Cal_Error(R, X);
                        R = X;
                    }
                    this.temp_arr.push({
                        result: X.toFixed(6),
                    });
                    this.Answer = X;
                }
                document.getElementById("False Position Answer").innerHTML =
                    "Result : " + this.Answer.toFixed(6);

                if (this.state.CheckPush === false) {
                    this.setState({
                        CheckPush: true,
                        arr: this.temp_arr,
                    });
                }
                break;

            case "One Point Iteration":
                this.temp_arr = [];

                var Xold = this.state.X0;
                Xnew = 0;
                while (total > this.state.Criterion) {
                    Xnew = this.Convert_Eq(this.state.equation, Xold);
                    if (this.Cal_Error(Xold, Xnew) > this.state.Criterion) {
                        total = this.Cal_Error(Xnew, Xold);
                        Xold = Xnew;
                    } else {
                        if (this.state.CheckPush === false) {
                            this.setState({
                                CheckPush: true,
                                arr: this.temp_arr,
                            });
                        }
                        return (document.getElementById(
                            "One Point Iteration Answer"
                        ).innerHTML = "Result : " + Xold.toFixed(6));
                    }
                    this.temp_arr.push({
                        result: Xold,
                    });
                }

                break;

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
                this.temp_arr = [];

                var X0 = parseFloat(this.state.X0);
                var X1 = parseFloat(this.state.X1);
                var Distance = X1 - X0;

                while (total > this.state.Criterion) {
                    var XKnew =
                        X0 -
                        (this.Convert_Eq(this.state.equation, X0) * (X0 - X1)) /
                            (this.Convert_Eq(this.state.equation, X0) -
                                this.Convert_Eq(this.state.equation, X1));
                    total = this.Cal_Error(X0, XKnew);
                    this.temp_arr.push({
                        result: XKnew,
                    });
                    console.log(this.temp_arr);
                    X0 = XKnew;
                    X1 = XKnew + Distance;
                }

                document.getElementById("Secant Method Answer").innerHTML =
                    "Result : " + XKnew.toFixed(6);

                if (this.state.CheckPush === false) {
                    this.setState({
                        CheckPush: true,
                        arr: this.temp_arr,
                    });
                }
                break;

            case "Cramer's Rule":
                // let X = JSON.parse(JSON.stringify(this.state.metA));
                // var Xnew = JSON.parse(JSON.stringify(this.state.metA));
                // var AnsMet = JSON.parse(JSON.stringify(this.state.metB));
                X = JSON.parse(this.state.metA);
                var Xnew = JSON.parse(this.state.metA);
                var AnsMet = JSON.parse(this.state.metB);
                var count = 0;
                var Answer = [];
                // console.log(X);
                while (count < AnsMet.length) {
                    Xnew = JSON.parse(this.state.metA);
                    AnsMet = JSON.parse(this.state.metB);
                    for (let i = 0; i < X.length; i++) {
                        Xnew[i][count] = AnsMet[i];
                    }
                    Answer.push((Math.det(Xnew) / Math.det(X)).toFixed(0));
                    count++;
                }
                console.log(Answer);
                break;

            case "Newton's divided-differences":
                var X = JSON.parse(this.state.metX);

                // this.Recursive(X.length - 1, X.length - 2);
                // console.log(this.Recursive(X.length - 1, X.length - 2));
                break;

            case "Lagrange Interpolcation":
                var ANSWER = 0;
                var A = JSON.parse(this.state.metA);
                var B = JSON.parse(this.state.metB);
                var Scope = JSON.parse(this.state.metX);
                var X = parseFloat(this.state.X);
                var Upper = 1;
                var Lower = 1;
                for (let i = 0; i < Scope.length; i++) {
                    Upper = 1;
                    Lower = 1;
                    for (let j = 0; j < Scope.length; j++) {
                        if (i !== j) {
                            Upper *= A[Scope[j] - 1] - X;
                            Lower *= A[Scope[j] - 1] - A[Scope[i] - 1];
                            // console.log(A[Scope[j]-1]);
                            // console.log(Upper, Lower);
                        }
                    }
                    ANSWER += (Upper / Lower) * B[Scope[i] - 1];
                    // console.log(Upper/Lower, B[Scope[i]-1]);
                }
                console.log(ANSWER);
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
                        <div className="Test API">
                            {this.state.API}
                        </div>
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
                                {(this.temp_arr = [])}
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.equation}, {this.state.left},{" "}
                                {this.state.right}
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
                                {(this.temp_arr = [])}
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.equation}, {this.state.left},
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
                                    name="X0"
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.equation}, {this.state.X0}
                            </h1>
                            <h1 id="One Point Iteration Answer" />

                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );

            case "Secant Method":
                console.log(this.state.Chapter);
                return (
                    <div>
                        <h1>Secant Method</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Equation:{""}
                                <input
                                    id="EQ_Secant"
                                    type="text"
                                    name="equation"
                                    onChange={this.handleChange}
                                />
                                X0:{}
                                <input
                                    id="X0_Secant"
                                    type="text"
                                    name="X0"
                                    onChange={this.handleChange}
                                />
                                X1:{}
                                <input
                                    id="X1_Secant"
                                    type="text"
                                    name="X1"
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.equation}, {this.state.X0},{" "}
                                {this.state.X1}
                            </h1>
                            <h1 id="Secant Method Answer" />{" "}
                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );

            case "Cramer's Rule":
                return (
                    <div>
                        <h1>Cramer's Rule</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                metrix A:{""}
                                <input
                                    id="metA_Cramer"
                                    type="text"
                                    name="metA"
                                    onChange={this.handleChange}
                                />
                                {/* metrix X:{}
                                <input
                                    id="metX_Cramer"
                                    type="text"
                                    name="metX"
                                    onChange={this.handleChange}
                                /> */}
                                metrix B:{}
                                <input
                                    id="metB_Cramer"
                                    type="text"
                                    name="metB"
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.metA}, {this.state.metB}
                            </h1>
                            <h1 id="Cramer's Rule Answer" />{" "}
                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );

            case "Newton's divided-differences":
                return (
                    <div>
                        <h1>Newton's divided-differences</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                X :{""}
                                <input
                                    id="metA_Newtondivided"
                                    type="text"
                                    name="metA"
                                    onChange={this.handleChange}
                                />
                                Y:{}
                                <input
                                    id="metB_Newtondivided"
                                    type="text"
                                    name="metB"
                                    onChange={this.handleChange}
                                />
                                Scope:{}
                                <input
                                    id="metX_Newtondivided"
                                    type="text"
                                    name="metX"
                                    onChange={this.handleChange}
                                />
                                X_:
                                {
                                    <input
                                        id="X_Newtondivided"
                                        type="text"
                                        name="X"
                                        onChange={this.handleChange}
                                    />
                                }
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.metA}, {this.state.metB},{" "}
                                {this.state.metX}, {this.state.X}
                            </h1>
                            <h1 id="Newton's divided-differences" />{" "}
                            {/* <div>{this.Create_Graph()}</div> */}
                        </form>
                    </div>
                );

            case "Lagrange Interpolcation":
                return (
                    <div>
                        <h1>Lagrange Interpolcation</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                X :{""}
                                <input
                                    id="metA_Lagrange"
                                    type="text"
                                    name="metA"
                                    onChange={this.handleChange}
                                />
                                Y:{}
                                <input
                                    id="metB_Lagrange"
                                    type="text"
                                    name="metB"
                                    onChange={this.handleChange}
                                />
                                Scope:{}
                                <input
                                    id="metX_Lagrange"
                                    type="text"
                                    name="metX"
                                    onChange={this.handleChange}
                                />
                                X_:
                                {
                                    <input
                                        id="X_Newtondivided"
                                        type="text"
                                        name="X"
                                        onChange={this.handleChange}
                                    />
                                }
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.metA}, {this.state.metB},{" "}
                                {this.state.metX}, {this.state.X}
                            </h1>
                            <h1 id="Lagrange Interpolcation" />{" "}
                            {/* <div>{this.Create_Graph()}</div> */}
                        </form>
                    </div>
                );

            default:
                return <div>Blank</div>;
        }
    };

    render = () => {
        return (
            <>
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

                        <button
                            name="Secant Method"
                            onClick={this.CheckChapter}
                        >
                            Secant Method
                        </button>
                        <br></br>
                        <button
                            name="Cramer's Rule"
                            onClick={this.CheckChapter}
                        >
                            Cramer's Rule
                        </button>
                        <br></br>
                        <button
                            name="Newton's divided-differences"
                            onClick={this.CheckChapter}
                        >
                            Newton's divided-differences
                        </button>
                        <button
                            name="Lagrange Interpolcation"
                            onClick={this.CheckChapter}
                        >
                            Lagrange Interpolcation
                        </button>
                    </div>
                    <div className="home">
                        {this.state.Check && this.Input()}
                    </div>
                </div>
            </>
        );

    };
}
export default Home;
