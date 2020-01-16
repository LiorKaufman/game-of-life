import React, {useState} from 'react';

// Components

const Box =( {boxClass, id, selectBox,row, col }) => {

    const handleClick = () => selectBox(row, col);

    return (
        <div
            className={boxClass}
            id={id}
            onClick={handleClick}
        />

    );
};


export default Box;
