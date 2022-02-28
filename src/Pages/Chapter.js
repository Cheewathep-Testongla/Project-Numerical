import React from "react";
import Chapter from "./Chapter.js";
import "../CSS/Panel.css";

function Create_Block() {
  const arr = Chapter.array.Chap[0];
  console.log(arr);
  return (
    <div className="home">
      {/* {arr.map((chap) => (
         <button className="Block">{chap}</button>
      ))} */}
    </div>
  );
}
export default Create_Block;
