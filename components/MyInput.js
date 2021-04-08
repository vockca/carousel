import React from 'react';


const MyInput = (props) =>{

    return(

        <div id={props.id+'Container'}>
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} type={props.type} {...props} />
            <div className={'error'} id={'errorOf'+props.id} hidden={true}> Insert a correct value</div>
        </div>
    )
}


export default MyInput;