import React, { useState, useCallback, useRef} from 'react';

import produce from "immer";

// Components
import Grid from "./Grid";

let rows = 30;
let cols = 50;
let speed = 100;
const gridArray = Array(rows).fill().map(() => Array(cols).fill(false));

const Main =() => {

    const [gridFull, setGridFull] = useState(gridArray);
    const [running, setRunning] = useState(false);
    const [generation, setGeneration] = useState(0);
    const runningRef = useRef(running);
    runningRef.current = running;

    const increment = () => {
        setGeneration(generation => generation + 1)
    };

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        setGridFull( originalGrid => {
            return produce(originalGrid, gridCopy => {
                for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
                    for (let colIndex = 0; colIndex < cols; colIndex++) {
                        let count = 0;
                        if (rowIndex > 0)
                        {
                            if (originalGrid[rowIndex - 1][colIndex])
                            {
                                count++;
                            }
                        }
                        if (rowIndex > 0 && colIndex > 0)
                        {
                            if (originalGrid[rowIndex - 1][colIndex - 1])
                            {
                                count++;
                            }
                        }
                        if (rowIndex > 0 && colIndex < cols - 1)
                        {
                            if (originalGrid[rowIndex - 1][colIndex + 1])
                            {
                                count++;
                            }
                        }
                        if (colIndex < cols - 1)
                            if (originalGrid[rowIndex][colIndex + 1])
                                count++;
                        if (colIndex > 0)
                        {
                            if (originalGrid[rowIndex][colIndex - 1])
                            {
                                count++;
                            }
                        }
                        if (rowIndex < rows - 1)
                        {
                            if (originalGrid[rowIndex + 1][colIndex])
                            {
                                count++;
                            }
                        }
                        if (rowIndex < rows - 1 && colIndex > 0)
                        {
                            if (originalGrid[rowIndex + 1][colIndex - 1])
                                {
                                    count++;
                                }
                        }
                        if (rowIndex < rows - 1 && colIndex < cols - 1)
                        {
                            if (originalGrid[rowIndex + 1][colIndex + 1])
                            {
                                count++;
                            }
                        }
                        if (originalGrid[rowIndex][colIndex] && (count < 2 || count > 3))
                        {
                            gridCopy[rowIndex][colIndex] = false;
                        }
                        if (!originalGrid[rowIndex][colIndex] && count === 3)
                        {
                            gridCopy[rowIndex][colIndex] = true;
                        }
                    }
                }
            })
        });
        increment();
        setTimeout(runSimulation, speed);
    }, []);


    const selectBox = (row, col) => {
        let gridCopy = JSON.parse(JSON.stringify(gridFull));
        gridCopy[row][col] = !gridCopy[row][col];
        setGridFull(gridCopy)
    };

    const handleRandomSeed = () => {
        let gridCopy = JSON.parse(JSON.stringify(gridArray));
        for (let rowIndex = 0; rowIndex < rows ; rowIndex++)
        {
            for (let colsIndex = 0; colsIndex < cols ; colsIndex++)
            {
                if (Math.floor(Math.random() * 4) === 1)
                {
                    gridCopy[rowIndex][colsIndex] = true
                }
            }
        }
        setGridFull(gridCopy);
        setGeneration(0);
        setRunning(false);
    };

    const handleReset = () => {
        let gridCopy = JSON.parse(JSON.stringify(gridArray));
        for (let rowIndex = 0; rowIndex < rows ; rowIndex++)
        {
            for (let colsIndex = 0; colsIndex < cols ; colsIndex++)
            {
                if (Math.floor(Math.random() * 4) === 1)
                {
                    gridCopy[rowIndex][colsIndex] = false
                }
            }
        }
        setGridFull(gridCopy);
        setGeneration(0);
        setRunning(false);
    }

    return (
        <div>
            <h1> Game of Life</h1>

            <div className="container">

                <div className="col">
                    <div className="col text-center">
                        <button
                            className={running? "btn btn-danger mr-1": "btn btn-primary mr-1"}
                            style={{fontWeight: "bold", color: "black"}}
                            onClick={() => {
                                setRunning(!running);
                                if (!running) {
                                    runningRef.current = true;
                                    runSimulation();
                                }
                            }}
                        >
                            {running ? "stop" : "start"}
                        </button>

                        <button  className="btn btn-warning mr-1" onClick={handleRandomSeed} style={{fontWeight: "bold"}}> Seed</button>
                        <button  className="btn btn-secondary mr-1" onClick={handleReset} style={{fontWeight: "bold", color: "black"}}> Reset</button>
                    </div>
                </div>


            </div>

            <Grid rows={rows} cols={cols} speed={speed} gridFull={gridFull} selectBox={selectBox} />
            <h2> Generation: {generation}</h2>
        </div>
    );
};


export default Main;
