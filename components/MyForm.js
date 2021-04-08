import React, {Component} from  'react';
import MyButton from "./MyButton";
import MyInput from "./MyInput";


const submitForm = (event, props) =>{

    let myForm = event.target.form;
    const addingContent = {};

    for(let i=0; i<myForm.elements.length; i++){
//simple validator and adds data to and object to send
        if(myForm.elements[i].name && myForm.elements[i].value.trim() !== '') {

                addingContent[myForm.elements[i].name] = myForm.elements[i].value;
        }
    }

    props.contentAdder(addingContent);

    myForm.reset();
    event.preventDefault();
}





const MyForm = (props) =>{

    return(
            <>
                <form id={props.id}>
                    <select name={'kind'}>
                        <option value={'img'}>Image</option>
                        <option value={'video'}>Video</option>
                    </select>
                    <MyInput id={'imageURL'} name={'URL'} type={'text'} label={'Insert an URL: '} />

                    <MyButton type={'button'} id={'urlButton'} onclick={event => submitForm(event, props)}>Upload</MyButton>
                </form>

            </>
    )
}


export default MyForm;
