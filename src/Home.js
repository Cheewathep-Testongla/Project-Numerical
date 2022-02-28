import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Panel.css";
import raw from "./JSON/Chapter.json";
import Testclass from "./Testclass.js";

function Home() {
    var test = new Testclass;
    /* เอาไว้ใช้ตอนจะคำนวณหลังกรอกข้อมูลเสร็จแล้ว <h1>< test.Bisection/></h1> */
    function Create_Block() {
        return (
            <h1>Hello</h1>
        );
    }
    var arr = [];
    // function Create_Block() {
    //     const chapter = new Map(Object.entries(raw.RootsofEquations));
    //     for (const key of chapter.values()) {
    //     arr.push(
    //         <Link to={"/" + key}>
    //         <h1 className="block" id={key}>
    //             {key}
    //         </h1>
    //         </Link>
    //     );
    //     }
    //     return arr;
    // }
    return (
        <div>
            <div className="super-header">
                <div className="header">
                    <h1>Numerical Method</h1>
                </div>
            </div>
            {/* <div className="home" >{< test.Bisection/> }</div> */}
            <div className="home" >
                <button >Bisection</button>
            </div>
        </div>
    );
}
export default Home;
