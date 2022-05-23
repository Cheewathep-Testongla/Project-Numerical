import React from "react";
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./CSS/Panel.css"
import * as Math from "mathjs";
import bcrypt from 'bcryptjs'
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    Tooltip,
    ReferenceLine,
    Brush,
} from "recharts";

import { MathJax, MathJaxContext } from "better-react-mathjax";
import { e, thomsonCrossSectionDependencies } from "mathjs";
import { compileString } from "sass";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Token
            Account: (<h4 class="text">Guest User</h4>),
            // PostData: [<button onChange={this.UploadData}>Upload Equation</button>],
            HTML:   (<form className="Login" onSubmit={this.GetToken}>
                        <div>Username</div>
                        <input className="Input-Login" id="UserName" type="text" name="UserName" onChange={this.handleChange}></input>
                        <div>Password</div>
                        <input className="Input-Login" id="Password" type="text" name="Password" onChange={this.handleChange}></input>
                        <br></br>
                        <input type="submit" value="Submit"/>
                    </form>
                    ),
            HaveToken: false,
            UserName: '',
            Password: '',
            //Manual Input
            ManualInput: false,
            // API
            DataFromAPI: [],
            GetDataFirstTime: true,
            // Graph
            Array_Answer: [],
            // Answer
            Matrix_Answer: [],
            Actual_Answer: 0,
            ProveAnswer: [],
            // Chapter 1
            left: 0,
            right: 0,
            X0: 0,
            X1: 0,
            X: 0,
            equation: "",
            Chapter: "",
            Criterion: 0.000001,
            // Chapter 2
            metA: [],
            metB: [],
            metX: [],
            row: 0,
            column: 0,
            // Chapter 3
            // Used metX from Chapter 2
            metY: [],
            Size: 0,
            Scope: 0,
            // Chapter 4
            // Used X1 from Chapter 1 AND metX from Chapter 2 AND metY, Size from Chapter 3
            met1: [],
            met2: [],
            met3: [],
            X2: 0,
            X3: 0,
            // Chapter 5
            Upper: 0,
            Lower: 0,
            ExactAnswer: 0,
            Error: 0,
            Order: "",
            FormulaForDiff: "",
            ModeForDiff: "",
            h: 0,
        };
    }

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
    };

    Create_Graph = () => {
        return (
            <LineChart
                className="center"
                width={800}
                height={400}
                data={this.state.Array_Answer}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                {/* Show Grid */}
                <CartesianGrid stroke="black" strokeDasharray="0.1 0.1" />
                <XAxis dataKey="X" />
                {/* Display Value of each dots */}
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="Graph"
                    stroke="blue"
                    dot={false}
                />
                <ReferenceLine x={0} stroke="red" />
                <ReferenceLine y={0} stroke="red" />
                <ReferenceLine
                    x={this.state.Actual_Answer}
                    label={{ value: this.state.Actual_Answer, fill: "red", top: 50 }}
                    stroke="green"
                />
                {/* <ReferenceLine x={this.state.left.toFixed(2)} stroke="blue" />
                <ReferenceLine x={this.state.right.toFixed(2)} stroke="blue" /> */}
                <Brush fill="rgb(255, 100, 0)" />
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

    toggleSwitch = () => {
        if (this.state.ManualInput) {
            this.setState({
                ManualInput: !this.state.ManualInput,
                metA: [],
                metB: [],
                X: [],
                metX: [],
                metY: [],
                Scope: [],
                row: 0,
                column: 0,
                Matrix_Answer: [],
            });
        } else {
            this.setState({
                ManualInput: !this.state.ManualInput,
                metA: [],
                metB: [],
                X: [],
                metX: [],
                metY: [],
                Scope: [],
                row: 0,
                column: 0,
                Matrix_Answer: [],
            });
        }
    };

    // If User want to Input Matrix by themself
    GetInputMatrix = false;
    CheckEveryInput = true;

    GetDataFromManualInput = () => {
        console.log(this.state.metA, this.state.metB, this.state.metX);
        this.CheckEveryInput = true;
        if (this.GetInputMatrix === true) {
            if(this.state.Chapter === "Lagrange_Interpolation")
            {
                // Get Data from Input Table
                var TempMatrixX = [];
                var TempMatrixY = [];
                try {
                    for (let i = 0; i < this.state.Size; i++) {
                        if (document.getElementById("X"+i.toString()).value === "" || 
                            document.getElementById("Y"+i.toString()).value === "" ) {
                            this.CheckEveryInput = false;
                            alert("Please Enter Every fields!!!");
                            break;
                        }
                        TempMatrixX.push(
                            JSON.parse(document.getElementById("X"+i.toString()).value
                            )
                        );
                        TempMatrixY.push(
                            JSON.parse(document.getElementById("Y"+i.toString()).value
                            )
                        );
                    }
                    // Fix setstate Delay
                    if(this.state.metX === [])
                    {
                        alert("You want to submit your data?");
                    }
                    else if(this.state.metX !== JSON.stringify(TempMatrixX) || this.state.metY !== JSON.stringify(TempMatrixY))
                    {
                        alert("You want to submit your data?");
                        this.setState({
                            metX: JSON.stringify(TempMatrixX),
                            metY: JSON.stringify(TempMatrixY)
                        });
                        return ;
                    }
                    else if(this.state.metX === JSON.stringify(TempMatrixX) && this.state.metY === JSON.stringify(TempMatrixY))
                    {
                        this.Calculation();
                        return ;
                    }
                } catch(e) {}
            }
            
            else if(this.state.Chapter === "Cramer_Rule" || 
                this.state.Chapter === "Gauss_Elimination" ||
                this.state.Chapter === "Gauss_Jordan" ||
                this.state.Chapter === "LU_Decompost")
            {
                // Get Data from Input Table
                var TempMatrixA = [];
                var GetMatrixBFromTable = [];
                try {
                    for (let i = 0; i < this.state.row; i++) {
                        for (let j = 0; j < this.state.column; j++) {
                            if (
                                document.getElementById(i.toString() + j.toString())
                                    .value === "" ||
                                document.getElementById("B"+j.toString()).value === ""
                            ) {
                                this.CheckEveryInput = false;
                                alert("Please Enter Every fields!!!");
                                break;
                            }
                            TempMatrixA.push(
                                JSON.parse(
                                    document.getElementById(
                                        i.toString() + j.toString()
                                    ).value
                                )
                            );
                        }
                        if (document.getElementById(i.toString()).value === "") {
                            break;
                        } else {
                            GetMatrixBFromTable.push(
                                JSON.parse(
                                    document.getElementById("B"+i.toString()).value
                                )
                            );
                        }
                    }
                    var GetMatrixAFromTable = [];
                    while (TempMatrixA.length)
                        GetMatrixAFromTable.push(
                            TempMatrixA.splice(0, this.state.column)
                        );
                    if(this.state.metA === [])
                    {
                        alert("Do you want to submit your data?");
                    }
                    else if(this.state.metA !== JSON.stringify(GetMatrixAFromTable) || this.state.metB !== JSON.stringify(GetMatrixBFromTable))
                    {
                        alert("Do you want to submit your data?");
                        this.setState({
                            metA: JSON.stringify(GetMatrixAFromTable),
                            metB: JSON.stringify(GetMatrixBFromTable)
                        });
                        return ;
                    }
                    else if(this.state.metA === JSON.stringify(GetMatrixAFromTable) && this.state.metB === JSON.stringify(GetMatrixBFromTable))
                    {
                        this.Calculation();
                        return ;
                    }
                } catch(e) {}
            }

            else if(this.state.Chapter === "Jacobi_Iteration" || 
            this.state.Chapter === "Gauss_Seidel_Iteration" ||
            this.state.Chapter === "Conjugate_Gradient")
            {
            // Get Data from Input Table
            var TempMatrixA = [];
            var GetMatrixBFromTable = [];
            var GetMatrixXFromTable = [];
            try {
                for (let i = 0; i < this.state.row; i++) {
                    for (let j = 0; j < this.state.column; j++) {
                        if (
                            document.getElementById(i.toString() + j.toString()).value === "" ||
                            document.getElementById("B"+j.toString()).value === "" ||
                            document.getElementById("X"+j.toString()).value === ""
                        ) {
                            this.CheckEveryInput = false;
                            alert("Please Enter Every fields!!!");
                            break;
                        }
                        TempMatrixA.push(
                            JSON.parse(
                                document.getElementById(
                                    i.toString() + j.toString()
                                ).value
                            )
                        );
                    }
                    GetMatrixBFromTable.push(
                        JSON.parse(
                            document.getElementById("B"+i.toString()).value
                        )
                    );
                    GetMatrixXFromTable.push(
                        JSON.parse(
                            document.getElementById("X"+i.toString()).value
                        )
                    );
                }
                var GetMatrixAFromTable = [];
                while (TempMatrixA.length)
                    GetMatrixAFromTable.push(
                        TempMatrixA.splice(0, this.state.column)
                    );
                console.log(GetMatrixXFromTable);
                if(this.state.metA === [] || this.state.metB === [] || this.state.metX === [] )
                {
                    alert("Do you want to submit your data?");
                }
                else if(this.state.metA !== JSON.stringify(GetMatrixAFromTable) || 
                this.state.metB !== JSON.stringify(GetMatrixBFromTable) || 
                this.state.metX !== JSON.stringify(GetMatrixXFromTable))
                {
                    alert("Do you want to submit your data?");
                    this.setState({
                        metA: JSON.stringify(GetMatrixAFromTable),
                        metB: JSON.stringify(GetMatrixBFromTable),
                        metX: JSON.stringify(GetMatrixXFromTable)
                    });
                    return ;
                }
                else if(this.state.metA === JSON.stringify(GetMatrixAFromTable) && 
                        this.state.metB === JSON.stringify(GetMatrixBFromTable) && 
                        this.state.metX === JSON.stringify(GetMatrixXFromTable))
                {
                    this.Calculation();
                    return ;
                }
            } catch(e) {}
        }
            else if(this.state.Chapter === "Linear_Regression" || this.state.Chapter === "Polynomial_Regression")
            {
                // Get Data from Input Table
                var TempMatrixX = [];
                var TempMatrixY = [];
                try {
                    for (let i = 0; i < this.state.Size; i++) {
                        if (document.getElementById("X"+i.toString()).value === "" || 
                            document.getElementById("Y"+i.toString()).value === "" ) {
                            this.CheckEveryInput = false;
                            alert("Please Enter Every fields!!!");
                            break;
                        }
                        TempMatrixX.push(
                            JSON.parse(document.getElementById("X"+i.toString()).value
                            )
                        );
                        TempMatrixY.push(
                            JSON.parse(document.getElementById("Y"+i.toString()).value
                            )
                        );
                    }
                    // Fix setstate Delay
                    if(this.state.metX === [])
                    {
                        alert("Do you want to submit your data?");
                    }
                    else if(this.state.metX !== JSON.stringify(TempMatrixX) || this.state.metY !== JSON.stringify(TempMatrixY))
                    {
                        alert("Do you want to submit your data?");
                        this.setState({
                            metX: JSON.stringify(TempMatrixX),
                            metY: JSON.stringify(TempMatrixY)
                        });
                        return ;
                    }
                    else if(this.state.metX === JSON.stringify(TempMatrixX) && this.state.metY === JSON.stringify(TempMatrixY))
                    {
                        this.Calculation();
                        return ;
                    }
                } catch(e) {}
            }

            else if(this.state.Chapter === "Multiple_Linear_Regression")
            {
                // Get Data from Input Table
                var TempMatrixX1 = [];
                var TempMatrixX2 = [];
                var TempMatrixX3 = [];
                var TempMatrixY = [];
                
                // try {
                    for(let i = 1; i < 4; i++)
                    {
                        for (let j = 0; j < this.state.Size; j++) {
                            if (document.getElementById("X"+i.toString()+j.toString()).value === "" || 
                                document.getElementById("Y"+i.toString()).value === "" ) {
                                this.CheckEveryInput = false;
                                alert("Please Enter Every fields!!!");
                                break;
                            }
                            if(i === 1)
                            {
                                TempMatrixX1.push(
                                    JSON.parse(document.getElementById("X"+i.toString()+j.toString()).value
                                    )
                                );
                            }
                            if(i === 2)
                            {
                                TempMatrixX2.push(
                                    JSON.parse(document.getElementById("X"+i.toString()+j.toString()).value
                                    )
                                );
                            }
                            else if(i === 3)
                            {
                                TempMatrixX3.push(
                                    JSON.parse(document.getElementById("X"+i.toString()+j.toString()).value
                                    )
                                );
                            }
                           
                        }
                    }
                    for (let i = 0; i < this.state.Size; i++) {
                        TempMatrixY.push(
                            JSON.parse(document.getElementById("Y"+i.toString()).value
                            )
                        );
                    }
                    // Fix setstate Delay

                    if(this.state.met1 === [] || this.state.met2 === [] || this.state.met3 === [] || this.state.metY === [])
                    {
                        alert("Do you want to submit your data?");
                    }
                    else if(this.state.met1 !== JSON.stringify(TempMatrixX1) ||
                            this.state.met2 !== JSON.stringify(TempMatrixX2) ||
                            this.state.met3 !== JSON.stringify(TempMatrixX3) || 
                            this.state.metY !== JSON.stringify(TempMatrixY))
                    {
                        alert("Do you want to submit your data?");
                        this.setState({
                            met1: JSON.stringify(TempMatrixX1),
                            met2: JSON.stringify(TempMatrixX2),
                            met3: JSON.stringify(TempMatrixX3),
                            metY: JSON.stringify(TempMatrixY)
                        });
                        return ;
                    }
                    else if(this.state.met1 === JSON.stringify(TempMatrixX1) && 
                            this.state.met2 === JSON.stringify(TempMatrixX2) &&
                            this.state.met3 === JSON.stringify(TempMatrixX3) &&
                            this.state.metY === JSON.stringify(TempMatrixY))
                    {
                        this.Calculation();
                        return ;
                    }
                // } catch(e) {}
            }
        }
        this.Calculation();  
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.equation !== "" || this.state.metA !== [] || this.state.metX !== [])
        {
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
                    this.GetDataFromManualInput();
                    break;
    
                case "Gauss_Elimination":
                    this.GetDataFromManualInput();
                    break;
    
                case "Gauss_Jordan":
                    // this.GetDataFromManualInput();
                    break;
    
                case "LU_Decompost":
                    // this.GetDataFromManualInput();
                    break;
    
                case "Jacobi_Iteration":
                    this.GetDataFromManualInput();
                    break;
    
                case "Gauss_Seidel_Iteration":
                    this.GetDataFromManualInput();
                    break;
    
                case "Conjugate_Gradient":
                    this.GetDataFromManualInput();
                    break;
    
                case "Newton's_divided-differences":
                    this.Calculation();
                    break;
    
                case "Lagrange_Interpolation":
                    this.GetDataFromManualInput();
                    break;
    
                case "Linear_Regression":
                    this.GetDataFromManualInput();
                    break;
                    
                case "Polynomial_Regression":
                    this.GetDataFromManualInput();
                    break;
    
                case "Multiple_Linear_Regression":
                    this.GetDataFromManualInput();
                    break;
                
                case "Single_Trapezoidal_Rule":
                    this.Calculation();
                    break;  

                case "Composite_Trapezoidal_Rule":
                    this.Calculation();
                    break;   

                case "Simpson_Rule":
                    this.Calculation();
                    break;   

                case "Composite_Simpson_Rule":
                    this.Calculation();
                    break; 
                          
                case "Numerical_Differentiation":
                    if(this.state.equation === "" || this.state.ModeForDiff === "" || this.state.FormulaForDiff === "" ||
                        this.state.X === 0 || this.state.h === 0)
                    {
                        alert("Please Enter every input!!!");
                    }
                    else
                    {
                        this.Calculation();
                    }
                    break;   

                default:
                    return <h1>Blank</h1>;
            }
            event.preventDefault();
        }
    };

    Convert_Eq = (Eq, Var) => {
        return Math.evaluate(Eq, { x: Var });
    };

    CheckChapter = (event) => {
        console.log(event.target.id)
        switch (event.target.id) {
            case "Bisection":
                this.setState({
                    left: 0,
                    right: 0,
                    equation: "",
                    Chapter: "Bisection",
                    Array_Answer: [],
                    Actual_Answer: 0,
                    ProveAnswer: []
                });
                break;

            case "False_Position":
                this.setState({
                    left: 0,
                    right: 0,
                    equation: "",
                    Chapter: "False_Position",
                    Array_Answer: [],
                    Actual_Answer: 0,
                    ProveAnswer: []
                });
                break;

            case "One_Point_Iteration":
                this.setState({
                    X0: 0,
                    equation: "",
                    Chapter: "One_Point_Iteration",
                    Array_Answer: [],
                    Actual_Answer: 0,
                    ProveAnswer: []
                });
                break;

            case "Newton_Raphson":
                this.setState({
                    X0: 0,
                    equation: "",
                    Chapter: "Newton_Raphson",
                    Array_Answer: [],
                    Actual_Answer: 0,
                    ProveAnswer: []
                });
                break;

            case "Secant_Method":
                this.setState({
                    X0: 0,
                    X1: 0,
                    equation: "",
                    Chapter: "Secant_Method",
                    Array_Answer: [],
                    Actual_Answer: 0,
                    ProveAnswer: []
                });
                break;

            case "Cramer_Rule":
                this.setState({
                    Chapter: "Cramer_Rule",
                    metA: [],
                    metB: [],
                    X: [],
                    row: 0,
                    column: 0,
                    Matrix_Answer: [],
                    ProveAnswer: []
                });
                break;

            case "Gauss_Elimination":
                this.setState({
                    Chapter: "Gauss_Elimination",
                    metA: [],
                    metB: [],
                    row: 0,
                    column: 0,
                    Matrix_Answer: [],
                    ProveAnswer: []
                });
                break;

            case "Gauss_Jordan":
                this.setState({
                    Chapter: "Gauss_Jordan",
                    metA: [],
                    metB: [],
                    row: 0,
                    column: 0,
                    Matrix_Answer: [],
                    ProveAnswer: []
                });
                break;

            case "LU_Decompost":
                this.setState({
                    Chapter: "LU_Decompost",
                    metA: [],
                    metB: [],
                    row: 0,
                    column: 0,
                    Matrix_Answer: [],
                    ProveAnswer: []
                });
                break;

            case "Jacobi_Iteration":
                this.setState({
                    Chapter: "Jacobi_Iteration",
                    metA: [],
                    metB: [],
                    row: 0,
                    column: 0,
                    Matrix_Answer: [],
                    ProveAnswer: []
                });
                break;

            case "Gauss_Seidel_Iteration":
                this.setState({
                    Chapter: "Gauss_Seidel_Iteration",
                    metA: [],
                    metB: [],
                    row: 0,
                    column: 0,
                    Matrix_Answer: [],
                    ProveAnswer: []
                });
                break;

            case "Conjugate_Gradient":
                this.setState({
                    Chapter: "Conjugate_Gradient",
                    metA: [],
                    metB: [],
                    row: 0,
                    column: 0,
                    loading: true,
                    Matrix_Answer: [],
                    ProveAnswer: []
                });
                break;

            case "Newton's_divided-differences":
                this.setState({
                    Chapter: "Newton's_divided-differences",
                    metA: [],
                    metX: [],
                    metB: [],
                    X: 0,
                    Actual_Answer: 0,
                    Matrix_Answer: [],
                    ProveAnswer: []
                });
                break;

            case "Lagrange_Interpolation":
                this.setState({
                    Chapter: "Lagrange_Interpolation",
                    metX: [],
                    metY: [],
                    Scope: [],
                    X: 0,
                    Actual_Answer: 0,
                    Matrix_Answer: [],
                    ProveAnswer: []
                });
                break;

            case "Linear_Regression":
                this.setState({
                    Chapter: "Linear_Regression",
                    metX: [],
                    metY: [],
                    X: 0,
                    equation: "a0+(a1*x)",
                    Matrix_Answer: [],
                    ProveAnswer: []
                });
                break;

            case "Polynomial_Regression":
                this.setState({
                    Chapter: "Polynomial_Regression",
                    metX: [],
                    metY: [],
                    X: 0,
                    equation: "a0+(a1*x)+(a2*(x^2))",
                    Matrix_Answer: [],
                    ProveAnswer: []
                });
                break;

            case "Multiple_Linear_Regression":
                this.setState({
                    Chapter: "Multiple_Linear_Regression",
                    met1: [],
                    met2: [],
                    met3: [],
                    metY: [],
                    X1: 0,
                    X2: 0,
                    X3: 0,
                    equation: "a0+(a1*x1)+(a2*x2)+(a3*x3))",
                    Matrix_Answer: [],
                    ProveAnswer: []
                });
                break;

            case "Single_Trapezoidal_Rule":
                this.setState({
                    Chapter: "Single_Trapezoidal_Rule",
                    equation: "",
                    Upper: 0,
                    Lower: 0,
                    ExactAnswer: 0,
                    Actual_Answer: 0,
                    Error: 0,
                    ProveAnswer: []
                })
                break;

            case "Composite_Trapezoidal_Rule":
                this.setState({
                    Chapter: "Composite_Trapezoidal_Rule",
                    equation: "",
                    Scope: [],
                    Upper: 0,
                    Lower: 0,
                    ExactAnswer: 0,
                    Actual_Answer: 0,
                    Error: 0,
                    ProveAnswer: []
                })
                break;

            case "Simpson_Rule":
                this.setState({
                    Chapter: "Simpson_Rule",
                    equation: "",
                    Upper: 0,
                    Lower: 0,
                    ExactAnswer: 0,
                    Actual_Answer: 0,
                    Error: 0,
                    ProveAnswer: []
                })
                break;

            case "Composite_Simpson_Rule":
                this.setState({
                    Chapter: "Composite_Simpson_Rule",
                    equation: "",
                    Scope: [],
                    Upper: 0,
                    Lower: 0,
                    ExactAnswer: 0,
                    Actual_Answer: 0,
                    Error: 0,
                    ProveAnswer: []
                })
                break;
            
            case "Numerical_Differentiation":
                this.setState({
                    Chapter: "Numerical_Differentiation",
                    equation: "",
                    X: 0,
                    h: 0,
                    Order: "",
                    ModeForDiff: "",
                    FormulaForDiff: "",
                    ExactAnswer: 0,
                    Error: 0
                })
                break;

            default:
                console.log("default");
        }
    };
    //*** Part Calculation ***//
    Cal_Error = (Xold, Xnew) => {
        return Math.abs((Xnew - Xold) / Xnew);
    };

    ReplaceMatrix = (tempA, matA, index, tempB, matB) => {
        for (let i = 0; i < tempA.length; i++) {
            matA[index][i] = tempA[i];
        }
        matB[index] = tempB[index];
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

    test1 = [];

    // Get Final Answer from function Answer //
    Answer = 0;

    Calculation = () => {
        var total = 10;
        var L = parseFloat(this.state.left);
        var R = parseFloat(this.state.right);
        var YR = 0;
        var YM = 0;
        var X = [];
        var Xnew = [];
        var count = 0;
        var Final_Answer = [];
        var Prove_Answer = "";
        this.Answer = 0;

        // var Answer_Show_Table = [];
        switch (this.state.Chapter) {
            case "Bisection":
                this.Answer = (L + R) / 2;
                YR = this.Convert_Eq(this.state.equation, R);
                YM = this.Convert_Eq(this.state.equation, this.Answer);

                while (total > this.state.Criterion) {
                    this.Answer = (L + R) / 2;
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
                // Push Boundary & Answer of Equation
                for (let i = -20; i <= 20; i++) {
                    if (this.Answer > i - 1 && this.Answer < i) {
                        // Final_Answer.push({
                        //     Graph: this.Convert_Eq(this.state.equation, this.state.left),
                        //     X: this.state.left,
                        // });
                        Final_Answer.push({
                            Graph: this.Convert_Eq(
                                this.state.equation,
                                this.Answer
                            ),
                            X: this.Answer,
                        });
                        // Final_Answer.push({
                        //     Graph: this.Convert_Eq(this.state.equation, this.state.right),
                        //     X: this.state.right,
                        // });
                    }
                    Final_Answer.push({
                        Graph: this.Convert_Eq(this.state.equation, i),
                        X: i,
                    });
                }
                // console.log(this.Answer.toFixed2));
                this.setState({
                    ProveAnswer: (
                        <div>
                            <h1>
                                Equation: {(this.state.equation)}
                            </h1>
                            <h1>Replace x with {this.Answer}</h1>
                            <h1>
                                {this.state.equation.replace(/x/g,this.Answer)+"="
                                +this.Convert_Eq(this.state.equation, this.Answer)}
                            </h1>
                        </div>
                        ),
                    Array_Answer: Final_Answer,
                    Actual_Answer: this.Answer
                });
                // this.generateAnswerTable(Answer_Show_Table);

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
                    count++;
                }
                for (let i = -150; i <= 150; i++) {
                    Final_Answer.push({
                        Graph: this.Convert_Eq(this.state.equation, i),
                        // Y: i,
                        X: i,
                    });
                }

                this.setState({
                    Array_Answer: Final_Answer,
                    Actual_Answer: this.Answer,
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
                        for (let i = -150; i <= 150; i++) {
                            Final_Answer.push({
                                Graph: this.Convert_Eq(this.state.equation, i),
                                X: i,
                            });
                        }
                        this.setState({
                            Array_Answer: Final_Answer,
                            Actual_Answer: this.Answer,
                        });
                        this.Answer = Xold;
                        break;
                    }
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

                    if (this.Cal_Error(Xnew, Xold) > this.state.Criterion) {
                        total = this.Cal_Error(Xnew, Xold);
                        Xold = Xnew;
                    } else {
                        break;
                    }
                    this.Answer = Xnew;
                }

                for (let i = -150; i <= 150; i++) {
                    Final_Answer.push({
                        Graph: this.Convert_Eq(this.state.equation, i),
                        // Y: i,
                        X: i,
                    });
                }

                this.setState({
                    Array_Answer: Final_Answer,
                    Actual_Answer: this.Answer
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
                    X0 = XKnew;
                    X1 = XKnew + Distance;
                }

                this.Answer = XKnew;

                for (let i = -150; i <= 150; i++) {
                    Final_Answer.push({
                        Graph: this.Convert_Eq(this.state.equation, i),
                        // Y: i,
                        X: i,
                    });
                }

                this.setState({
                    Array_Answer: Final_Answer,
                    Actual_Answer: this.Answer,
                });

                break;

            case "Cramer_Rule":
                try {
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
                        this.test1.push(TempAnswer);
                    }
                    for (let i = 0; i < AnsMet.length; i++) {
                        var a = 0;
                        for (let j = 0; j < AnsMet.length; j++) {
                            a += X[i][j] * this.test1[j];
                        }
                    }
                    this.setState({
                        Matrix_Answer: Final_Answer,
                    });
                } catch {}
                break;

            case "Gauss_Elimination":
                try {
                    // Initial Matrix A & B
                    var A = JSON.parse(this.state.metA);
                    var B = JSON.parse(this.state.metB);
                    console.log(A);
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
                }
                catch(e) {}
                break;

            case "Gauss_Jordan":
                try
                {
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
                }
                catch(e) {};
                break;

            case "LU_Decompost":
                try
                {

                }
                catch(e) {};
                break;

            case "Jacobi_Iteration":
                try
                {
                    var A = JSON.parse(this.state.metA);
                    var B = JSON.parse(this.state.metB);
    
                    // Initial X to be 0
                    var X = JSON.parse(this.state.metB);
                    var Get_Error = JSON.parse(this.state.metB);
                    var Temp_Step_2 = JSON.parse(this.state.metB);
    
                    for (let i = 0; i < B.length; i++) {
                        X[i] = 0;
                        Get_Error[i] = 0;
                        Temp_Step_2[i] = 0;
                    }
    
                    size = X.length;
    
                    var Step_1 = 0;
                    var Step_2 = 0;
    
                    var WhenToBreak = 0;
                    while (true) {
                        Temp_Step_2 = Math.zeros(B.length);
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
                            break;
                        }
                        this.setState({
                            Matrix_Answer: Final_Answer,
                        });
                    }
                }
                catch(e) {};
                break;

            case "Gauss_Seidel_Iteration":
                try
                {
                    var A = JSON.parse(this.state.metA);
                    var B = JSON.parse(this.state.metB);
    
                    var X = JSON.parse(this.state.metB);
                    var Get_Error = JSON.parse(this.state.metB);
                    // Initial X to be 0
    
                    for (let i = 0; i < B.length; i++) {
                        X[i] = 0;
                        Get_Error[i] = 0;
                    }
    
                    size = X.length;
    
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
                            // Temp_Step_2[i] = Step_2;
    
                            Step_1 = 0;
    
                            Get_Error[i] = this.Cal_Error(X[i], Step_2);
                            X[i] = Step_2;
                            if (Get_Error[i] > this.state.Criterion) {
                                WhenToBreak++;
                            }
                        }
                        if (WhenToBreak === 0) {
                            for (let i = 0; i < size; i++) {
                                Final_Answer.push(
                                    <h1>
                                        X{i} : {X[i]}
                                    </h1>
                                );
                            }
                            break;
                        }
                    }
                    this.setState({
                        Matrix_Answer: Final_Answer,
                    });
                }
                catch(e) {};
                break;

            case "Conjugate_Gradient":
                try
                {
                    var A = JSON.parse(this.state.metA);
                    var B = JSON.parse(this.state.metB);
                    var X = JSON.parse(this.state.metX);
                    // console.log(A,B,X)
    
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
    
                    while (Step_6 > this.state.Criterion) {
                        if (Step_6 === total) {
                            Step_1 = Math.subtract(Math.multiply(X, A), B);
                            Step_2 = Math.multiply(Step_1, -1);
                        }
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
                    }
    
                    X = Step_4;
    
                    for (let i = 0; i < B.length; i++) {
                        Final_Answer.push(
                            <h1>
                                X{i} : {X[i]}
                            </h1>
                        );
                    }
    
                    this.setState({
                        Matrix_Answer: Final_Answer,
                    });
    
                }
                catch(e) {};
                break;

            case "Newton's_divided-differences":
                var X = JSON.parse(this.state.metX);

                // this.Recursive(X.length - 1, X.length - 2);
                // console.log(this.Recursive(X.length - 1, X.length - 2));
                break;

            case "Lagrange_Interpolation":
                // console.log(this.state.metX);
                try{
                    var metX = JSON.parse(this.state.metX);
                    var metY = JSON.parse(this.state.metY);
                    var Scope = JSON.parse(this.state.Scope);
                    var X = parseFloat(this.state.X);
                    var Upper = 1;
                    var Lower = 1;
                    console.log(metX);
                    for (let i = 0; i < Scope.length; i++) {
                        Upper = 1;
                        Lower = 1;
                        for (let j = 0; j < Scope.length; j++) {
                            if (i !== j) {
                                Upper *= metX[Scope[j] - 1] - X;
                                Lower *= metX[Scope[j] - 1] - metX[Scope[i] - 1];
                            }
                        }
                        this.Answer += (Upper / Lower) * metY[Scope[i] - 1];
                    }
                    this.setState({
                        Actual_Answer: this.Answer
                    })
                }
                catch {}
                break;
            
            case "Linear_Regression":
                // Store a
                try{
                    Final_Answer = [];
                    // For Replace a with Final_Answer
                    Prove_Answer = "";
                    var metX = JSON.parse(this.state.metX);
                    var metY = JSON.parse(this.state.metY);
                    var n = metX.length;
                    var SumA = Math.sum(metX);
                    var SumB = Math.sum(metY);
                    var SumAB = Math.sum(Math.multiply(metX,metY));
                    var SumPowA = Math.sum(Math.multiply(metX,metX));
                    var metA = [[n, SumA], [SumA, SumPowA]];
                    var metB = [SumB, SumAB];
    
                    count = 0;
                    while (count < metA.length) {
                        Xnew = [[n, SumA], [SumA, SumPowA]];
                        // console.log(AnsMet)
                        for (let i = 0; i < metA.length; i++) {
                            Xnew[i][count] = metB[i];
                            // console.log(Xnew)
                        }
                        TempAnswer = (Math.det(Xnew) / Math.det(metA));
                        Final_Answer.push(
                            <p id={count} value={TempAnswer}>
                                a{count} : {TempAnswer}
                            </p>
                        );
                        if(count === 0)
                        {
                            Prove_Answer = this.state.equation.replace(/a0/g,TempAnswer);
                        } 
                        else Prove_Answer = Prove_Answer.replace(/a1/g,TempAnswer);
    
                        count++;
                        console.log(TempAnswer);
                        console.log(Prove_Answer);
                    }
    
                    this.setState({
                        ProveAnswer: (
                            <div>
                                <h4>
                                    Equation: {this.state.equation}
                                </h4>
                                <h4>Replace a : </h4>
                                <h5>{Final_Answer}</h5>
                                <h4>
                                    {Prove_Answer.replace(/x/g,this.state.X)+" = " 
                                    +this.Convert_Eq(Prove_Answer, this.state.X)
                                    }
                                </h4>
                            </div>
                            ),
                        Matrix_Answer: Final_Answer
                    })
                }
                catch {}
                break;

            case "Polynomial_Regression":
                try{
                    Final_Answer = [];
                    // For Replace a with Final_Answer
                    Prove_Answer = "";
                    var metX = JSON.parse(this.state.metX);
                    var metY = JSON.parse(this.state.metY);
                    var n = metX.length;
                    var SumA = Math.sum(metX);
                    var SumB = Math.sum(metY);
                    var SumAB = Math.sum(Math.multiply(metX,metY));
                    var SumPow2A = Math.sum(Math.multiply(metX,metX));
                    var SumPow3A = 0;
                    var SumPow4A = 0; 
                    var SumPowAB = 0;
                    for(let i = 0; i < n; i++)
                    {
                        SumPow3A+=Math.pow(metX[i],3);
                        SumPow4A+=Math.pow(metX[i],4);
                        SumPowAB+=Math.pow(metX[i],2)*metY[i];
                    }
    
                    var metA = [[n, SumA, SumPow2A], [SumA, SumPow2A, SumPow3A], [SumPow2A, SumPow3A, SumPow4A]];
                    var metB = [SumB, SumAB, SumPowAB];
    
                    count = 0;

                    while (count < metA.length) {
                        Xnew = [[n, SumA, SumPow2A], [SumA, SumPow2A, SumPow3A], [SumPow2A, SumPow3A, SumPow4A]];
                        for (let i = 0; i < metA.length; i++) {
                            Xnew[i][count] = metB[i];
                        }
                        TempAnswer = (Math.det(Xnew) / Math.det(metA));
                        Final_Answer.push(
                            <p id={count} value={TempAnswer}>
                                a{count} : {TempAnswer}
                            </p>
                        );
                        if(count === 0) Prove_Answer = this.state.equation.replace(/a0/g,TempAnswer);
                        else if(count === 1) Prove_Answer = Prove_Answer.replace(/a1/g,TempAnswer);
                        else Prove_Answer = Prove_Answer.replace(/a2/g,TempAnswer);
    
                        count++;
                    }
                    this.setState({
                        ProveAnswer: (
                            <div>
                                <h4>
                                    Equation: {this.state.equation}
                                </h4>
                                <h4>Replace a : </h4>
                                <h5>{Final_Answer}</h5>
                                <h4>
                                    {Prove_Answer.replace(/x/g,this.state.X)+" = " 
                                    +this.Convert_Eq(Prove_Answer, this.state.X)
                                    }
                                </h4>
                            </div>
                            ),
                        Matrix_Answer: Final_Answer
                    })
                }
                catch {}
                break;

            case "Multiple_Linear_Regression":
                // try{
                    Final_Answer = [];
                    // For Replace a with Final_Answer
                    Prove_Answer = "";
                    var met1 = JSON.parse(this.state.met1);
                    var met2 = JSON.parse(this.state.met2);
                    var met3 = JSON.parse(this.state.met3);
                    var metY = JSON.parse(this.state.metY);
                    var n = met1.length;
                    var Sum1 = Math.sum(met1);
                    var Sum2 = Math.sum(met2);
                    var Sum3 = Math.sum(met3);
                    var SumY = Math.sum(metY);
                    var SumPow2met1 = Math.sum(Math.multiply(met1,met1));
                    var SumPow2met2 = Math.sum(Math.multiply(met2,met2));
                    var SumPow2met3 = Math.sum(Math.multiply(met3,met3));
                    var Mulmet1met2 = Math.sum(Math.multiply(met1,met2));
                    var Mulmet1met3 = Math.sum(Math.multiply(met1,met3));
                    var Mulmet2met3 = Math.sum(Math.multiply(met2,met3));
                    var Summet1metY = Math.sum(Math.multiply(met1,metY));
                    var Summet2metY = Math.sum(Math.multiply(met2,metY));
                    var Summet3metY = Math.sum(Math.multiply(met3,metY));
                 
                    var metA = [[n, Sum1, Sum2, Sum3], 
                                [Sum1, SumPow2met1, Mulmet1met2, Mulmet1met3], 
                                [Sum2, Mulmet1met2, SumPow2met2, Mulmet2met3],
                                [Sum3, Mulmet1met3, Mulmet2met3, SumPow2met3]];

                    var metB = [SumY, Summet1metY, Summet2metY, Summet3metY];
    
                    count = 0;
                    console.log(met1,metY);
                    while (count < metA.length) {
                        Xnew = [[n, Sum1, Sum2, Sum3], 
                                [Sum1, SumPow2met1, Mulmet1met2, Mulmet1met3], 
                                [Sum2, Mulmet1met2, SumPow2met2, Mulmet2met3],
                                [Sum3, Mulmet1met3, Mulmet2met3, SumPow2met3]];;
                        for (let i = 0; i < metA.length; i++) {
                            Xnew[i][count] = metB[i];
                        }
                        TempAnswer = (Math.det(Xnew) / Math.det(metA));
                        Final_Answer.push(
                            <p id={count} value={TempAnswer}>
                                a{count} : {TempAnswer}
                            </p>
                        );
                        if(count === 0) 
                        {
                            Prove_Answer = this.state.equation.replace(/a0/g,TempAnswer);
                        }
                        else if(count === 1) 
                        {
                            Prove_Answer = Prove_Answer.replace(/a1/g,TempAnswer);
                            Prove_Answer = Prove_Answer.replace(/x1/g,this.state.X1);
                        }
                        else if(count === 2) 
                        {
                            Prove_Answer = Prove_Answer.replace(/a2/g,TempAnswer);
                            Prove_Answer = Prove_Answer.replace(/x2/g,this.state.X2);
                        }
                        else {
                            Prove_Answer = Prove_Answer.replace(/a3/g,TempAnswer);
                            Prove_Answer = Prove_Answer.replace(/x3/g,this.state.X3);
                        }
                        count++;
                    }
                    this.setState({
                        ProveAnswer: (
                            <div>
                                <h4>
                                    Equation: {this.state.equation}
                                </h4>
                                <h4>Replace a : </h4>
                                <h5>{Final_Answer}</h5>
                                <h4>
                                    {Prove_Answer+"="+Math.evaluate(Prove_Answer)}
                                    {/* {Prove_Answer.replace(/x/g,this.state.X)+" = " 
                                    +this.Convert_Eq(Prove_Answer, this.state.X)
                                    } */}
                                </h4>
                            </div>
                            ),
                        Matrix_Answer: Final_Answer
                    })
                // }
                // catch {}
                break;
            
            case "Single_Trapezoidal_Rule":
                break;

            case "Composite_Trapezoidal_Rule":
                break;

            case "Simpson_Rule":
                break;

            case "Composite_Simpson_Rule":
                break;

            case "Numerical_Differentiation":
                var equation = this.state.equation;
                var h = JSON.parse(this.state.h);
                var X = JSON.parse(this.state.X);
                // console.log(h, X);
                this.Answer = 0;
                var ExactAnswer = 0;
                var Error = 0;
                console.log(this.state.Order);
                if(this.state.Order === "First Divided-Differences")
                {
                    switch (this.state.ModeForDiff) 
                    {
                        case "Forward":
                            if(this.state.FormulaForDiff === "f^1*(x)")
                            {
                                this.Answer = (this.Convert_Eq(equation, X+h) - this.Convert_Eq(equation, X))/h;
                                ExactAnswer = Math.derivative(equation, "x").evaluate({
                                        x: X
                                    });
                                Error = ((ExactAnswer - this.Answer)/ExactAnswer)*100;
                            }
                            else if(this.state.FormulaForDiff === "f^2*(x)")
                            {
                                this.Answer = (this.Convert_Eq(equation, (X+2*h)) - 
                                                2*(this.Convert_Eq(equation, X+h)) + 
                                                this.Convert_Eq(equation, X))/(h*h);
                            }
                            else if(this.state.FormulaForDiff === "f^3*(x)")
                            {
                                this.Answer = (this.Convert_Eq(equation, X+(3*h)) - 3*(this.Convert_Eq(equation, X+(2*h))) +
                                3*(this.Convert_Eq(equation, X+h)) - this.Convert_Eq(equation, X))/(h*h*h)
                            }
                            else if(this.state.FormulaForDiff === "f^4*(x)")
                            {
                                this.Answer = (this.Convert_Eq(equation, X+(4*h)) - 
                                                4*(this.Convert_Eq(equation, X+(3*h))) +
                                                6*(this.Convert_Eq(equation, X+(2*h))) - 
                                                4*(this.Convert_Eq(equation, X+h)) + 
                                                this.Convert_Eq(equation, X))/(h*h*h);
                            }
                            break;

                        case "Backward":
                            if(this.state.FormulaForDiff === "f^1*(x)")
                            {
                                this.Answer = (this.Convert_Eq(equation, X) - this.Convert_Eq(equation, X-h))/h;
                                ExactAnswer = Math.derivative(equation, "x").evaluate({
                                        x: X
                                    });
                                Error = ((ExactAnswer - this.Answer)/ExactAnswer)*100;
                            }
                            else if(this.state.FormulaForDiff === "f^2*(x)")
                            {
                                this.Answer = (this.Convert_Eq(equation, X) - 
                                                2*this.Convert_Eq(equation, (X-h)) + 
                                                this.Convert_Eq(equation, (X-(2*h))))/(h*h);
                            }
                            else if(this.state.FormulaForDiff === "f^3*(x)")
                            {
                                this.Answer = (this.Convert_Eq(equation, X) - 
                                                3*this.Convert_Eq(equation, (X-h)) + 
                                                3*(this.Convert_Eq(equation, (X-(2*h)))) -
                                                this.Convert_Eq(equation, (X-(3*h))))/(h*h*h);
                            }
                            else if(this.state.FormulaForDiff === "f^4*(x)")
                            {
                                this.Answer = (this.Convert_Eq(equation, X) - 
                                                4*this.Convert_Eq(equation, (X-h)) + 
                                                6*(this.Convert_Eq(equation, (X-(2*h)))) -
                                                4*(this.Convert_Eq(equation, (X-(3*h)))) +
                                                this.Convert_Eq(equation, (X-(4*h))))/(h*h*h*h);
                            }
                            break;

                        case "Central":
                            if(this.state.FormulaForDiff === "f^1*(x)")
                            {
                                this.Answer = (this.Convert_Eq(equation, X+h) - this.Convert_Eq(equation, X-h))/(2*h);
                                ExactAnswer = Math.derivative(equation, "x").evaluate({
                                        x: X
                                    });
                                Error = ((ExactAnswer - this.Answer)/ExactAnswer)*100;
                            }
                            else if(this.state.FormulaForDiff === "f^2*(x)")
                            {
                                this.Answer = (this.Convert_Eq(equation, X+h) - 
                                                2*(this.Convert_Eq(equation, X)) +
                                                this.Convert_Eq(equation, X-h)
                                                )/(h*h);
                            }
                            else if(this.state.FormulaForDiff === "f^3*(x)")
                            {
                                this.Answer = (this.Convert_Eq(equation, X+(h*2)) - 
                                                2*(this.Convert_Eq(equation, X+h)) + 
                                                2*(this.Convert_Eq(equation, X-h)) -
                                                this.Convert_Eq(equation, X-(h*2))
                                                )/(2*(h*h*h));
                            }
                            else if(this.state.FormulaForDiff === "f^4*(x)")
                            {
                                this.Answer = (this.Convert_Eq(equation, X+(h*2)) 
                                                - (4*this.Convert_Eq(equation, (X+h))) 
                                                + (6*this.Convert_Eq(equation, X)) 
                                                - (4*this.Convert_Eq(equation, (X+h))) 
                                                + this.Convert_Eq(equation, X-(h*2))
                                                )/(h*h*h*h);               
                            }
                            break;
                    }
                    break;
                }
                else 
                {
                    switch (this.state.ModeForDiff) 
                    {
                        case "Forward":
                            if(this.state.FormulaForDiff === "f^1*(x)")
                            {
                                this.Answer = ((-1*(this.Convert_Eq(equation, X+(h*2))))
                                                + (4*(this.Convert_Eq(equation, X+h)))
                                                - (4*(this.Convert_Eq(equation, X))))/(2*h);
                                ExactAnswer = Math.derivative(equation, "x").evaluate({
                                        x: X
                                    });
                                Error = ((ExactAnswer - this.Answer)/ExactAnswer)*100;
                            }
                            else if(this.state.FormulaForDiff === "f^2*(x)")
                            {
                                this.Answer = ((-1*(this.Convert_Eq(equation, X+(h*3))))
                                                + (4*(this.Convert_Eq(equation, X+(h*2))))
                                                - (5*(this.Convert_Eq(equation, X+h)))
                                                + (4*(this.Convert_Eq(equation, X))))/(h*h);
                            }
                            else if(this.state.FormulaForDiff === "f^3*(x)")
                            {
                                this.Answer = ((-3*(this.Convert_Eq(equation, X+(h*4))) )
                                                + (14*(this.Convert_Eq(equation, X+(h*3))))
                                                - (24*(this.Convert_Eq(equation, X+(h*2))))
                                                + (18*(this.Convert_Eq(equation, X+h)))
                                                - (18*(this.Convert_Eq(equation, X))))/(2*(h*h*h));
                            }
                            else if(this.state.FormulaForDiff === "f^4*(x)")
                            {
                                this.Answer = ((-2*(this.Convert_Eq(equation, X+(h*5)))) 
                                                + (11*(this.Convert_Eq(equation, X+(h*4))))
                                                - (24*(this.Convert_Eq(equation, X+(h*3))))
                                                + (26*(this.Convert_Eq(equation, X+(h*2))))
                                                - (14*(this.Convert_Eq(equation, X+(h*1))))
                                                + (3*(this.Convert_Eq(equation, X))))/(h*h*h*h);
                            }
                            break;

                        case "Backward":
                            if(this.state.FormulaForDiff === "f^1*(x)")
                            {
                                this.Answer = ((3*(this.Convert_Eq(equation, X))) 
                                                - (4*(this.Convert_Eq(equation, (X-h))))
                                                + (this.Convert_Eq(equation, (X-(2*h)))))/(2*h);
                                ExactAnswer = Math.derivative(equation, "x").evaluate({
                                        x: X
                                    });
                                Error = ((ExactAnswer - this.Answer)/ExactAnswer)*100;
                            }
                            else if(this.state.FormulaForDiff === "f^2*(x)")
                            {
                                this.Answer = ((2*(this.Convert_Eq(equation, X))) 
                                                - (5*(this.Convert_Eq(equation, (X-h))))
                                                + (4*(this.Convert_Eq(equation, (X-(h*2)))))
                                                - (this.Convert_Eq(equation, (X-(h*3)))))/(h*h);
                            }
                            else if(this.state.FormulaForDiff === "f^3*(x)")
                            {
                                this.Answer = ((5*(this.Convert_Eq(equation, X)))
                                                - (18*(this.Convert_Eq(equation, (X-h))))
                                                + (24*(this.Convert_Eq(equation, (X-(h*2)))))
                                                - (14*(this.Convert_Eq(equation, (X-(h*3)))))
                                                + (this.Convert_Eq(equation, (X-(h*4)))))/(2*(h*h*h));
                            }
                            else if(this.state.FormulaForDiff === "f^4*(x)")
                            {
                                this.Answer = ((3*(this.Convert_Eq(equation, X)))
                                                - (14*(this.Convert_Eq(equation, (X-(h*1)))))
                                                + (26*(this.Convert_Eq(equation, (X-(h*2)))))
                                                - (24*(this.Convert_Eq(equation, (X-(h*3)))))
                                                + (11*(this.Convert_Eq(equation, (X-(h*4)))))
                                                - (2*(this.Convert_Eq(equation, (X-(h*5))))))/(h*h*h*h);
                            }
                            break;

                        case "Central":
                            if(this.state.FormulaForDiff === "f^1*(x)")
                            {
                                this.Answer = (-1*this.Convert_Eq(equation, X+(2*h)) 
                                                + 8*this.Convert_Eq(equation, X+h)
                                                - 8*this.Convert_Eq(equation, X-h)
                                                + this.Convert_Eq(equation, X-(2*h)))/(12*h);
                                ExactAnswer = Math.derivative(equation, "x").evaluate({
                                        x: X
                                    });
                                Error = ((ExactAnswer - this.Answer)/ExactAnswer)*100;
                            }
                            else if(this.state.FormulaForDiff === "f^2*(x)")
                            {
                                this.Answer = ((-1*this.Convert_Eq(equation, X+(2*h))) 
                                                + (16*(this.Convert_Eq(equation, X+h)))
                                                - (30*(this.Convert_Eq(equation, X)))
                                                + (16*(this.Convert_Eq(equation, X-h)))
                                                - (this.Convert_Eq(equation, X-(2*h))))/(12*(h*h));
                            }
                            else if(this.state.FormulaForDiff === "f^3*(x)")
                            {
                                this.Answer = ((-1*(this.Convert_Eq(equation, X+(3*h))))
                                                + (8*(this.Convert_Eq(equation, X+(2*h))))
                                                - (13*(this.Convert_Eq(equation, X+h)))
                                                + (13*(this.Convert_Eq(equation, X-h)))
                                                - (8*(this.Convert_Eq(equation, X+(2*h))))
                                                + (this.Convert_Eq(equation, X-(3*h))))/(8*(h*h*h));
                            }
                            else if(this.state.FormulaForDiff === "f^4*(x)")
                            {
                                this.Answer = ((-1*(this.Convert_Eq(equation, X+(3*h))))
                                                + (12*(this.Convert_Eq(equation, X+(2*h))))
                                                - (39*(this.Convert_Eq(equation, X+h)))
                                                + (56*(this.Convert_Eq(equation, X)))
                                                - (39*(this.Convert_Eq(equation, X-h)))
                                                + (12*(this.Convert_Eq(equation, X-(2*h))))
                                                - (this.Convert_Eq(equation, X-(3*h))))/(6*(h*h*h*h));             
                            }
                            break;
                    }
                }
                if(ExactAnswer === 0 && Error === 0 && this.Answer !== 0)
                {
                    if(this.state.Actual_Answer === 0 && this.state.Error === 0 && this.state.ExactAnswer === 0)
                    {
                        alert("Do you want to submit your data?");
                        this.setState({
                            Actual_Answer: this.Answer,
                            Error: 0,
                            ExactAnswer: 0
                        });
                    }
                    else if(this.state.Actual_Answer !== this.Answer ||
                            this.state.Error !== Error ||
                            this.state.ExactAnswer !== ExactAnswer)
                    {
                        alert("Do you want to submit your data?");
                        this.setState({
                            Actual_Answer: this.Answer,
                            Error: 0,
                            ExactAnswer: 0
                        });
                    }
                }
                else
                {
                    if(this.state.Actual_Answer === 0 && this.state.Error === 0 && this.state.ExactAnswer === 0)
                    {
                        alert("Do you want to submit your data?");
                        this.setState({
                            Actual_Answer: this.Answer,
                            Error: Error,
                            ExactAnswer: ExactAnswer
                        });
                    }
                    else if(this.state.Actual_Answer !== this.Answer ||
                            this.state.Error !== Error ||
                            this.state.ExactAnswer !== ExactAnswer)
                    {
                        alert("Do you want to submit your data?");
                        this.setState({
                            Actual_Answer: this.Answer,
                            Error: Error,
                            ExactAnswer: ExactAnswer
                        });
                    }
                }
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

            case "Gauss_Jordan":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                });
                break;

            case "LU_Decompost":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                });
                break;

            case "Jacobi_Iteration":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                splitValue[2] = splitValue[2].slice(2, splitValue[2].length)
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                    metX: splitValue[2],
                });
                break;

            case "Gauss_Seidel_Iteration":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                splitValue[2] = splitValue[2].slice(2, splitValue[2].length);
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                    metX: splitValue[2],
                });
                break;

            case "Conjugate_Gradient":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                splitValue[2] = splitValue[2].slice(2, splitValue[2].length);
                this.setState({
                    metA: splitValue[0],
                    metB: splitValue[1],
                    metX: splitValue[2],
                });
                break;

            case "Lagrange_Interpolation":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                splitValue[2] = splitValue[2].slice(2, splitValue[2].length);
                splitValue[3] = splitValue[3].slice(2, splitValue[3].length);
                console.log(splitValue[0],splitValue[1],splitValue[2],splitValue[3])
                this.setState({
                    metX: splitValue[0],
                    metY: splitValue[1],
                    Scope: splitValue[2],
                    X: splitValue[3],
                });
                break;

            case "Linear_Regression":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                splitValue[2] = splitValue[2].slice(2, splitValue[2].length);
                splitValue[3] = splitValue[3].slice(2, splitValue[3].length);
                console.log(splitValue[0],splitValue[1],splitValue[2],splitValue[3])
                this.setState({
                    equation: splitValue[0],
                    metX: splitValue[1],
                    metY: splitValue[2],
                    X: splitValue[3],
                });
                break;
            
            case "Polynomial_Regression":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                splitValue[2] = splitValue[2].slice(2, splitValue[2].length);
                splitValue[3] = splitValue[3].slice(2, splitValue[3].length);
                console.log(splitValue[0],splitValue[1],splitValue[2],splitValue[3])
                this.setState({
                    equation: splitValue[0],
                    metX: splitValue[1],
                    metY: splitValue[2],
                    X: splitValue[3],
                });
                break;
            
            case "Multiple_Linear_Regression":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                splitValue[2] = splitValue[2].slice(2, splitValue[2].length);
                splitValue[3] = splitValue[3].slice(2, splitValue[3].length);
                splitValue[4] = splitValue[4].slice(2, splitValue[4].length);
                splitValue[5] = splitValue[5].slice(2, splitValue[5].length);
                splitValue[6] = splitValue[6].slice(2, splitValue[6].length);
                splitValue[7] = splitValue[7].slice(2, splitValue[7].length);
                console.log(splitValue[0],splitValue[1],splitValue[2],splitValue[3],splitValue[4],splitValue[5],splitValue[6],splitValue[7])
                this.setState({
                    equation: splitValue[0],
                    met1: splitValue[1],
                    met2: splitValue[2],
                    met3: splitValue[3],
                    metY: splitValue[4],
                    X1: splitValue[5],
                    X2: splitValue[6],
                    X3: splitValue[7]
                });
                break;
            
            case "Single_Trapezoidal_Rule":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                splitValue[2] = splitValue[2].slice(2, splitValue[2].length);
                console.log(splitValue[0],splitValue[1],splitValue[2])
                this.setState({
                    equation: splitValue[0],
                    Upper: splitValue[1],
                    Lower: splitValue[2],
                });
                break;

            case "Composite_Trapezoidal_Rule":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                splitValue[2] = splitValue[2].slice(2, splitValue[2].length);
                splitValue[3] = splitValue[3].slice(2, splitValue[3].length);
                console.log(splitValue[0],splitValue[1],splitValue[2],splitValue[3])
                this.setState({
                    equation: splitValue[0],
                    Upper: splitValue[1],
                    Lower: splitValue[2],
                    Scope: splitValue[3],
                });
                break;

            case "Simpson_Rule":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                splitValue[2] = splitValue[2].slice(2, splitValue[2].length);
                console.log(splitValue[0],splitValue[1],splitValue[2])
                this.setState({
                    equation: splitValue[0],
                    Upper: splitValue[1],
                    Lower: splitValue[2],
                });
                break;
            
            case "Composite_Simpson_Rule":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                splitValue[2] = splitValue[2].slice(2, splitValue[2].length);
                splitValue[3] = splitValue[3].slice(2, splitValue[3].length);
                console.log(splitValue[0],splitValue[1],splitValue[2],splitValue[3])
                this.setState({
                    equation: splitValue[0],
                    Upper: splitValue[1],
                    Lower: splitValue[2],
                    Scope: splitValue[3],
                });
                break;
            
            case "Numerical_Differentiation":
                splitValue = event.target.value.split("|");
                splitValue[1] = splitValue[1].slice(2, splitValue[1].length);
                splitValue[2] = splitValue[2].slice(2, splitValue[2].length);
                console.log(splitValue[0],splitValue[1],splitValue[2])
                this.setState({
                    equation: splitValue[0],
                    X: splitValue[1],
                    h: splitValue[2],
                });
                break;    

            default:
                break;
        }
    };

    // ****** Chapter 2 ****** //

    // Generate Input For each row & column
    generateInputMatrixA = (row, column) => {
        try {
            var Input_Table = [];
            for (let i = 0; i < column; i++) {
                Input_Table.push(
                    <input
                        id={row.toString() + i.toString()}
                        // key={row.toString() + i.toString()}
                    ></input>
                );
            }
            return Input_Table;
        } catch {}
    };

    // Generate Input MatrixA
    generateMatrixATable = (row, column) => {
        try {
            if (row < 2 || column < 2) {
                this.GetInputMatrix = false;
            } else if (row <= 20 && row > 1 && column <= 20 && column > 1) {
                this.GetInputMatrix = true;
                var Matrix_Table = [];
                for (let i = 0; i < row; i++) {
                    Matrix_Table.push(
                        <tr>{this.generateInputMatrixA(i, column)}</tr>
                    );
                }
                return Matrix_Table;
            }
        } catch (e) {}
    };

    // Generate Input MatrixB
    generateMatrixBTable = (row, column, name) => {
        try {
            if (row < 2 || column < 2) {
                this.GetInputMatrix = false;
            } else if (row <= 20 && row > 1 && column <= 20 && column > 1) {
                var Matrix_Table = [];
                for (let i = 0; i < row; i++) {
                    Matrix_Table.push(
                        <tr>
                            <input id={name+i.toString()} key={name+i.toString()}></input>
                        </tr>
                    );
                    // console.log(i.toString());
                }
            }
            return Matrix_Table;
        } catch {}
    };

    // Generate Answer Table
    generateAnswerTable = (Answer) => {
        var Table = [];
        console.log(Answer.L);
        // while (Answer.length)
        //     Table.push(
        //         <tr>
        //             <td>{Answer.L}</td>
        //             <td>{Answer.R}</td>
        //             <td>{Answer.M}</td>
        //         </tr>
        //     );
    };

    // Manual Input Matric Chapter 2
    ShowInputChapter2 = (Data) => {
        var HTML = [];
        if(this.state.Chapter === "Cramer_Rule" ||
        this.state.Chapter === "Gauss_Elimination" ||
        this.state.Chapter === "Gauss_Jordan" ||
        this.state.Chapter === "LU_Decompost")
        {
            if (this.state.ManualInput === true) {
                this.GetInputMatrix = true;
                HTML.push(
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Row:
                            <input
                                id="row_Cramer"
                                type="number"
                                name="row"
                                value={this.state.row}
                                onChange={this.handleChange}
                            ></input>
                            Column:
                            <input
                                id="row_Cramer"
                                type="number"
                                name="column"
                                value={this.state.column}
                                onChange={this.handleChange}
                            />
                            <br />
                            Input MatrixA:
                            <table>
                                {this.generateMatrixATable(
                                    this.state.row,
                                    this.state.column
                                )}
                            </table>
                            <br />
                            Input MatrixB:
                            <table>
                                {this.generateMatrixBTable(
                                    this.state.row,
                                    this.state.column,
                                    "B"
                                )}
                            </table>
                        </label>
                        <input type="submit" value="Submit" />
                        <h1>
                            <MathJaxContext>
                                <MathJax dynamic>
                                    MatrixA : {this.Convert_Latex(this.state.metA)}
                                    <br></br>
                                    MatrixB : {this.Convert_Latex(this.state.metB)}
                                    <br></br>
                                </MathJax>
                            </MathJaxContext>
                        </h1>
                        Answer : {this.state.Matrix_Answer}
                    </form>
                );
                return HTML;
            }
            if (this.state.ManualInput === false) {
                HTML = [];
                this.GetInputMatrix = false;
                HTML.push(
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <select
                                onChange={this.getEquationFromAPI}
                                value={[this.state.metA, this.state.metB]}
                            >
                                <option value="">Choose Example Equation</option>
                                {Data}
                            </select>
                            <input type="submit" value="Submit" />
                            <h1>
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        MatrixA :{" "}
                                        {this.Convert_Latex(this.state.metA)}
                                        <br></br>
                                        MatrixB :{" "}
                                        {this.Convert_Latex(this.state.metB)}
                                        <br></br>
                                    </MathJax>
                                </MathJaxContext>
                            </h1>
                            Answer : {this.state.Matrix_Answer}
                        </form>
                    </div>
                );
                return HTML;
            }
        }
        else
        {
            if (this.state.ManualInput === true) {
                this.GetInputMatrix = true;
                HTML.push(
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Row:
                            <input
                                id="row_Cramer"
                                type="number"
                                name="row"
                                value={this.state.row}
                                onChange={this.handleChange}
                            ></input>
                            Column:
                            <input
                                id="row_Cramer"
                                type="number"
                                name="column"
                                value={this.state.column}
                                onChange={this.handleChange}
                            />
                            <br />
                            Input MatrixA:
                            <table>
                                {this.generateMatrixATable(
                                    this.state.row,
                                    this.state.column
                                )}
                            </table>
                            <br />
                            Input MatrixB:
                            <table>
                                {this.generateMatrixBTable(
                                    this.state.row,
                                    this.state.column,
                                    "B"
                                )}
                            </table>
                            Input MatrixX:
                            <table>
                                {this.generateMatrixBTable(
                                    this.state.row,
                                    this.state.column,
                                    "X"
                                )}
                            </table>
                        </label>
                        <input type="submit" value="Submit" />
                        <h1>
                            <MathJaxContext>
                                <MathJax dynamic>
                                    MatrixA : {this.Convert_Latex(this.state.metA)}
                                    <br></br>
                                    MatrixB : {this.Convert_Latex(this.state.metB)}
                                    <br></br>
                                    MatrixX : {this.Convert_Latex(this.state.metX)}
                                </MathJax>
                            </MathJaxContext>
                        </h1>
                        Answer : {this.state.Matrix_Answer}
                    </form>
                );
                return HTML;
            }
            if (this.state.ManualInput === false) {
                HTML = [];
                this.GetInputMatrix = false;
                HTML.push(
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <select
                                onChange={this.getEquationFromAPI}
                                value={[this.state.metA, this.state.metB, this.state.metX]}
                            >
                                <option value="">Choose Example Equation</option>
                                {Data}
                            </select>
                            <input type="submit" value="Submit" />
                            <h1>
                                <MathJaxContext>
                                    <MathJax dynamic>
                                        MatrixA :{" "}
                                        {this.Convert_Latex(this.state.metA)}
                                        <br></br>
                                        MatrixB :{" "}
                                        {this.Convert_Latex(this.state.metB)}
                                        <br></br>
                                        MatrixX :{" "}
                                        {this.Convert_Latex(this.state.metX)}
                                    </MathJax>
                                </MathJaxContext>
                            </h1>
                            Answer : {this.state.Matrix_Answer}
                        </form>
                    </div>
                );
                return HTML;
            }
        }
    };

    // ************************ //

    // ****** Chapter 3 ****** //
    generateMatrixXTable = (Size) => {
        try {
            if (Size < 2) {
                this.GetInputMatrix = false;
            } else if (Size <= 20 && Size > 1 ) {
                this.GetInputMatrix = true;
                var Matrix_Table = [];
                for (let i = 0; i < Size; i++) {
                    Matrix_Table.push(
                        <tr>
                            <input
                                id={"X"+i.toString()}
                            ></input>
                        </tr>
                    );
                }
                return Matrix_Table;
            }
        } catch (e) {}
    };

    generateMatrixYTable = (Size) => {
        try {
            if (Size < 2) {
                this.GetInputMatrix = false;
            } else if (Size <= 20 && Size > 1 ) {
                this.GetInputMatrix = true;
                var Matrix_Table = [];
                for (let i = 0; i < Size; i++) {
                    Matrix_Table.push(
                        <tr>
                            <input
                                id={"Y"+i.toString()}
                            ></input>
                        </tr>
                    );
                }
                return Matrix_Table;
            }
        } catch (e) {}
    };

    // Manual Input Matric Chapter 3
    ShowInputChapter3 = (Data) => {
        var HTML = [];
        if (this.state.ManualInput === true) {
            this.GetInputMatrix = true;
            HTML.push(
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Size of Data:
                        <input
                            id="Size"
                            type="number"
                            name="Size"
                            value={this.state.Size}
                            onChange={this.handleChange}
                        ></input>
                        Scope:
                        <input
                            id="Scope"
                            type="text"
                            name="Scope"
                            value={this.state.Scope}
                            onChange={this.handleChange}
                        />
                        X:
                        <input
                            id="X"
                            type="number"
                            name="X"
                            value={this.state.X}
                            onChange={this.handleChange}
                        />
                        <br />
                        Input MatrixX:
                        <table>
                            {this.generateMatrixXTable(
                                this.state.Size
                            )}
                        </table>
                        <br />
                        Input MatrixY:
                        <table>
                            {this.generateMatrixYTable(
                                this.state.Size
                            )}
                        </table>
                    </label>
                    <input type="submit" value="Submit" />
                    Answer : {this.state.Actual_Answer}
                </form>
            );
            return HTML;
        }
        if (this.state.ManualInput === false) {
            HTML = [];
            this.GetInputMatrix = false;
            HTML.push(
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[this.state.metX, this.state.metY, this.state.Scope, this.state.X]}
                        >
                            <option value="">Choose Example Equation</option>
                            {Data}
                        </select>
                        <input type="submit" value="Submit" />
                        Answer : {this.state.Actual_Answer}
                    </form>
                </div>
            );
            return HTML;
        }
    };

    // ************************ //

    // ****** Chapter 4 ****** //
    generateMatrixXnTable = (Size, n) => {
        try {
            if (Size < 2) {
                this.GetInputMatrix = false;
            } else if (Size <= 20 && Size > 1 ) {
                this.GetInputMatrix = true;
                var Matrix_Table = [];
                for (let i = 0; i < Size; i++) {
                    Matrix_Table.push(
                        <tr>
                            <input
                                id={"X"+n.toString()+i.toString()}
                            ></input>
                        </tr>
                    );
                }
                return Matrix_Table;
            }
        } catch (e) {}
    };

    ShowInputChapter4 = (Data) => {
        var HTML = [];
        if(this.state.Chapter !== "Multiple_Linear_Regression")
        {
            if (this.state.ManualInput === true) {
                this.GetInputMatrix = true;
                HTML.push(
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Size of Data:
                            <input
                                id="Size"
                                type="number"
                                name="Size"
                                value={this.state.Size}
                                onChange={this.handleChange}
                            ></input>
                            X:
                            <input
                                id="X"
                                type="number"
                                name="X"
                                value={this.state.X}
                                onChange={this.handleChange}
                            />
                            <br />
                            Input MatrixX:
                            <table>
                                {this.generateMatrixXTable(
                                    this.state.Size
                                )}
                            </table>
                            <br />
                            Input MatrixY:
                            <table>
                                {this.generateMatrixYTable(
                                    this.state.Size
                                )}
                            </table>
                        </label>
                        <input type="submit" value="Submit" />
                        <br/>
                        Value of a : {this.state.Matrix_Answer}
                        <h4>Answer</h4>
                        {this.state.ProveAnswer}
                        <br/>
                    </form>
                );
                return HTML;
            }
            if (this.state.ManualInput === false) {
                HTML = [];
                this.GetInputMatrix = false;
                HTML.push(
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <select
                                onChange={this.getEquationFromAPI}
                                value={[this.state.equation, this.state.metX, this.state.metY, this.state.X]}
                            >
                                <option value="">Choose Example Equation</option>
                                {Data}
                            </select>
                            <input type="submit" value="Submit" />
                            <br/>
                            Value of a : {this.state.Matrix_Answer}
                            <h4>Answer</h4>
                            {this.state.ProveAnswer}
                            <br/>
                        </form>
                    </div>
                );
                return HTML;
            }
        }
        else
        {
            if (this.state.ManualInput === true) {
                this.GetInputMatrix = true;
                HTML.push(
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Size of Data:
                            <input
                                id="Size"
                                type="number"
                                name="Size"
                                value={this.state.Size}
                                onChange={this.handleChange}
                            ></input>
                            X1:
                            <input
                                id="X1"
                                type="number"
                                name="X1"
                                value={this.state.X1}
                                onChange={this.handleChange}
                            />
                            X2:
                            <input
                                id="X2"
                                type="number"
                                name="X2"
                                value={this.state.X2}
                                onChange={this.handleChange}
                            />
                            X3:
                            <input
                                id="X3"
                                type="number"
                                name="X3"
                                value={this.state.X3}
                                onChange={this.handleChange}
                            />
                            <br />
                            Input MatrixX1:
                            <table>
                                {this.generateMatrixXnTable(
                                    this.state.Size,1
                                )}
                            </table>
                            Input MatrixX2:
                            <table>
                                {this.generateMatrixXnTable(
                                    this.state.Size,2
                                )}
                            </table>
                            Input MatrixX3:
                            <table>
                                {this.generateMatrixXnTable(
                                    this.state.Size,3
                                )}
                            </table>
                            <br />
                            Input MatrixY:
                            <table>
                                {this.generateMatrixYTable(
                                    this.state.Size
                                )}
                            </table>
                        </label>
                        <input type="submit" value="Submit" />
                        <br/>
                        Value of a : {this.state.Matrix_Answer}
                        <h4>Answer</h4>
                        {this.state.ProveAnswer}
                        <br/>
                    </form>
                );
                return HTML;
            }
            if (this.state.ManualInput === false) {
                HTML = [];
                this.GetInputMatrix = false;
                HTML.push(
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <select
                                onChange={this.getEquationFromAPI}
                                value={[this.state.equation, this.state.met1, this.state.met2, this.state.met3, 
                                        this.state.metY, this.state.X1, this.state.X2, this.state.X3]}
                            >
                                <option value="">Choose Example Equation</option>
                                {Data}
                            </select>
                            <input type="submit" value="Submit" />
                            <br/>
                            Value of a : {this.state.Matrix_Answer}
                            <h4>Answer</h4>
                            {this.state.ProveAnswer}
                            <br/>
                        </form>
                    </div>
                );
                return HTML;
            }
        }

    };

    // ************************ //

    // ****** Chapter 5 ****** //

    ShowInputChapter5 = (Data) => {
        var HTML = [];
        if(this.state.Chapter === "Composite_Trapezoidal_Rule" || this.state.Chapter === "Composite_Simpson_Rule")
        {
            if (this.state.ManualInput === true) {
                this.GetInputMatrix = true;
                HTML.push(
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            equation
                            <input
                                id="equation"
                                type="text"
                                name="equation"
                                value={this.state.equation}
                                onChange={this.handleChange}
                            ></input>
                            Upper:
                            <input
                                id="Upper"
                                type="number"
                                name="Upper"
                                value={this.state.Upper}
                                onChange={this.handleChange}
                            />
                            Lower:
                            <input
                                id="Lower"
                                type="number"
                                name="Lower"
                                value={this.state.Lower}
                                onChange={this.handleChange}
                            />
                            Scope:
                            <input
                                id="Scope"
                                type="text"
                                name="Scope"
                                value={this.state.Scope}
                                onChange={this.handleChange}
                            />
                            <br />
                        </label>
                        <input type="submit" value="Submit" />
                        <br/>
                        Integral From Formula : {this.state.Actual_Answer}
                        <br/>
                        Exact Integral : {this.state.ExactAnswer}
                        <br/>
                        Error : {this.state.Error}
                        <br/>
                    </form>
                );
                return HTML;
            }
            if (this.state.ManualInput === false) {
                HTML = [];
                this.GetInputMatrix = false;
                HTML.push(
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <select
                                onChange={this.getEquationFromAPI}
                                value={[this.state.equation, this.state.Upper, this.state.Lower, this.state.Scope]}
                            >
                                <option value="">Choose Example Equation</option>
                                {Data}
                            </select>
                            <input type="submit" value="Submit" />
                            <br/>
                            Integral From Formula : {this.state.Actual_Answer}
                            <br/>
                            Exact Integral : {this.state.ExactAnswer}
                            <br/>
                            Error : {this.state.Error}
                            <br/>
                        </form>
                    </div>
                );
                return HTML;
            }
        }
        else if(this.state.Chapter === "Single_Trapezoidal_Rule" || this.state.Chapter === "Simpson_Rule")
        {
            if (this.state.ManualInput === true) {
                this.GetInputMatrix = true;
                HTML.push(
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            equation
                            <input
                                id="equation"
                                type="text"
                                name="equation"
                                value={this.state.equation}
                                onChange={this.handleChange}
                            ></input>
                            Upper:
                            <input
                                id="Upper"
                                type="number"
                                name="Upper"
                                value={this.state.Upper}
                                onChange={this.handleChange}
                            />
                            Lower:
                            <input
                                id="Lower"
                                type="number"
                                name="Lower"
                                value={this.state.Lower}
                                onChange={this.handleChange}
                            />
                            <br />
                        </label>
                        <input type="submit" value="Submit" />
                        <br/>
                        Integral From Formula : {this.state.Actual_Answer}
                        <br/>
                        Exact Integral : {this.state.ExactAnswer}
                        <br/>
                        Error : {this.state.Error}
                        <br/>
                    </form>
                );
                return HTML;
            }
            if (this.state.ManualInput === false) {
                HTML = [];
                this.GetInputMatrix = false;
                HTML.push(
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <select
                                onChange={this.getEquationFromAPI}
                                value={[this.state.equation, this.state.Upper, this.state.Lower]}
                            >
                                <option value="">Choose Example Equation</option>
                                {Data}
                            </select>
                            <input type="submit" value="Submit" />
                            <br/>
                            Integral From Formula : {this.state.Actual_Answer}
                            <br/>
                            Exact Integral : {this.state.ExactAnswer}
                            <br/>
                            Error : {this.state.Error}
                            <br/>
                        </form>
                    </div>
                );
                return HTML;
            }
        }
        else if(this.state.Chapter === "Numerical_Differentiation")
        {
            if (this.state.ManualInput === true) {
                this.GetInputMatrix = true;
                HTML.push(
                    <form onSubmit={this.handleSubmit}>
                        <MathJaxContext>
                                <MathJax dynamic>
                                    <label>
                                        equation
                                        <input
                                            id="equation"
                                            type="text"
                                            name="equation"
                                            value={this.state.equation}
                                            onChange={this.handleChange}
                                        ></input>
                                        X:
                                        <input
                                            id="X"
                                            type="number"
                                            name="X"
                                            value={this.state.X}
                                            onChange={this.handleChange}
                                        />
                                        h:
                                        <input
                                            id="h"
                                            type="number"
                                            name="h"
                                            value={this.state.h}
                                            onChange={this.handleChange}
                                        />
                                    <br/>
                                    Mode:
                                    <select
                                        onChange={this.handleChange}
                                        name="ModeForDiff"
                                    >
                                        <option value="">Choose Mode</option>
                                        <option value="Forward">Forward</option>
                                        <option value="Backward">Backward</option>
                                        <option value="Central">Central</option>
                                    </select>
                                    Formula:
                                    <select
                                        onChange={this.handleChange}
                                        name="FormulaForDiff"
                                    >
                                        <option value="">Choose Formula</option>
                                        <option id="f^1(x)" name="f^1(x)" value="f^1*(x)">f`(x)</option>
                                        <option id="f^2*(x)" name="f^2*(x)" value="f^2*(x)">f``(x)</option>
                                        <option id="f^3*(x)" name="f^3*(x)" value="f^3*(x)">f```(x)</option>
                                        <option id="f^4*(x)" name="f^4*(x)" value="f^4*(x)">f````(x)</option>
                                    </select>
                                    Choose Method:
                                    <select
                                        onChange={this.handleChange}
                                        value={this.state.Order}
                                        name="Order"
                                    >
                                        <option value="">Choose Formula</option>
                                        <option id="First Divided-Differences" 
                                                name="First Divided-Differences" 
                                                value="First Divided-Differences">
                                                    First Divided-Differences
                                        </option>
                                        <option id="Second Divided-Differences" 
                                                name="Second Divided-Differences" 
                                                value="Second Divided-Differences">
                                                    Second Divided-Differences
                                        </option>
                                    </select>
                                <br/>
                                    </label>
                                    <input type="submit" value="Submit" />
                                    <br/>
                                    <br/>
                                    Eqution : {this.Convert_Latex(this.state.equation)}
                                    <br/>
                                    <br/>
                                    h: {this.Convert_Latex(this.state.h)}
                                    <br/>
                                    <br/>
                                    Formula: {this.Convert_Latex(this.state.FormulaForDiff)}
                                    <br/>
                                    <br/>
                                    Mode: {this.Convert_Latex(this.state.ModeForDiff)}
                                    <br/>
                                    <br/>
                                    Differentiation From Formula : {this.state.Actual_Answer}
                                    <br/>
                                    <br/>
                                    Exact Differentiation : {this.state.ExactAnswer}
                                    <br/>
                                    <br/>
                                    Error : {this.state.Error}
                                    <br/>
                                    <br/>
                                </MathJax>
                            </MathJaxContext>
                    </form>
                );
                return HTML;
            }
            if (this.state.ManualInput === false) {
                HTML = [];
                this.GetInputMatrix = false;
                HTML.push(
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <MathJaxContext>
                                <MathJax dynamic>
                                <select
                                    onChange={this.getEquationFromAPI}
                                    value={[this.state.equation, this.state.X, this.state.h]}
                                >
                                    <option value="">Choose Example Equation</option>
                                    {Data}
                                </select>
                                <br/>
                                Mode:
                                <select
                                    onChange={this.handleChange}
                                    name="ModeForDiff"
                                >
                                    <option value="">Choose Mode</option>
                                    <option value="Forward">Forward</option>
                                    <option value="Backward">Backward</option>
                                    <option value="Central">Central</option>
                                </select>
                                Formula:
                                <select
                                    onChange={this.handleChange}
                                    name="FormulaForDiff"
                                >
                                    <option value="">Choose Formula</option>
                                    <option id="f^1(x)" name="f^1(x)" value="f^1*(x)">f`(x)</option>
                                    <option id="f^2*(x)" name="f^2*(x)" value="f^2*(x)">f``(x)</option>
                                    <option id="f^3*(x)" name="f^3*(x)" value="f^3*(x)">f```(x)</option>
                                    <option id="f^4*(x)" name="f^4*(x)" value="f^4*(x)">f````(x)</option>
                                </select>
                                Choose Method:
                                <select
                                    onChange={this.handleChange}
                                    value={this.state.Order}
                                    name="Order"
                                >
                                    <option value="">Choose Formula</option>
                                    <option id="First Divided-Differences" 
                                            name="First Divided-Differences" 
                                            value="First Divided-Differences">
                                                First Divided-Differences
                                    </option>
                                    <option id="Second Divided-Differences" 
                                            name="Second Divided-Differences" 
                                            value="Second Divided-Differences">
                                                Second Divided-Differences
                                    </option>
                                </select>
                                <br/>
                                <input type="submit" value="Submit" />
                                <br/>
                                <br/>

                                Eqution : {this.Convert_Latex(this.state.equation)}
                                <br/>
                                <br/>
                                h: {this.Convert_Latex(this.state.h)}
                                <br/>
                                <br/>
                                Formula: {this.Convert_Latex(this.state.FormulaForDiff)}
                                <br/>
                                <br/>
                                Mode: {this.Convert_Latex(this.state.ModeForDiff)}
                                <br/>
                                <br/>
                                Mode: {this.Convert_Latex(this.state.Order)}
                                <br/>
                                <br/>
                                Differentiation From Formula : {this.state.Actual_Answer}
                                <br/>
                                <br/>
                                Exact Differentiation : {this.state.ExactAnswer}
                                <br/>
                                <br/>
                                Error : {this.state.Error}
                                <br/>
                                <br/>
                                </MathJax>
                            </MathJaxContext>
                        </form>
                    </div>
                );
                return HTML;
            }
        }
    }

    Input = () => {
        var Data = [];
        var GetData = 0;
        this.Answer = 0;
        switch (this.state.Chapter) {
            case "Bisection":
                for (
                    let i = 0;
                    i < parseInt(this.state.DataFromAPI[0].Bisection.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Bisection[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[
                                GetData.equation,
                                GetData.left,
                                GetData.right,
                            ]}
                        >
                            {GetData.equation}
                        </option>
                    );
                }
                return (
                    <div className='Panel'>
                        <h1>Bisection Method</h1>
                            <select
                                onChange={this.getEquationFromAPI}
                                value={[
                                    this.state.equation,
                                    this.state.left,
                                    this.state.right,
                                ]}
                            >
                                <option value="">Choose Example Equation</option>
                                    {Data}
                            </select>
   
                        <form onSubmit={this.handleSubmit}>
                            <label className="Input-Equation">
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
                                    // className="Input"
                                    id="L_Bisection"
                                    type="text"
                                    name="left"
                                    value={this.state.left}
                                    onChange={this.handleChange}
                                />
                                R:
                                <input
                                    // className="Input"
                                    id="R_Bisection"
                                    type="text"
                                    name="right"
                                    value={this.state.right}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <input className="button" type="submit" value="Submit" />
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
                            Answer : {this.state.Actual_Answer}
                            <div className="center">{this.Create_Graph()}</div>
                        </form>
                        <h1>Prove Answer</h1>
                        {this.state.ProveAnswer}
                    </div>
                );

            case "False_Position":
                for (
                    let i = 0;
                    i <
                    parseInt(this.state.DataFromAPI[0].False_Position.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].False_Position[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[
                                GetData.equation,
                                GetData.left,
                                GetData.right,
                            ]}
                        >
                            {GetData.equation}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>False Position Method</h1>
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[
                                this.state.equation,
                                this.state.left,
                                this.state.right,
                            ]}
                        >
                            <option value="">Choose Example Equation</option>
                            {Data}
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
                            Answer : {this.state.Actual_Answer}
                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );

            case "One_Point_Iteration":
                for (
                    let i = 0;
                    i <
                    parseInt(
                        this.state.DataFromAPI[0].One_Point_Iteration.length
                    );
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].One_Point_Iteration[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.equation, GetData.X0]}
                        >
                            {GetData.equation}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>One Point Iteration</h1>
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[this.state.equation, this.state.X0]}
                        >
                            <option value="">Choose Example Equation</option>
                            {Data}
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
                            Answer : {this.state.Actual_Answer}
                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );

            case "Newton_Raphson":
                for (
                    let i = 0;
                    i <
                    parseInt(this.state.DataFromAPI[0].Newton_Raphson.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Newton_Raphson[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.equation, GetData.X0]}
                        >
                            {GetData.equation}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Newton Raphson</h1>
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[this.state.equation, this.state.X0]}
                        >
                            <option value="">Choose Example Equation</option>
                            {Data}
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
                            Answer : {this.state.Actual_Answer}
                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );

            case "Secant_Method":
                for (
                    let i = 0;
                    i <
                    parseInt(this.state.DataFromAPI[0].Secant_Method.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Secant_Method[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.equation, GetData.X0, GetData.X1]}
                        >
                            {GetData.equation}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Secant Method</h1>
                        <select
                            onChange={this.getEquationFromAPI}
                            value={[
                                this.state.equation,
                                this.state.X0,
                                this.state.X1,
                            ]}
                        >
                            <option value="">Choose Example Equation</option>
                            {Data}
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
                            Answer : {this.state.Actual_Answer}
                            <div>{this.Create_Graph()}</div>
                        </form>
                    </div>
                );

            case "Cramer_Rule":
                for (
                    let i = 0;
                    i < parseInt(this.state.DataFromAPI[0].Cramer_Rule.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Cramer_Rule[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.metrixA, GetData.metrixB]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Cramer's Rule</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter2(Data)}
                    </div>
                );

            case "Gauss_Elimination":
                for (
                    let i = 0;
                    i <
                    parseInt(
                        this.state.DataFromAPI[0].Gauss_Elimination.length
                    );
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Gauss_Elimination[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.metrixA, GetData.metrixB]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Gauss Elimination Method</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter2(Data)}
                    </div>
                );

            case "Gauss_Jordan":
                for (
                    let i = 0;
                    i < parseInt(this.state.DataFromAPI[0].Gauss_Jordan.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Gauss_Jordan[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.metrixA, GetData.metrixB]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Gauss Jordan</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter2(Data)}
                    </div>
                );

            case "LU_Decompost":
                for (
                    let i = 0;
                    i < parseInt(this.state.DataFromAPI[0].LU_Decompost.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].LU_Decompost[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.metrixA, GetData.metrixB]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>LU Decompost</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter2(Data)}
                    </div>
                );

            case "Jacobi_Iteration":
                for (
                    let i = 0;
                    i <
                    parseInt(this.state.DataFromAPI[0].Jacobi_Iteration.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Jacobi_Iteration[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[
                                GetData.metrixA,
                                GetData.metrixB,
                                GetData.metrixX
                            ]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Jacobi Iteration</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter2(Data)}
                    </div>
                );

            case "Gauss_Seidel_Iteration":
                for (
                    let i = 0;
                    i <
                    parseInt(
                        this.state.DataFromAPI[0].Gauss_Seidel_Iteration.length
                    );
                    i++
                ) {
                    GetData =
                        this.state.DataFromAPI[0].Gauss_Seidel_Iteration[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[
                                GetData.metrixA,
                                GetData.metrixB,
                                GetData.metrixX
                            ]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Gauss Seidel Iteration</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter2(Data)}
                    </div>
                );

            case "Conjugate_Gradient":
                for (
                    let i = 0;
                    i <
                    parseInt(
                        this.state.DataFromAPI[0].Conjugate_Gradient.length
                    );
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Conjugate_Gradient[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[
                                GetData.metrixA,
                                GetData.metrixB,
                                GetData.metrixX
                            ]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Conjugate Gradient</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter2(Data)}
                    </div>
                );

            case "Newton's_divided-differences":
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

            case "Lagrange_Interpolation":
                for (
                    let i = 0;
                    i < parseInt(this.state.DataFromAPI[0].Lagrange_Interpolation.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Lagrange_Interpolation[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.metrixX, GetData.metrixY, GetData.Scope, GetData.X]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Lagrange Interpolation</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter3(Data)}
                    </div>
                );
            
            case "Linear_Regression":
                for (
                    let i = 0;
                    i < parseInt(this.state.DataFromAPI[0].Linear_Regression.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Linear_Regression[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.equation, GetData.metrixX, GetData.metrixY, GetData.X]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Linear Regression</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter4(Data)}
                    </div>
                );

            case "Polynomial_Regression":
                for (
                    let i = 0;
                    i < parseInt(this.state.DataFromAPI[0].Polynomial_Regression.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Polynomial_Regression[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.equation, GetData.metrixX, GetData.metrixY, GetData.X]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Polynomial Regression</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter4(Data)}
                    </div>
                );
            
            case "Multiple_Linear_Regression":
                for (
                    let i = 0;
                    i < parseInt(this.state.DataFromAPI[0].Multiple_Linear_Regression.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Multiple_Linear_Regression[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.equation, GetData.metrix1, GetData.metrix2, GetData.metrix3, 
                                    GetData.metrixY, GetData.X1, GetData.X2, GetData.X3]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Multiple Linear Regression</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter4(Data)}
                    </div>
                );    
            
            case "Single_Trapezoidal_Rule":
                for (
                    let i = 0;
                    i < parseInt(this.state.DataFromAPI[0].Single_Trapezoidal_Rule.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Single_Trapezoidal_Rule[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.equation, GetData.Upper, GetData.Lower]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Single Trapezoidal Rule</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter5(Data)}
                    </div>
                );     

            case "Composite_Trapezoidal_Rule":
                for (
                    let i = 0;
                    i < parseInt(this.state.DataFromAPI[0].Composite_Trapezoidal_Rule.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Composite_Trapezoidal_Rule[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.equation, GetData.Upper, GetData.Lower, GetData.Scope]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Composite Trapezoidal Rule</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter5(Data)}
                    </div>
                );  

            case "Simpson_Rule":
                for (
                    let i = 0;
                    i < parseInt(this.state.DataFromAPI[0].Simpson_Rule.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Simpson_Rule[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.equation, GetData.Upper, GetData.Lower]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Simpson's Rule</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter5(Data)}
                    </div>
                );  

            case "Composite_Simpson_Rule":
                for (
                    let i = 0;
                    i < parseInt(this.state.DataFromAPI[0].Composite_Simpson_Rule.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Composite_Simpson_Rule[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.equation, GetData.Upper, GetData.Lower, GetData.Scope]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Composite Simpson's Rule</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter5(Data)}
                    </div>
                );  
                      
            case "Numerical_Differentiation":
                for (
                    let i = 0;
                    i < parseInt(this.state.DataFromAPI[0].Numerical_Differentiation.length);
                    i++
                ) {
                    GetData = this.state.DataFromAPI[0].Numerical_Differentiation[i];
                    Data.push(
                        <option
                            key={GetData.id}
                            value={[GetData.equation, GetData.X, GetData.h]}
                        >
                            {GetData.id}
                        </option>
                    );
                }
                return (
                    <div>
                        <h1>Numerical Differentiation</h1>
                        <label>
                            <input
                                type="checkbox"
                                onChange={this.toggleSwitch}
                                name="ManualInput"
                                value={this.state.ManualInput}
                            />
                        </label>
                        <br />
                        {this.ShowInputChapter5(Data)}
                    </div>
                );     

            default:
                return <div>Blank</div>;
        }
    };
        
    //*** Part Login & Logout & Post Data***//

    // Check if User is Type Data in Login //
    CheckLogin = (hash, Hash) => {
        if(hash === Hash)
        {
            console.log("Match");
            this.setState({
                HTML: (<button onClick={this.Logout}>Logout</button>),
                HaveToken: true,
                Account: (<h4 className="login">{this.state.UserName} is currently Login!!!</h4>)
            })
        }
        else 
        {
            console.log("Not Match");    
            alert('Please Log in Again!!!');
            this.setState({
                HTML: (<form className='login' onSubmit={this.GetToken}>
                            <div>Username</div>
                            <input className="Input-Login" id="UserName" type="text" name="UserName" onChange={this.handleChange}></input>
                            <div>Password</div>
                            <input className="Input-Login" id="Password" type="text" name="Password" onChange={this.handleChange}></input>
                            <br></br>
                            <input type="submit" value="Submit"/>
                        </form>),
                HaveToken: false,
                Account: (<h4 className="text">Guest User</h4>)
            })
        }
    } 

    // Get Data from Input: Username & Password and bcrypt Data
    GetToken = (event) => {
        this.setState({
            HTML: []
        })
        event.preventDefault();
        var Token = "$2a$04$eBZPddZ99411Y7ahj5sQYe"
        var GenHash = bcrypt.hash(this.state.UserName+this.state.Password, Token, (err, hash) => {
            fetch('http://localhost:3001/User')
            .then((resp) => (resp).json())
            .then((GetAccount) => {
                var EncryptData = bcrypt.hash(GetAccount.email+GetAccount.password, Token, (err, Hash) => {
                    // Called Function CheckLogin to Check if encrypt Data & encrypt real Data is match
                    this.CheckLogin(hash, Hash);
                });
            })
        });  
    }

    Logout = () => {
        if(this.state.HaveToken === true)
        {
            this.setState({
                HTML:   (<form onSubmit={this.GetToken}>
                        <div>Username</div>
                        <input className="Input-Login" id="UserName" type="text" name="UserName" onChange={this.handleChange}></input>
                        <div>Password</div>
                        <input className="Input-Login" id="Password" type="text" name="Password" onChange={this.handleChange}></input>
                        <br></br>
                        <input type="submit" value="Submit"/>
                        </form>
                        ),
                HaveToken: false,
                UserName: '',
                Password: '',
                Account: (<h4 className="login">Guest User</h4>)
            })
        }
    }

    //*** Generate Components ***//
    render = () => {
        // Get Data from JSON Server
        if (this.state.GetDataFirstTime === true) {
            let text = "http://localhost:3001/Numerical_Method";
            fetch(text)
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        DataFromAPI: data,
                    });
                });
            this.setState({
                GetDataFirstTime: false,
            });
        }

        return (
            <>
                <div className="Super-Background">
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div class="container-fluid">
                            <h5 class="navbar-brand">Numerical Method</h5>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Root Of Equation
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li 
                                        id='Bisection'
                                        class="dropdown-item"
                                        name="Bisection"
                                        onClick={this.CheckChapter}
                                    >
                                        Bisection
                                    </li>
                                    <li
                                        id='False_Position'
                                        className="dropdown-item"
                                        name="False_Position"
                                        onClick={this.CheckChapter}
                                    >
                                        False Position Method
                                    </li>
                                    <li
                                        id='One_Point_Iteration'
                                        className="dropdown-item"
                                        name="One_Point_Iteration"
                                        onClick={this.CheckChapter}
                                    >
                                        One Point Iteration
                                    </li>

                                    <li
                                        id='Newton_Raphson'
                                        className="dropdown-item"
                                        name="Newton_Raphson"
                                        onClick={this.CheckChapter}
                                    >
                                        Newton Raphson
                                    </li>

                                    <li
                                        id='Secant_Method'
                                        className="dropdown-item"
                                        name="Secant_Method"
                                        onClick={this.CheckChapter}
                                    >
                                        Secant Method
                                    </li>
                                </ul>
                                </li>
                            </ul>
                            {/* Chapter 2 */}
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Solution Of Linear Algebraic Equations
                                </button>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li 
                                            id='Cramer_Rule'
                                            class="dropdown-item"
                                            name="BisectCramer_Ruleion"
                                            onClick={this.CheckChapter}
                                        >
                                            Cramer's Rule
                                        </li>
                                        <li
                                            id='Gauss_Elimination'
                                            className="dropdown-item"
                                            name="Gauss_Elimination"
                                            onClick={this.CheckChapter}
                                        >
                                            Gauss Elimination
                                        </li>
                                        <li
                                            id='Gauss_Jordan'
                                            className="dropdown-item"
                                            name="Gauss_Jordan"
                                            onClick={this.CheckChapter}
                                        >
                                            Gauss Jordan
                                        </li>

                                        <li
                                            id='LU_Decompost'
                                            className="dropdown-item"
                                            name="LU_Decompost"
                                            onClick={this.CheckChapter}
                                        >
                                            LU Decomposition Method
                                        </li>

                                        <li
                                            id='Jacobi_Iteration'
                                            className="dropdown-item"
                                            name="Jacobi_Iteration"
                                            onClick={this.CheckChapter}
                                        >
                                            Jacobi Iteration
                                        </li>

                                        <li
                                            id='Gauss_Seidel_Iteration'
                                            className="dropdown-item"
                                            name="Gauss_Seidel_Iteration"
                                            onClick={this.CheckChapter}
                                        >
                                            Gauss Seidel Iteration
                                        </li>

                                        <li
                                            id='Conjugate_Gradient'
                                            className="dropdown-item"
                                            name="Conjugate_Gradient"
                                            onClick={this.CheckChapter}
                                        >
                                            Conjugate Gradient Method
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            {/* Chapter 3 */}
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Interpolation And Extrapolation
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li 
                                            id="Newton's_divided-differences"
                                            class="dropdown-item"
                                            name="Newton's_divided-differences"
                                            onClick={this.CheckChapter}
                                        >
                                            Newton's Divided Differences
                                        </li>
                                        <li
                                            id='Lagrange_Interpolation'
                                            className="dropdown-item"
                                            name="Lagrange_Interpolcation"
                                            onClick={this.CheckChapter}
                                        >
                                            Lagrange Interpolation
                                        </li>
                                        <li
                                            id='Spline'
                                            className="dropdown-item"
                                            name="Spline"
                                            onClick={this.CheckChapter}
                                        >
                                            Spline
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            {/* Chapter 4 */}
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Least-Squares Regression
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li 
                                            id="Linear_Regression"
                                            class="dropdown-item"
                                            name="Linear_Regression"
                                            onClick={this.CheckChapter}
                                        >
                                            Linear Regression
                                        </li>
                                        <li
                                            id='Polynomial_Regression'
                                            className="dropdown-item"
                                            name="Polynomial_Regression"
                                            onClick={this.CheckChapter}
                                        >
                                            Polynomial Regression
                                        </li>
                                        <li
                                            id='Multiple_Linear_Regression'
                                            className="dropdown-item"
                                            name="Multiple_Linear_Regression"
                                            onClick={this.CheckChapter}
                                        >
                                            Multiple Linear Regression
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            {/* Chapter 5 */}
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Numerical Integration And Diffrentiation
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li
                                        id='Single_Trapezoidal_Rule'
                                        className="dropdown-item"
                                        name="Single_Trapezoidal_Rule"
                                        onClick={this.CheckChapter}
                                    >
                                        Single Trapezoidal Rule
                                    </li>

                                    <li
                                        id='Composite_Trapezoidal_Rule'
                                        className="dropdown-item"
                                        name="Composite_Trapezoidal_Rule"
                                        onClick={this.CheckChapter}
                                    >
                                        Composite Trapezoidal Rule
                                    </li>
                                    <hr class="dropdown-divider"></hr>
                                    <li
                                        id='Simpson_Rule'
                                        className="dropdown-item"
                                        name="Simpson_Rule"
                                        onClick={this.CheckChapter}
                                    >
                                        Simpson's Rule
                                    </li>

                                    <li
                                        id='Composite_Simpson_Rule'
                                        className="dropdown-item"
                                        name="Composite_Simpson_Rule"
                                        onClick={this.CheckChapter}
                                    >
                                        Composite Simpson's Rule
                                    </li>
                                    <hr class="dropdown-divider"></hr>
                                    <li 
                                        id="Numerical_Differentiation"
                                        class="dropdown-item"
                                        name="Numerical_Differentiation"
                                        onClick={this.CheckChapter}
                                    >
                                        Numerical Differentiation
                                    </li>
                                </ul>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </nav>
                    {this.state.Account}
                    {this.state.HTML}
                    <div>
                        {this.Input()}
                    </div>
                    <h1>aaaa</h1>
                </div>
            </>
        );
    };
}

export default Home;
