import React from 'react';


const RadioSwitchers =(props) =>{

    const contentArray = props.contentArray.map((item, index)=>{

        if(props.contentNumber === index){
            return (<input key={index} type={'radio'} name={'carouselRadio'} checked onChange={(event)=>chooseContent(props, event.target)} data-id={index}  />)
        }

        return (<input key={index} type={'radio'} onChange={(event)=>chooseContent(props, event.target)} data-id={index} name={'carouselRadio'} type={'radio'}/>)
    })

//set elem which should have checked attribute
    setCheckedAtr(props);

    return(

        <div id={'carouselRadio'}>
            {contentArray}
        </div>
    )
}


const chooseContent =(props, elem)=>{

    let id = elem.getAttribute('data-id');
    switchContent(props, id)
}


const switchContent =(props, contentId)=>{

    props.movePicture(contentId - props.contentNumber);
    props.setContentNumber(contentId);
}


const setCheckedAtr =(props)=>{

//gets all inputs that are checked if there are more than 2 then clears them and sets the right one
    let oldCheckedElem = document.querySelectorAll(`input[checked]`);
    if(oldCheckedElem.length<2) return;

    for(let i =0; i<=oldCheckedElem.length-1; i++) {

        oldCheckedElem[i].removeAttribute('checked');
    }

    setTimeout(() => document.querySelector(`input[data-id='${props.contentNumber}']`).setAttribute('checked', 'true'), 0);
}





export default RadioSwitchers;