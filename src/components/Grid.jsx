import React from 'react';

//Components
import Box from "./Box";

const Grid =({cols, rows, speed, gridFull, selectBox}) => {
    const width =  (cols * 16) + 1;
    let rowsArr = [];
    let boxClass = "";

    for (let i = 0; i <rows; i++) {
        for (let j = 0; j <cols; j++) {
            let boxId = i + "_" + j;

            boxClass = gridFull[i][j]? "game-box on": "game-box off";
            rowsArr.push(
                <Box
                boxClass={boxClass}
                key={boxId}
                row={i}
                col={j}
                selectBox={selectBox}
                />
            )
        }
    }

    return (
        <div className="game-grid" style={{ width}}>
            {rowsArr}
        </div>
    );
};


export default Grid;
