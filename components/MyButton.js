import React from 'react';

const MyButton =(props) =>{
    return(
        <button type={props.type}
                   id={props.id}
                   className={'mySwitchButtons'}
                   onClick={props.onclick}
        >
            {props.children}
        </button>
    )
}

export default MyButton;
