import React from "react";

function BisectionMethod() {
  function Cal() {
    var total = 10;
    var L = 1.5;
    var R = 2;
    var M = (L + R) / 2;
    var YR = Math.pow(R, 4) - 13;
    var YM = Math.pow(M, 4) - 13;
    while (total > 0.000001) {
      M = (L + R) / 2;
      YR = Math.pow(R, 4) - 13;
      YM = Math.pow(M, 4) - 13;
      if (YM * YR < 0) {
        total = Math.abs((M - L) / M);
        L = M;
      } else {
        total = Math.abs((M - R) / M);
        R = M;
      }
      // console.log(total)
      console.log(M);
      // document.getElementById("Answer").innerHTML = M.toFixed(6);
    }
    return <p>{M.toFixed(6)}</p>;
    function DrawGraph() {
    }
  }
  return (
    <div>
      <p>BisectionMethod</p>
      <body>
        <p>Assignment 1 : Roots Of Equations</p>
        {Cal()}
      </body>
    </div>
  );
}

export default BisectionMethod;
