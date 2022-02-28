import React from "react";

function FalsePositionMethod() {
  function Cal() {
    var total = 10;
    var L = 0.02;
    var R = 0.03;
    var Criterion = 0.000001;
    while (total > Criterion) 
    {
      var X = (L * (43 * R - 1) - R * (43 * L - 1)) / (43 * R - 1 - (43 * L - 1));
      var YR = 43 * R - 1;
      var YX = 43 * X - 1;
      if (YX * YR < 0) {
        total = Math.abs((X - L) / X);
        L = X;
      } else {
        total = Math.abs((X - R) / X);
        R = X;
      }
      return (X + " " + total.toFixed(9));
    }
  }
  return (
    <div>
      <p>FalsePositionMethod</p>
      <body>
        <p>Assignment 1 : Roots Of Equations</p>
        {Cal()}
      </body>
    </div>
  );
}

export default FalsePositionMethod;
