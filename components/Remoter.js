import React from 'react';
import MyButton from "./MyButton";
import MyInput from "./MyInput";


const Remoter = (props) =>{

    return(

        <div id={'remoter'}>

            <MyButton type={'button'} id={'leftSwipe'} onclick={()=> swipeLeft(props)}>Left</MyButton>

            <form>
                <span>Choose</span>

                <MyInput id={'pictureSetter'} type={'text'} placeholder={props.contentNumber}
                       onChange={(event)=>setEnteredPicture(props, event.target)}
                />

                <span>from {props.contentArray.length-2}</span>
            </form>

            <MyButton type={'button'} id={'rightSwipe'} onclick={() => swipeRight(props)}>Right</MyButton>
        </div>)
}


const swipeLeft =(props) =>{

    disableButtons(document.getElementsByClassName('mySwitchButtons'), 600);
    props.setContentNumber(props.contentNumber-1);
    setTimeout(()=>props.movePicture(-1), 0);
}


const swipeRight =(props) =>{

    disableButtons(document.getElementsByClassName('mySwitchButtons'), 600);
    props.setContentNumber(props.contentNumber+1);
    setTimeout(()=>props.movePicture(1), 0);
}


const setEnteredPicture =(props, input) =>{
//gets the error div of the proper input
    let errorMsg = document.getElementById(`errorOf${input.id}`);
    errorMsg.setAttribute('hidden','true');

//if the unput is empty doesnt show the error msg just do nothing
    if(input.value.toString().trim() === '') return;

//simple validation and if it doesnt pass it, error msg appears
    if(isNaN(+input.value) || input.value <= 0 || input.value > props.contentArray.length-2){

        errorMsg.removeAttribute('hidden');
        return;
    }
//if it passes it sets the value
    props.setContentNumber(input.value);

    props.movePicture(input.value-props.contentNumber);
}


const disableButtons =(buttons, duration)=>{
//disable buttons to prevent spamming
    for(let i =0; i<buttons.length; i++){
        buttons[i].setAttribute('disabled','true')
    }

    setTimeout(()=>{
        for(let i =0; i<buttons.length; i++){
            buttons[i].removeAttribute('disabled');
        }
    }, duration);
}


export default Remoter;
