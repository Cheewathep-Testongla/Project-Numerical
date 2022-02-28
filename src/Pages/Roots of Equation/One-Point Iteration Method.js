import React from 'react'

function OnePointIterationMethod() {
    function Cal()
    {
        var total = 10;
        var X = 0;
        var temp_X = 0;
        var Criterion = 0.000001;
        var Xn = 0.5-X;
        var Cal_Crite = Math.abs((Xn-X)/Xn);
        while(total > Criterion)
        {   
            temp_X = X;
            Xn = 0.5-X;
            Cal_Crite = Math.abs((Xn-X)/Xn);
            if(Cal_Crite > Criterion)
            {
                total = Cal_Crite;
                X = Xn;
            }
            if(Cal_Crite === Infinity)
            {
                console.log(temp_X+" "+Cal_Crite);
                break;
            }
           return temp_X;
        }
    }
    return (
        <div>
            <p>
                OnePointIterationMethod
                <body>
                    <p>Assignment 1 : Roots Of Equations</p>
                    {Cal()}
                </body>
            </p>
        </div>
    )
}

export default OnePointIterationMethod
