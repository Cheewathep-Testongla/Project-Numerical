/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
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
            loading: true,
            // Graph
            Array_Answer: [],
            // Answer
            Matrix_Answer: [],
            // Chapter 1
            left: 0,
            right: 0,
            X0: 0,
            X1: 0,
            equation: "",
            size: 0,
            Chapter: "",
            CheckShowChapter: false,
            Criterion: 0.000001,
            // Chapter 2
            metA: [],
            metB: [],
            metX: [],
            X: 0,
            // Chapter 3
        };
    }
    tempEQ = [];
    getAPI = (Chapter) => {
        let text = "http://localhost:3001/";
        let url = text.concat(Chapter);
        // console.log(url);
        if (this.state.loading === true) {
            switch (Chapter) {
                case "Cramer_Rule":
                    fetch(url)
                        .then((resp) => resp.json())
                        .then((data) => {
                            // eslint-disable-next-line array-callback-return
                            data.map((chapter) => {
                                this.tempEQ.push(
                                    <option
                                        key={chapter.id}
                                        value={[
                                            chapter.metrixA,
                                            chapter.metrixB,
                                        ]}
                                    >
                                        {chapter.id}
                                    </option>
                                );
                            });
                            this.setState({ API: this.tempEQ });
                        });
                    this.setState({
                        loading: false,
                    });
                    break;
                case "Gauss_Elimination":
                    fetch(url)
                        .then((resp) => resp.json())
                        .then((data) => {
                            // eslint-disable-next-line array-callback-return
                            data.map((chapter) => {
                                this.tempEQ.push(
                                    <option
                                        key={chapter.id}
                                        value={[
                                            chapter.metrixA,
                                            chapter.metrixB,
                                        ]}
                                    >
                                        {chapter.metrixA}
                                    </option>
                                );
                            });
                            this.setState({ API: this.tempEQ });
                        });
                    this.setState({
                        loading: false,
                    });
                    break;
                case "Bisection":
                    fetch(url)
                        .then((resp) => resp.json())
                        .then((data) => {
                            // eslint-disable-next-line array-callback-return
                            data.map((chapter) => {
                                this.tempEQ.push(
                                    <option
                                        key={chapter.id}
                                        value={[
                                            chapter.equation,
                                            chapter.left,
                                            chapter.right,
                                        ]}
                                    >
                                        {chapter.equation}
                                    </option>
                                );
                            });
                            this.setState({ API: this.tempEQ });
                        });
                    this.setState({
                        loading: false,
                    });
                    break;
                case "False_Position":
                    fetch(url)
                        .then((resp) => resp.json())
                        .then((data) => {
                            // eslint-disable-next-line array-callback-return
                            data.map((chapter) => {
                                this.tempEQ.push(
                                    <option
                                        key={chapter.id}
                                        value={[
                                            chapter.equation,
                                            chapter.left,
                                            chapter.right,
                                        ]}
                                    >
                                        {chapter.equation}
                                    </option>
                                );
                            });
                            this.setState({ API: this.tempEQ });
                        });
                    this.setState({
                        loading: false,
                    });
                    break;
                default:
                    break;
            }
        }
    };

    Create_Graph = () => {
        return (
            <LineChart
                width={1000}
                height={600}
                data={this.state.Array_Answer}
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
        let value = event.target.value;
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

            case "False_Position":
                this.Calculation();
                break;

            case "One_Point_Iteration":
                this.Calculation();
                break;

            case "Newton_Raphson":
                this.Calculation();
                break;

            case "Secant_Method":
                this.Calculation();
                break;

            case "Cramer_Rule":
                this.Calculation();
                break;

            case "Gauss_Elimination":
                this.Calculation();
                break;

            case "Newton's_divided-differences":
                this.Calculation();
                break;

            case "Lagrange_Interpolcation":
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
        this.Answer = 0;
        this.tempEQ = [];
        this.temp_arr = [];
        switch (name.target.name) {
            case "Bisection":
                this.setState({
                    left: 0,
                    right: 0,
                    equation: "",
                    CheckShowChapter: true,
                    Chapter: "Bisection",
                    Array_Answer: [],
                    API: [],
                    loading: true,
                });
                this.temp_arr = [];
                break;

            case "False_Position":
                this.setState({
                    left: 0,
                    right: 0,
                    equation: "",
                    CheckShowChapter: true,
                    Chapter: "False_Position",
                    Array_Answer: [],
                    API: [],
                    loading: true,
                });
                break;

            case "One_Point_Iteration":
                this.setState({
                    X0: 0,
                    equation: "",
                    CheckShowChapter: true,
                    Chapter: "One_Point_Iteration",
                    Array_Answer: [],
                    loading: true,
                });
                break;

            case "Newton_Raphson_Iteration":
                this.setState({
                    X0: 0,
                    equation: "",
                    CheckShowChapter: true,
                    Chapter: "Newton_Raphson_Iteration",
                    Array_Answer: [],
                    loading: true,
                });
                break;

            case "Secant_Method":
                this.setState({
                    X0: 0,
                    X1: 0,
                    equation: "",
                    CheckShowChapter: true,
                    Chapter: "Secant_Method",
                    Array_Answer: [],
                    loading: true,
                });
                break;

            case "Cramer_Rule":
                this.setState({
                    Chapter: "Cramer_Rule",
                    metA: [],
                    metB: [],
                    X: [],
                    API: [],
                    CheckShowChapter: true,
                    loading: true,
                    Matrix_Answer: [],
                });
                break;

            case "Gauss_Elimination":
                this.setState({
                    Chapter: "Gauss_Elimination",
                    metA: [],
                    metB: [],
                    API: [],
                    CheckShowChapter: true,
                    loading: true,
                    Matrix_Answer: [],
                });
                break;

            case "Newton's_divided-differences":
                this.setState({
                    Chapter: "Newton's_divided-differences",
                    metA: [],
                    metX: [],
                    metB: [],
                    X: 0,
                    CheckShowChapter: true,
                    loading: true,
                });
                break;

            case "Lagrange_Interpolcation":
                this.setState({
                    Chapter: "Lagrange_Interpolcation",
                    metA: [],
                    metX: [],
                    metB: [],
                    X: 0,
                    CheckShowChapter: true,
                    loading: true,
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
    Answer = 0;

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

    ReplaceMatrix = (tempA, matA, index, tempB, matB) => {
        for (let i = 0; i < tempA.length; i++) {
            matA[index][i] = tempA[i];
            matB[i] = tempB[i]
        }
        this.setState({
            matA: matA,
            matB: matB,
        });
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
                this.Answer = (L + R) / 2;
                YR = this.Convert_Eq(this.state.equation, R);
                YM = this.Convert_Eq(this.state.equation, this.Answer);

                while (total > this.state.Criterion) {
                    this.Answer = (L + R) / 2;
                    this.temp_arr.push({
                        result: this.Answer,
                    });
                    YR = this.Convert_Eq(this.state.equation, R);
                    YM = this.Convert_Eq(this.state.equation, this.Answer);
                    if (YM * YR < 0) {
                        total = this.Cal_Error(this.Answer, L);
                        L = this.Answer;
                    } else {
                        total = this.Cal_Error(this.Answer, R);
                        R = this.Answer;
                    }
                }
                this.setState({
                    Array_Answer: this.temp_arr,
                });

                break;

            case "False_Position":
                while (total > this.state.Criterion) {
                    this.Answer =
                        (L * this.Convert_Eq(this.state.equation, R) -
                            R * this.Convert_Eq(this.state.equation, L)) /
                        (this.Convert_Eq(this.state.equation, R) -
                            this.Convert_Eq(this.state.equation, L));
                    YR = this.Convert_Eq(this.state.equation, R);
                    var YX = this.Convert_Eq(this.state.equation, this.Answer);

                    if (YX * YR < 0) {
                        total = this.Cal_Error(L, this.Answer);
                        L = this.Answer;
                    } else {
                        total = this.Cal_Error(R, this.Answer);
                        R = this.Answer;
                    }
                    this.temp_arr.push({
                        result: this.Answer,
                    });
                }

                this.setState({
                    Array_Answer: this.temp_arr,
                });

                break;

            case "One_Point_Iteration":
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

            // case "Newton_Raphson_Iteration":
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

            case "Secant_Method":
                this.temp_arr = [];

                var X0 = parseFloat(this.state.X0);
                var X1 = parseFloat(this.state.X1);
                var Distance = X1 - X0;
                console.log(X0);
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

                this.setState({
                    Array_Answer: this.temp_arr,
                });

                break;

            case "Cramer_Rule":
                // let X = JSON.parse(JSON.stringify(this.state.metA));
                // var Xnew = JSON.parse(JSON.stringify(this.state.metA));
                // var AnsMet = JSON.parse(JSON.stringify(this.state.metB));
                X = JSON.parse(this.state.metA);
                var Xnew = JSON.parse(this.state.metA);
                var AnsMet = JSON.parse(this.state.metB);
                var count = 0;
                var Temp = [];
                var TempAnswer = 0;
                // console.log(X);
                while (count < AnsMet.length) {
                    Xnew = JSON.parse(this.state.metA);
                    AnsMet = JSON.parse(this.state.metB);
                    for (let i = 0; i < X.length; i++) {
                        Xnew[i][count] = AnsMet[i];
                    }
                    TempAnswer = (Math.det(Xnew) / Math.det(X)).toFixed(0);
                    Temp.push(
                        <p id={TempAnswer} value={TempAnswer}>
                            X{count} : {TempAnswer}
                        </p>
                    );
                    // Answer.push((Math.det(Xnew) / Math.det(X)).toFixed(0));
                    count++;
                }
                this.setState({
                    Matrix_Answer: Temp,
                });
                break;

            case "Gauss_Elimination":
                var A = JSON.parse(this.state.metA);
                var B = JSON.parse(this.state.metB);

                var A_Before = [];
                var A_Now = [];
                var B_Before = [];
                var B_Now = [];

                var TempA = [];
                var TempB = [];

                var size = A.length;

                for (let i = 0; i < size; i++) 
                {
                    if (i === 1) 
                    {
                        for (let j = 0; j < size; j++) 
                        {
                            A = JSON.parse(this.state.metA);
                            B = JSON.parse(this.state.metB);
                            A_Before.push(A[i - 1][j] * A[i][i - 1]);
                            B_Before.push(B[i - 1] * A[i][i - 1]);

                            A = JSON.parse(this.state.metA);
                            B = JSON.parse(this.state.metB);
                            A_Now.push(A[i][j] * A[i - 1][i - 1]);
                            B_Now.push(B[i] * A[i - 1][i - 1]);

                            console.log(B_Before, B_Now);

                            TempA.push(A_Now[j] - A_Before[j]);
                            TempB.push(B_Now[j] - B_Before[j]);

                            if (j === size - 1) 
                            {
                                this.ReplaceMatrix(TempA, A, i, TempB, B);
                            }
                        }
                        console.log(B);
                    }
                    if (i > 1) 
                    {
                        var index = 0;
                        for (let k = 0; k < i; k++) 
                        {
                            var n = 0;
                            A_Before = [];
                            A_Now = [];
                            TempA = [];
                            TempB = [];
                            for (let l = 0; l < size; l++) 
                            {
                                A_Before.push(A[index][l] * A[i][index]);
                                // B_Before = B[i - 1] * A[i][i - 1];

                                A_Now.push(A[i][l] * A[index][index]);
                                // B_Now = B[i] * A[i - 1][i];

                                TempA.push(A_Now[n] - A_Before[n]);
                                // TempB.push(B_Now - B_Before);

                                if (l === size - 1) 
                                {
                                    this.ReplaceMatrix(TempA, A, i, TempB, B);
                                }
                                n++;
                            }
                            index++;
                        }
                    }
                }
                // console.log(A);
                var tempAns = 0;
                var ANS = 0;
                for (let i = size - 1; i >= 0; i--) {
                    tempAns = B[i];
                    ANS = 0;
                    for (let j = size - 1; j >= 0; j--) {
                        ANS += A[i][j];
                    }
                    break;
                    tempAns /= ANS;
                }
                console.log(B);
                break;

            case "Newton's_divided-differences":
                var X = JSON.parse(this.state.metX);

                // this.Recursive(X.length - 1, X.length - 2);
                // console.log(this.Recursive(X.length - 1, X.length - 2));
                break;

            case "Lagrange_Interpolcation":
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
                        }
                    }
                    ANSWER += (Upper / Lower) * B[Scope[i] - 1];
                }
                console.log(ANSWER);
                break;

            default:
                console.log("Null");
        }
    };

    getEquationFromAPI = (event) => {
        var splitValue = "";
        switch (this.state.Chapter) {
            case "Cramer_Rule":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                });
                break;
            case "Gauss_Elimination":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                });
                break;
            case "Bisection":
                splitValue = event.target.value.split(",");
                this.setState({
                    equation: splitValue[0],
                    left: splitValue[1],
                    right: splitValue[2],
                });
                break;
            case "False_Position":
                splitValue = event.target.value.split(",");
                this.setState({
                    equation: splitValue[0],
                    left: splitValue[1],
                    right: splitValue[2],
                });
                break;
            default:
                break;
        }
    };

    Input = () => {
        switch (this.state.Chapter) {
            case "Bisection":
                return (
                    <div>
                        <h1>Bisection Method</h1>
                        {this.getAPI(this.state.Chapter)}
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[
                                this.state.equation,
                                this.state.left,
                                this.state.right,
                            ]}
                        >
                            <option value="">Choose Example Equation</option>
                            {this.state.API}
                        </select>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Equation:
                                <input
                                    id="EQ_Bisection"
                                    type="text"
                                    name="equation"
                                    value={this.state.equation}
                                    onChange={this.handleChange}
                                ></input>
                                L:
                                <input
                                    id="L_Bisection"
                                    type="text"
                                    name="left"
                                    value={this.state.left}
                                    onChange={this.handleChange}
                                />
                                R:
                                <input
                                    id="R_Bisection"
                                    type="text"
                                    name="right"
                                    value={this.state.right}
                                    onChange={this.handleChange}
                                />
                                {(this.temp_arr = [])}
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.equation} {this.state.left}
                                {this.state.right}
                            </h1>
                            Answer : {this.Answer}
                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );

            case "False_Position":
                return (
                    <div>
                        <h1>False Position Method</h1>
                        {this.getAPI(this.state.Chapter)}
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[
                                this.state.equation,
                                this.state.left,
                                this.state.right,
                            ]}
                        >
                            <option value="">Choose Example Equation</option>
                            {this.state.API}
                        </select>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Equation:{""}
                                <input
                                    id="EQ_False_Position"
                                    type="text"
                                    name="equation"
                                    value={this.state.equation}
                                    onChange={this.handleChange}
                                />
                                L:{}
                                <input
                                    id="L_False_Position"
                                    type="text"
                                    name="left"
                                    value={this.state.left}
                                    onChange={this.handleChange}
                                />
                                R:{}
                                <input
                                    id="R_False_Position"
                                    type="text"
                                    name="right"
                                    value={this.state.right}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.equation} {this.state.left}{" "}
                                {this.state.right}
                            </h1>
                            Answer : {this.Answer}
                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );

            case "One_Point_Iteration":
                return (
                    <div>
                        <h1>One Point Iteration</h1>
                        {this.getAPI(this.state.Chapter)}
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[
                                this.state.equation,
                                this.state.left,
                                this.state.right,
                            ]}
                        >
                            <option value="">Choose Example Equation</option>
                            {this.state.API}
                        </select>
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

            case "Secant_Method":
                console.log(this.state.Chapter);
                return (
                    <div>
                        <h1>Secant Method</h1>
                        {this.getAPI(this.state.Chapter)}
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[
                                this.state.equation,
                                this.state.left,
                                this.state.right,
                            ]}
                        >
                            <option value="">Choose Example Equation</option>
                            {this.state.API}
                        </select>
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

            case "Cramer_Rule":
                return (
                    <div>
                        <h1>Cramer's Rule</h1>
                        {this.getAPI(this.state.Chapter)}
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[this.state.metA, this.state.metB]}
                        >
                            <option value="">Choose Example Equation</option>
                            {this.state.API}
                        </select>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                metrix A:
                                <input
                                    id="metA_Cramer"
                                    type="text"
                                    name="metA"
                                    value={this.state.metA}
                                    onChange={this.handleChange}
                                />
                                metrix B:
                                <input
                                    id="metB_Cramer"
                                    type="text"
                                    name="metB"
                                    value={this.state.metB}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.metA} {this.state.metB}
                            </h1>
                            Answer : {this.state.Matrix_Answer}
                        </form>
                    </div>
                );

            case "Gauss_Elimination":
                return (
                    <div>
                        <h1>Gauss Elimination Method</h1>
                        {this.getAPI(this.state.Chapter)}
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[this.state.metA, this.state.metB]}
                        >
                            <option value="">Choose Example Equation</option>
                            {this.state.API}
                        </select>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                metrix A:{""}
                                <input
                                    id="metA_GaussELi"
                                    type="text"
                                    name="metA"
                                    value={this.state.metA}
                                    onChange={this.handleChange}
                                />
                                metrix B:{}
                                <input
                                    id="metB_GaussELi"
                                    type="text"
                                    name="metB"
                                    value={this.state.metB}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.metA} {this.state.metB}
                            </h1>
                            Answer : {this.state.Matrix_Answer}
                        </form>
                    </div>
                );

            case "Newton's_divided-differences":
                return (
                    <div>
                        <h1>Newton's divided-differences</h1>
                        {this.getAPI(this.state.Chapter)}
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[
                                this.state.equation,
                                this.state.left,
                                this.state.right,
                            ]}
                        >
                            <option value="">Choose Example Equation</option>
                            {this.state.API}
                        </select>
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

            case "Lagrange_Interpolcation":
                return (
                    <div>
                        <h1>Lagrange Interpolcation</h1>
                        {this.getAPI(this.state.Chapter)}
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[
                                this.state.equation,
                                this.state.left,
                                this.state.right,
                            ]}
                        >
                            <option value="">Choose Example Equation</option>
                            {this.state.API}
                        </select>
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
                            name="False_Position"
                            onClick={this.CheckChapter}
                        >
                            False Position Method
                        </button>

                        <button
                            name="One_Point_Iteration"
                            onClick={this.CheckChapter}
                        >
                            One Point Iteration
                        </button>
                        <button
                            name="Secant_Method"
                            onClick={this.CheckChapter}
                        >
                            Secant Method
                        </button>
                        <br></br>
                        <button name="Cramer_Rule" onClick={this.CheckChapter}>
                            Cramer's Rule
                        </button>
                        <button
                            name="Gauss_Elimination"
                            onClick={this.CheckChapter}
                        >
                            Gauss Elimination
                        </button>
                        <br></br>
                        <button
                            name="Newton's_divided-differences"
                            onClick={this.CheckChapter}
                        >
                            Newton's divided-differences
                        </button>
                        <button
                            name="Lagrange_Interpolcation"
                            onClick={this.CheckChapter}
                        >
                            Lagrange Interpolcation
                        </button>
                    </div>
                    <div className="home">
                        {this.state.CheckShowChapter && this.Input()}
                    </div>
                </div>
            </>
        );
    };
}
export default Home;
