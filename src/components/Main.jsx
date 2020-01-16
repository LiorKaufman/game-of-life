import React, {useState} from 'react';

// Components
import Grid from "./Grid";

const Main =() => {
    const [generation, setGeneration] = useState(1);
    const [rows,setRows] = useState(30);
    const [cols, setCols] = useState(50);
    const [speed, setSpeed] = useState(100);

    const gridArray = Array(rows).fill().map(() => Array(cols).fill(false));
    const [gridFull, setGridFull] = useState(gridArray);



    const selectBox = (row, col) => {
        let gridCopy = JSON.parse(JSON.stringify(gridFull));
        gridCopy[row][col] = !gridCopy[row][col];
        setGridFull(gridCopy)
    };

    return (
        <div>
            <h1> Game of Life</h1>
            <Grid rows={rows} cols={cols} speed={speed} gridFull={gridFull} selectBox={selectBox} />
            <h2> Generation: {generation}</h2>
        </div>
    );
};


export default Main;
