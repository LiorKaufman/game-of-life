import React, {useEffect, useState} from 'react';

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
        console.log(row, col)
        setGridFull(gridCopy)
    };

    const seedBoxes = () => {
        let gridCopy = JSON.parse(JSON.stringify(gridFull));
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
        setGridFull(gridCopy)
    };


    const checkBoard = () => {
        let gridCopy = JSON.parse(JSON.stringify(gridFull));
        for (let rowIndex = 0; rowIndex < rows ; rowIndex++)
        {
            for (let colsIndex = 0; colsIndex < cols ; colsIndex++)
            {
                let neighbourCounter = 0;

                // Not by the edges:
                if ( rowIndex > 0 && rowIndex < rows && colsIndex > 0 && colsIndex < cols)
                {

                    // Top, right, down, left
                    neighbourCounter = gridFull[rowIndex + 1][colsIndex]? neighbourCounter++: neighbourCounter;
                    neighbourCounter = gridFull[rowIndex][colsIndex + 1]? neighbourCounter++: neighbourCounter;
                    neighbourCounter = gridFull[rowIndex - 1][colsIndex]? neighbourCounter++: neighbourCounter;
                    neighbourCounter = gridFull[rowIndex][colsIndex - 1]? neighbourCounter++: neighbourCounter;
                    // Top left, top right, bottom right, bottom left
                    neighbourCounter = gridFull[rowIndex + 1][colsIndex - 1]? neighbourCounter++: neighbourCounter;
                    neighbourCounter = gridFull[rowIndex + 1][colsIndex + 1]? neighbourCounter++: neighbourCounter;
                    neighbourCounter = gridFull[rowIndex - 1][colsIndex + 1]? neighbourCounter++: neighbourCounter;
                    neighbourCounter = gridFull[rowIndex - 1][colsIndex - 1]? neighbourCounter++: neighbourCounter;

                }

                // Top row



                switch (neighbourCounter) {
                    case 1:
                        gridCopy[rowIndex][colsIndex] = false;
                        break;

                    case 3:
                        if (!gridFull[rowIndex][colsIndex]){
                            gridCopy[rowIndex][colsIndex] = true;
                        }
                        break;

                    case neighbourCounter > 3:
                        if (gridFull[rowIndex][colsIndex])
                        {
                            gridCopy[rowIndex][colsIndex] = false;
                        }

                    default:
                        gridCopy[rowIndex][colsIndex] = false;
                        break;
                }

            }
        }

        setGridFull(gridCopy)

    };

    const playButton = () => {
        setInterval()
    }

    const play = () => {
        let gridCopy1 = gridFull
        let gridCopy2 = JSON.parse(JSON.stringify(gridFull))
        
    }



    useEffect(() => {
        seedBoxes()
    }, [])

    return (
        <div>
            <h1> Game of Life</h1>
            <Grid rows={rows} cols={cols} speed={speed} gridFull={gridFull} selectBox={selectBox} />
            <h2> Generation: {generation}</h2>
        </div>
    );
};


export default Main;
