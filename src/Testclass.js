import React from "react";
import { evaluate } from "mathjs";

class Testclass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            left: 0,
            right: 0,
            equation: "",
            size: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const Criterion = 0.000001;
    }

    handleChange(event) {
        // Get multiple input to
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value,
        });
    }

    Convert_Eq(Eq, Var) {
        console.log(Eq + " " + Var);
        Eq = Eq.replace("x", Var);
        return evaluate(Eq);
    }

    Bisection() {
        // var total = 10;
        // var L = this.state.left;
        // var R = this.state.right;
        // var Eq = this.state.equation;
        // var M = (L + R) / 2;
        // var YR = this.Convert_Eq(Eq, R);
        // var YM = this.Convert_Eq(Eq, M);
        // while (total > this.Criterion) {
        //     M = (L + R) / 2;
        //     YR = this.Convert_Eq(Eq, R);
        //     YM = this.Convert_Eq(Eq, M);
        //     if (YM * YR < 0) {
        //         total = Math.abs((M - L) / M);
        //         L = M;
        //     } else {
        //         total = Math.abs((M - R) / M);
        //         R = M;
        //     }
        //     console.log(Eq + " " + total);
        // }
        // document.getElementById("Answer").innerHTML =
        //     "Result : " + M.toFixed(6);
        return (
            <h1>Bisection</h1>
        );
    }

    // False_Position() {
    //     var total = 10;
    //     var L = this.state.left;
    //     var R = this.state.right;
    //     var Eq = this.state.equation;
        // while (total > this.Criterion) {
        //     var X =
        //         (L * (43 * R - 1) - R * (43 * L - 1)) /
        //         (43 * R - 1 - (43 * L - 1));
        //     var YR = 43 * R - 1;
        //     var YX = 43 * X - 1;
        //     if (YX * YR < 0) {
        //         total = Math.abs((X - L) / X);
        //         L = X;
        //     } else {
        //         total = Math.abs((X - R) / X);
        //         R = X;
        //     }
        //     return X + " " + total.toFixed(9);
        // }
    // }

    JacobiIteration() {
        return (
            <h1>Jacobi Iteration</h1>
        )
    }
    handleSubmit(event) {
        this.Bisection();
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Equation:{" "}
                    <input
                        type="text"
                        name="equation"
                        onChange={this.handleChange}
                    />
                    L:{" "}
                    <input
                        type="text"
                        name="left"
                        onChange={this.handleChange}
                    />
                    R:{" "}
                    <input
                        type="text"
                        name="right"
                        onChange={this.handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
                <h1>
                    {this.state.equation}, {this.state.left}, {this.state.right}
                </h1>
                <h1 id="Answer" />
                {/* <h1 id='All_Answer'/> */}
            </form>
        );
    }
}
export default Testclass;
