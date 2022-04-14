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

import { MathJax, MathJaxContext } from "better-react-mathjax";

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
            Count_loop: 0,
            Matrix_Answer: [],
            // Chapter 1
            left: 0,
            right: 0,
            X0: 0,
            X1: 0,
            X: 0,
            equation: "",
            size: 0,
            Chapter: "",
            CheckShowChapter: false,
            Criterion: 0.000001,
            // Chapter 2
            metA: [],
            metB: [],
            metX: [],
            DisplayMatrixA: [],
            DisplayMatrixB: [],
            // Chapter 3
        };
    }

    tempEQ = [];

    Convert_Latex = (eq) => {
        try {
            return (
                <MathJax dynamic inline>
                    {"\\(" +
                        Math.parse(eq.replace(/\*/g, "")).toTex({
                            parenthesis: "keep",
                            implicit: "show",
                        }) +
                        "\\)"}
                </MathJax>
            );
        } catch (e) {
            return <MathJax dynamic>{e.toString}</MathJax>;
        }
        // console.log("("+Math.parse(eq.replace(/\r/g, "")).toTex({parenthesis: "keep", implicit: "show",}) +")");
    };

    getAPI = (Chapter) => {
        let text = "http://localhost:3001/";
        let url = text.concat(Chapter);
        // console.log(url);
        if (this.state.loading === true) {
            switch (Chapter) {
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

                case "One_Point_Iteration":
                    fetch(url)
                        .then((resp) => resp.json())
                        .then((data) => {
                            // eslint-disable-next-line array-callback-return
                            data.map((chapter) => {
                                this.tempEQ.push(
                                    <option
                                        key={chapter.id}
                                        value={[chapter.equation, chapter.X0]}
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

                case "Newton_Raphson":
                    fetch(url)
                        .then((resp) => resp.json())
                        .then((data) => {
                            // eslint-disable-next-line array-callback-return
                            data.map((chapter) => {
                                this.tempEQ.push(
                                    <option
                                        key={chapter.id}
                                        value={[chapter.equation, chapter.X0]}
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

                case "Secant_Method":
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
                                            chapter.X0,
                                            chapter.X1,
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

                case "Gauss_Jordan":
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

                case "LU_Decompost":
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

                case "Jacobi_Iteration":
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

                case "Gauss_Seidel_Iteration":
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

                case "Conjugate_Gradient":
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

            case "Gauss_Jordan":
                this.Calculation();
                break;

            case "LU_Decompost":
                this.Calculation();
                break;

            case "Jacobi_Iteration":
                this.Calculation();
                break;

            case "Gauss_Seidel_Iteration":
                this.Calculation();
                break;

            case "Conjugate_Gradient":
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
        return Math.evaluate(Eq, { x: Var });
    };

    CheckChapter = (name) => {
        this.Answer = 0;
        this.tempEQ = [];
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
                    API: [],
                    Count_loop: 0,
                    loading: true,
                });
                break;

            case "Newton_Raphson":
                this.setState({
                    X0: 0,
                    equation: "",
                    CheckShowChapter: true,
                    Chapter: "Newton_Raphson",
                    Array_Answer: [],
                    API: [],
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
                    DisplayMatrixA: [],
                    DisplayMatrixB: [],
                });
                break;

            case "Gauss_Jordan":
                this.setState({
                    Chapter: "Gauss_Jordan",
                    metA: [],
                    metB: [],
                    API: [],
                    CheckShowChapter: true,
                    loading: true,
                    Matrix_Answer: [],
                    DisplayMatrixA: [],
                    DisplayMatrixB: [],
                });
                break;

            case "LU_Decompost":
                this.setState({
                    Chapter: "LU_Decompost",
                    metA: [],
                    metB: [],
                    API: [],
                    CheckShowChapter: true,
                    loading: true,
                    Matrix_Answer: [],
                    DisplayMatrixA: [],
                    DisplayMatrixB: [],
                });
                break;

            case "Jacobi_Iteration":
                this.setState({
                    Chapter: "Jacobi_Iteration",
                    metA: [],
                    metB: [],
                    API: [],
                    CheckShowChapter: true,
                    loading: true,
                    Matrix_Answer: [],
                    DisplayMatrixA: [],
                    DisplayMatrixB: [],
                });
                break;

            case "Gauss_Seidel_Iteration":
                this.setState({
                    Chapter: "Gauss_Seidel_Iteration",
                    metA: [],
                    metB: [],
                    API: [],
                    CheckShowChapter: true,
                    loading: true,
                    Matrix_Answer: [],
                    DisplayMatrixA: [],
                    DisplayMatrixB: [],
                });
                break;

            case "Conjugate_Gradient":
                this.setState({
                    Chapter: "Conjugate_Gradient",
                    metA: [],
                    metB: [],
                    API: [],
                    CheckShowChapter: true,
                    loading: true,
                    Matrix_Answer: [],
                    DisplayMatrixA: [],
                    DisplayMatrixB: [],
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

    Answer = 0;

    ReplaceMatrix = (tempA, matA, index, tempB, matB) => {
        for (let i = 0; i < tempA.length; i++) {
            matA[index][i] = tempA[i];
        }
        matB[index] = tempB[index];
        // this.setState({
        //     metA: matA,
        //     metB: matB,
        // });
    };

    ForwardElimination = (A, B, size) => {
        var A_Before = [];
        var A_Now = [];
        var B_Before = [];
        var B_Now = [];

        // New row of Matrix A & B after calculation
        var TempA = [];
        var TempB = [];

        for (let i = 0; i < size; i++) {
            if (i === 1) {
                for (let j = 0; j < size; j++) {
                    // A = JSON.parse(this.state.metA);
                    // B = JSON.parse(this.state.metB);
                    A_Before.push(A[i - 1][j] * A[i][i - 1]);
                    B_Before.push(B[0] * A[1][0]);

                    // A = JSON.parse(this.state.metA);
                    // B = JSON.parse(this.state.metB);
                    A_Now.push(A[i][j] * A[i - 1][i - 1]);
                    B_Now.push(B[1] * A[0][0]);

                    TempA.push(A_Now[j] - A_Before[j]);
                    TempB.push(B_Now[j] - B_Before[j]);

                    if (j === size - 1) {
                        this.ReplaceMatrix(TempA, A, i, TempB, B);
                    }
                }
            }
            if (i > 1) {
                var index = 0;
                for (let k = 0; k < i; k++) {
                    var n = 0;
                    A_Before = [];
                    A_Now = [];
                    B_Before = [];
                    B_Now = [];
                    TempA = [];
                    TempB = [];
                    for (let l = 0; l < size; l++) {
                        A_Before.push(A[index][l] * A[i][index]);
                        B_Before.push(B[index] * A[i][index]);

                        A_Now.push(A[i][l] * A[index][index]);
                        B_Now.push(B[i] * A[index][index]);

                        TempA.push(A_Now[n] - A_Before[n]);
                        TempB.push(B_Now[n] - B_Before[n]);

                        if (l === size - 1) {
                            this.ReplaceMatrix(TempA, A, i, TempB, B);
                        }
                        n++;
                    }
                    index++;
                }
            }
        }
        return [A, B];
    };

    Calculation = () => {
        var total = 10;
        var L = parseFloat(this.state.left);
        var R = parseFloat(this.state.right);
        var YR = 0;
        var YM = 0;
        var X = 0;
        var Xnew = 0;
        var count = 0;
        var Final_Answer = [];

        switch (this.state.Chapter) {
            case "Bisection":
                this.Answer = (L + R) / 2;
                YR = this.Convert_Eq(this.state.equation, R);
                YM = this.Convert_Eq(this.state.equation, this.Answer);

                while (total > this.state.Criterion) {
                    this.Answer = (L + R) / 2;
                    Final_Answer.push({
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
                    Array_Answer: Final_Answer,
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
                    Final_Answer.push({
                        result: this.Answer,
                    });
                }
                this.setState({
                    Array_Answer: Final_Answer,
                });

                break;

            case "One_Point_Iteration":
                var Xold = JSON.parse(this.state.X0);

                Xnew = 0;

                while (total > this.state.Criterion) {
                    Xnew = this.Convert_Eq(this.state.equation, Xold);
                    if (this.Cal_Error(Xold, Xnew) > this.state.Criterion) {
                        total = this.Cal_Error(Xnew, Xold);
                        console.log(total);
                        Xold = Xnew;
                    } else {
                        this.setState({
                            Array_Answer: Final_Answer,
                        });
                        this.Answer = Xold;
                        break;
                    }
                    Final_Answer.push({
                        result: Xold,
                    });
                    // Count_loop++;
                }

                break;

            case "Newton_Raphson":
                Xold = JSON.parse(this.state.X0);
                while (total > this.state.Criterion) {
                    let deltaX =
                        -1 *
                        (this.Convert_Eq(this.state.equation, Xold) /
                            Math.derivative(this.state.equation, "x").evaluate({
                                x: Xold,
                            }));

                    let Xnew = Xold + deltaX;
                    Final_Answer.push({
                        result: Xnew,
                    });
                    if (this.Cal_Error(Xnew, Xold) > this.state.Criterion) {
                        total = this.Cal_Error(Xnew, Xold);
                        Xold = Xnew;
                    } else {
                        break;
                    }
                    this.Answer = Xnew;
                }
                this.setState({
                    Array_Answer: Final_Answer,
                });
                break;

            case "Secant_Method":
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
                    Final_Answer.push({
                        result: XKnew,
                    });
                    X0 = XKnew;
                    X1 = XKnew + Distance;
                }

                this.Answer = XKnew;

                this.setState({
                    Array_Answer: Final_Answer,
                });

                break;

            case "Cramer_Rule":
                X = JSON.parse(this.state.metA);
                Xnew = JSON.parse(this.state.metA);
                var AnsMet = JSON.parse(this.state.metB);
                var TempAnswer = 0;
                while (count < AnsMet.length) {
                    Xnew = JSON.parse(this.state.metA);
                    AnsMet = JSON.parse(this.state.metB);
                    for (let i = 0; i < X.length; i++) {
                        Xnew[i][count] = AnsMet[i];
                    }
                    TempAnswer = (Math.det(Xnew) / Math.det(X)).toFixed(0);
                    Final_Answer.push(
                        <p id={TempAnswer} value={TempAnswer}>
                            X{count} : {TempAnswer}
                        </p>
                    );
                    count++;
                }
                this.setState({
                    Matrix_Answer: Final_Answer,
                });
                break;

            case "Gauss_Elimination":
                // Initial Matrix A & B
                var A = JSON.parse(this.state.metA);
                var B = JSON.parse(this.state.metB);

                //Initial length of For
                var size = A.length;

                // Called function Forward Elimination
                [A, B] = this.ForwardElimination(A, B, size);
                // get divisor for each round when finding X
                var round = 0;

                // set multiplier 1 & 2 to used when finding X
                var multiplier_1 = 0;
                var multiplier_2 = 0;

                // Initila Answer (X)
                Final_Answer = JSON.parse(this.state.metB);

                // Array which used to push HTML then setstate to Matrix_Answer
                var Answer_Gauss_Elimination = [];

                var index = size - 1;

                // Backward Substitution
                for (let i = size - 1; i >= 0; i--) {
                    multiplier_1 = 0;
                    multiplier_2 = 0;
                    round = B[i];
                    for (let j = 0; j < size; j++) {
                        if (i === j) {
                            multiplier_1 += A[i][j];
                        } else {
                            multiplier_2 += Final_Answer[j] * A[i][j];
                        }
                        // console.log(multiplier_1, multiplier_2);
                        if (j === size - 1) {
                            round -= multiplier_2;
                            round /= multiplier_1;
                            Final_Answer[index] = round;

                            Answer_Gauss_Elimination.push(
                                <p id={round} value={round}>
                                    X{index} : {round}
                                </p>
                            );
                        }
                    }
                    index--;
                }

                this.setState({
                    Matrix_Answer: Answer_Gauss_Elimination,
                });
                break;

            case "Gauss_Jordan":
                A = JSON.parse(this.state.metA);
                B = JSON.parse(this.state.metB);

                //Initial length of For
                size = A.length;

                // Called function Forward Elimination
                [A, B] = this.ForwardElimination(A, B, size);

                // console.log(A, B);
                var Final_AnswerA = A;
                var Final_AnswerB = B;

                // console.log(this.state.D);
                multiplier_1 = [];
                multiplier_2 = [];

                var a = A;
                var b = B;
                index = size - 1;

                //Further Reduction
                // for (let i = size - 1; i >= 0; i--) {
                //     round = B[i];
                //     var tb = 0;
                //     for (let j = size - 1; j >= 0; j--) {
                //         if (i === j) {
                //             // Final_AnswerA[index][j] = A[i][j] / A[i][j];
                //             Final_AnswerB[index] = B[j] / A[i][j];

                //             // a[i-1][j] = a[i][j]*a[i-1][j];
                //             b[index] = b[i]*a[i-1][j];
                //             tb = b;
                //         }
                //         else{
                //             // Final_AnswerA[index][j] = Final_AnswerA[i][j] - a[i][j];
                //             Final_AnswerB[i] = Final_AnswerB[index] - tb[j];
                //             // console.log(Final_AnswerB);
                //             // console.log(Final_AnswerA);
                //         }

                //         console.log(Final_AnswerB);
                //         // console.log(A);
                //     }
                //     index--;
                // }
                break;

            case "LU_Decompost":
                break;

            case "Jacobi_Iteration":
                var A = JSON.parse(this.state.metA);
                var B = JSON.parse(this.state.metB);
                var X = JSON.parse(this.state.metB);
                var Get_Error = JSON.parse(this.state.metB);
                var Temp_Step_2 = JSON.parse(this.state.metB);
                size = X.length;

                // Initial X to be 0
                for (let i = 0; i < size; i++) {
                    X[i] = 0;
                    Get_Error[i] = 0;
                    Temp_Step_2[i] = 0;
                }

                var Step_1 = 0;
                var Step_2 = 0;

                var WhenToBreak = 0;
                while (true) {
                    Temp_Step_2 = Array(Temp_Step_2.length).fill(0);
                    WhenToBreak = 0;
                    for (let i = 0; i < size; i++) {
                        Step_2 = 0;
                        for (let j = 0; j < size; j++) {
                            if (i !== j) {
                                Step_1 += A[i][j] * X[j];
                            }
                        }
                        Step_2 = (B[i] - Step_1) / A[i][i];
                        Temp_Step_2[i] = Step_2;

                        Step_1 = 0;

                        Get_Error[i] = this.Cal_Error(X[i], Step_2);
                        if (Get_Error[i] > this.state.Criterion) {
                            WhenToBreak++;
                        }
                    }
                    X = Temp_Step_2;

                    if (WhenToBreak === 0) {
                        for (let i = 0; i < size; i++) {
                            Final_Answer.push(
                                <h1>
                                    X{i} : {X[i]}
                                </h1>
                            );
                        }

                        this.setState({
                            Matrix_Answer: Final_Answer,
                        });
                        break;
                    }
                }
                break;

            case "Gauss_Seidel_Iteration":
                var A = JSON.parse(this.state.metA);
                var B = JSON.parse(this.state.metB);
                var X = JSON.parse(this.state.metB);
                var Get_Error = JSON.parse(this.state.metB);
                var Temp_Step_2 = JSON.parse(this.state.metB);
                size = X.length;

                // Initial X to be 0
                for (let i = 0; i < size; i++) {
                    X[i] = 0;
                    Get_Error[i] = 0;
                    Temp_Step_2[i] = 0;
                }

                var Step_1 = 0;
                var Step_2 = 0;

                var WhenToBreak = 0;
                while (true) {
                    WhenToBreak = 0;
                    for (let i = 0; i < size; i++) {
                        Step_2 = 0;
                        for (let j = 0; j < size; j++) {
                            if (i !== j) {
                                Step_1 += A[i][j] * X[j];
                            }
                        }
                        Step_2 = (B[i] - Step_1) / A[i][i];
                        Temp_Step_2[i] = Step_2;

                        Step_1 = 0;

                        Get_Error[i] = this.Cal_Error(X[i], Step_2);
                        X[i] = Step_2;
                        if (Get_Error[i] > this.state.Criterion) {
                            WhenToBreak++;
                        }
                    }
                    console.log(Get_Error);
                    if (WhenToBreak === 0) {
                        for (let i = 0; i < size; i++) {
                            Final_Answer.push(
                                <h1>
                                    X{i} : {X[i]}
                                </h1>
                            );
                        }

                        this.setState({
                            Matrix_Answer: Final_Answer,
                        });
                        break;
                    }
                }
                break;

            case "Conjugate_Gradient":
                var A = JSON.parse(this.state.metA);
                var B = JSON.parse(this.state.metB);
                var X = Math.zeros(B.length);
                // console.log(A,B,X)
                for (let i = 0; i < size; i++) {
                    X[i] = 0;
                }
                var size = B.length;
                // Step_1 : R
                var Step_1 = [];
                // Step_2 : D
                var Step_2 = [];
                // Step_3 : Lambda
                var Step_3 = 0;
                // Step_4 : Xnew
                var Step_4 = [];
                // Step_5 : Rnew
                var Step_5 = [];
                // Total : Error
                var Step_6 = total;
                // Step_7 : alpha
                var Step_7 = 0;
                // Step_8 : Dnew
                var Step_8 = [];

                WhenToBreak = 0;
                var R = [];
                while (Step_6 > this.state.Criterion) {
                    if (Step_6 === total) {
                        Step_1 = Math.subtract(Math.multiply(X, A), B);
                        Step_2 = Math.multiply(Step_1, -1);
                    }
                    // Step_2 = (Math.transpose(Step_2));
                    Step_3 = Math.multiply(
                        Math.multiply(Step_1, Math.transpose(Step_2)) /
                            Math.multiply(
                                Math.multiply(Math.transpose(Step_2), A),
                                Step_2
                            ),
                        -1
                    );
                    Step_4 = Math.add(Math.multiply(Step_3, Step_2), X);
                    Step_5 = Math.subtract(Math.multiply(A, Step_4), B);
                    Step_6 = Math.sqrt(
                        Math.multiply(Math.transpose(Step_5), Step_5)
                    );
                    Step_7 =
                        Math.multiply(
                            Math.multiply(Math.transpose(Step_5), A),
                            Step_2
                        ) /
                        Math.multiply(
                            Math.multiply(Math.transpose(Step_2), A),
                            Step_2
                        );
                    Step_8 = Math.add(
                        Math.multiply(Step_5, -1),
                        Math.multiply(Step_7, Step_2)
                    );
                    Step_1 = Step_5;
                    Step_2 = Step_8;
                    X = Step_4;

                    if (WhenToBreak > 100) {
                        break;
                    }
                    WhenToBreak++;
                }
                X = JSON.parse(Step_4);
                for (let i = 0; i < size; i++) {
                    Final_Answer.push(
                        <h1>
                            X{i} : {X[i]}
                        </h1>
                    );
                }

                this.setState({
                    Matrix_Answer: Final_Answer,
                });

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

            case "One_Point_Iteration":
                splitValue = event.target.value.split(",");
                this.setState({
                    equation: splitValue[0],
                    X0: splitValue[1],
                });
                break;

            case "Newton_Raphson":
                splitValue = event.target.value.split(",");
                this.setState({
                    equation: splitValue[0],
                    X0: splitValue[1],
                });
                break;

            case "Secant_Method":
                splitValue = event.target.value.split(",");
                this.setState({
                    equation: splitValue[0],
                    X0: splitValue[1],
                    X1: splitValue[2],
                });
                break;

            case "Cramer_Rule":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                    DisplayMatrixA: splitValue[0],
                    DisplayMatrixB: splitValue[1],
                });
                break;

            case "Gauss_Elimination":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                    DisplayMatrixA: splitValue[0],
                    DisplayMatrixB: splitValue[1],
                });
                break;

            case "Gauss_Jordan":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                    DisplayMatrixA: splitValue[0],
                    DisplayMatrixB: splitValue[1],
                });
                break;

            case "LU_Decompost":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                    DisplayMatrixA: splitValue[0],
                    DisplayMatrixB: splitValue[1],
                });
                break;

            case "Jacobi_Iteration":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                    DisplayMatrixA: splitValue[0],
                    DisplayMatrixB: splitValue[1],
                });
                break;

            case "Gauss_Seidel_Iteration":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                    DisplayMatrixA: splitValue[0],
                    DisplayMatrixB: splitValue[1],
                });
                break;

            case "Conjugate_Gradient":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                    DisplayMatrixA: splitValue[0],
                    DisplayMatrixB: splitValue[1],
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
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        Your Equation :{" "}
                                        {this.Convert_Latex(
                                            this.state.equation
                                        )}{" "}
                                        <br></br>
                                        Left Boudary :{" "}
                                        {this.Convert_Latex(
                                            this.state.left
                                        )}{" "}
                                        <br></br>
                                        Right Boundary :{" "}
                                        {this.Convert_Latex(this.state.right)}
                                    </MathJax>
                                </MathJaxContext>
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
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        Your Equation :{" "}
                                        {this.Convert_Latex(
                                            this.state.equation
                                        )}{" "}
                                        <br></br>
                                        Left Boudary :{" "}
                                        {this.Convert_Latex(
                                            this.state.left
                                        )}{" "}
                                        <br></br>
                                        Right Boundary :{" "}
                                        {this.Convert_Latex(this.state.right)}
                                    </MathJax>
                                </MathJaxContext>
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
                            value={[this.state.equation, this.state.X0]}
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
                                    value={this.state.equation}
                                    onChange={this.handleChange}
                                />
                                X0:{}
                                <input
                                    id="X_One_Point"
                                    type="text"
                                    name="X0"
                                    value={this.state.X0}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.equation}, {this.state.X0}
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        Your Equation :{" "}
                                        {this.Convert_Latex(
                                            this.state.equation
                                        )}{" "}
                                        <br></br>
                                        Inital X :{" "}
                                        {this.Convert_Latex(this.state.X0)}
                                    </MathJax>
                                </MathJaxContext>
                            </h1>
                            Answer : {this.Answer}
                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );

            case "Newton_Raphson":
                return (
                    <div>
                        <h1>Newton Raphson</h1>
                        {this.getAPI(this.state.Chapter)}
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[this.state.equation, this.state.X0]}
                        >
                            <option value="">Choose Example Equation</option>
                            {this.state.API}
                        </select>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Equation:{""}
                                <input
                                    id="EQ_Newton"
                                    type="text"
                                    name="equation"
                                    value={this.state.equation}
                                    onChange={this.handleChange}
                                />
                                X0:{}
                                <input
                                    id="X0_Newton"
                                    type="text"
                                    name="X0"
                                    value={this.state.X0}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        Your Equation :{" "}
                                        {this.Convert_Latex(
                                            this.state.equation
                                        )}{" "}
                                        <br></br>
                                        Inital X :{" "}
                                        {this.Convert_Latex(this.state.X0)}
                                    </MathJax>
                                </MathJaxContext>
                            </h1>
                            Answer : {this.Answer}
                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );

            case "Secant_Method":
                return (
                    <div>
                        <h1>Secant Method</h1>
                        {this.getAPI(this.state.Chapter)}
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[
                                this.state.equation,
                                this.state.X0,
                                this.state.X1,
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
                                    value={this.state.equation}
                                    onChange={this.handleChange}
                                />
                                X0:{}
                                <input
                                    id="X0_Secant"
                                    type="text"
                                    name="X0"
                                    value={this.state.X0}
                                    onChange={this.handleChange}
                                />
                                X1:{}
                                <input
                                    id="X1_Secant"
                                    type="text"
                                    name="X1"
                                    value={this.state.X1}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        Your Equation :{" "}
                                        {this.Convert_Latex(
                                            this.state.equation
                                        )}{" "}
                                        <br></br>
                                        Inital X0 :{" "}
                                        {this.Convert_Latex(this.state.X0)}
                                        <br></br>
                                        Inital X1 :{" "}
                                        {this.Convert_Latex(this.state.X1)}
                                    </MathJax>
                                </MathJaxContext>
                            </h1>
                            Answer : {this.Answer}
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
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        MatrixA :{" "}
                                        {this.Convert_Latex(this.state.metA)}
                                        <br></br>
                                        MatrixB :{" "}
                                        {this.Convert_Latex(this.state.metB)}
                                    </MathJax>
                                </MathJaxContext>
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
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        MatrixA :{" "}
                                        {this.Convert_Latex(this.state.metA)}
                                        <br></br>
                                        MatrixB :{" "}
                                        {this.Convert_Latex(this.state.metB)}
                                    </MathJax>
                                </MathJaxContext>
                            </h1>
                            Answer : {this.state.Matrix_Answer}
                        </form>
                    </div>
                );

            case "Gauss_Jordan":
                return (
                    <div>
                        <h1>Gauss Jordan</h1>
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
                                    id="metA_GaussJor"
                                    type="text"
                                    name="metA"
                                    value={this.state.metA}
                                    onChange={this.handleChange}
                                />
                                metrix B:{}
                                <input
                                    id="metB_GaussJor"
                                    type="text"
                                    name="metB"
                                    value={this.state.metB}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        MatrixA :{" "}
                                        {this.Convert_Latex(this.state.metA)}
                                        <br></br>
                                        MatrixB :{" "}
                                        {this.Convert_Latex(this.state.metB)}
                                    </MathJax>
                                </MathJaxContext>
                            </h1>
                            Answer : {this.state.Matrix_Answer}
                        </form>
                    </div>
                );

            case "LU_Decompost":
                return (
                    <div>
                        <h1>LU Decompost</h1>
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
                                    id="metA_LU"
                                    type="text"
                                    name="metA"
                                    value={this.state.metA}
                                    onChange={this.handleChange}
                                />
                                metrix B:{}
                                <input
                                    id="metB_LU"
                                    type="text"
                                    name="metB"
                                    value={this.state.metB}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        MatrixA :{" "}
                                        {this.Convert_Latex(this.state.metA)}
                                        <br></br>
                                        MatrixB :{" "}
                                        {this.Convert_Latex(this.state.metB)}
                                    </MathJax>
                                </MathJaxContext>
                            </h1>
                            Answer : {this.state.Matrix_Answer}
                        </form>
                    </div>
                );

            case "Jacobi_Iteration":
                return (
                    <div>
                        <h1>Jacobi Iteration Method</h1>
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
                                    id="metA_Jacobi"
                                    type="text"
                                    name="metA"
                                    value={this.state.metA}
                                    onChange={this.handleChange}
                                />
                                metrix B:
                                <input
                                    id="metB_Jacobi"
                                    type="text"
                                    name="metB"
                                    value={this.state.metB}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        MatrixA :
                                        {this.Convert_Latex(this.state.metA)}
                                        <br></br>
                                        MatrixB :
                                        {this.Convert_Latex(this.state.metB)}
                                    </MathJax>
                                </MathJaxContext>
                            </h1>
                            Answer : {this.state.Matrix_Answer}
                        </form>
                    </div>
                );

            case "Gauss_Seidel_Iteration":
                return (
                    <div>
                        <h1>Gauss Seidel Iteration Method</h1>
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
                                    id="metA_Gauss_Seidel"
                                    type="text"
                                    name="metA"
                                    value={this.state.metA}
                                    onChange={this.handleChange}
                                />
                                metrix B:{}
                                <input
                                    id="metB_Gauss_Seidel"
                                    type="text"
                                    name="metB"
                                    value={this.state.metB}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        MatrixA :{" "}
                                        {this.Convert_Latex(this.state.metA)}
                                        <br></br>
                                        MatrixB :{" "}
                                        {this.Convert_Latex(this.state.metB)}
                                    </MathJax>
                                </MathJaxContext>
                            </h1>
                            Answer : {this.state.Matrix_Answer}
                        </form>
                    </div>
                );

            case "Conjugate_Gradient":
                return (
                    <div>
                        <h1>Conjugate Gradient Method"</h1>
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
                                    id="metA_Gauss_Seidel"
                                    type="text"
                                    name="metA"
                                    value={this.state.metA}
                                    onChange={this.handleChange}
                                />
                                metrix B:{}
                                <input
                                    id="metB_Gauss_Seidel"
                                    type="text"
                                    name="metB"
                                    value={this.state.metB}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        MatrixA :{" "}
                                        {this.Convert_Latex(this.state.metA)}
                                        <br></br>
                                        MatrixB :{" "}
                                        {this.Convert_Latex(this.state.metB)}
                                    </MathJax>
                                </MathJaxContext>
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
                            <MathJaxContext>
                                <MathJax dynamic>
                                    MatrixA :{" "}
                                    {this.Convert_Latex(this.state.metA)}
                                    <br></br>
                                    MatrixB :{" "}
                                    {this.Convert_Latex(this.state.metB)}
                                </MathJax>
                            </MathJaxContext>
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
                                X_:{}
                                <input
                                    id="X_Newtondivided"
                                    type="text"
                                    name="X"
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input type="submit" value="Submit" />
                            <h1>
                                {this.state.metA}, {this.state.metB},{" "}
                                {this.state.metX}, {this.state.X}
                            </h1>
                            <MathJaxContext>
                                <MathJax dynamic>
                                    MatrixA :
                                    {this.Convert_Latex(this.state.metA)}
                                    <br></br>
                                    MatrixB :
                                    {this.Convert_Latex(this.state.metB)}
                                    <br></br>
                                    MatrixX :
                                    {this.Convert_Latex(this.state.metX)}X :
                                    {this.Convert_Latex(this.state.X)}
                                </MathJax>
                            </MathJaxContext>
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
                            name="Newton_Raphson"
                            onClick={this.CheckChapter}
                        >
                            Newton_Raphson
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

                        <button name="Gauss_Jordan" onClick={this.CheckChapter}>
                            Gauss Jordan
                        </button>

                        <button name="LU_Decompost" onClick={this.CheckChapter}>
                            LU Decompost
                        </button>

                        <button
                            name="Jacobi_Iteration"
                            onClick={this.CheckChapter}
                        >
                            Jacobi Iteration
                        </button>

                        <button
                            name="Gauss_Seidel_Iteration"
                            onClick={this.CheckChapter}
                        >
                            Gauss Seidel Iteration
                        </button>

                        <button
                            name="Conjugate_Gradient"
                            onClick={this.CheckChapter}
                        >
                            Conjugate Gradient
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
