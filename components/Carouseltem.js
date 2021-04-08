import React from "react";

const CarouselItem = (props) => {

    let videoCollection = document.getElementsByTagName('VIDEO');

    //pauses the video, when the carousel item is not active
    if(videoCollection){

        for(let i =0; i<videoCollection.length; i++){
            if(videoCollection[i].id !== props.contentNumber + 'video'){
                videoCollection[i].pause();
            };
        }
    }

    return(
        <li id={props.id +'imgContainer'}> {<props.item.kind  id={props.id + props.item.kind}  src={props.item.URL} controls/>}</li>
    );
}

export default CarouselItem;