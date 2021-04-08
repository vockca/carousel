import React, {Component} from 'react';
import Remoter from "./Remoter";
import RadioSwitchers from "./RadioSwitchers";
import CarouselItem from "./Carouseltem";

import '../styles/contentList.css';



class ContentList extends Component{

    initialState={
        shiftMouseX: 0,
        shiftTouchX: 0,
        carouselPosition:0,
        firstTouch: 0,
        lastTouch: 0,
    }

    state = this.initialState;


    componentDidMount() {
//moves carousel to start position
        this.movePicture(1);
    }


    dragStartTouch =(event)=>{
//function that handles the touchstart event on unnumbered list
        const dragElem = event.currentTarget;

//finds the current carousel elem we dragging
        const draggingElem = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);

        if(draggingElem.id.substr(0,1) === '0' ||
            draggingElem.id.substr(0,1) === (this.props.contentArray.length-1) +''){
//checks if the current elem is the last or the first in the carousel to prevent the swipespamming
            return;
        }

//removes transition to freely drag elems
        dragElem.classList.add('no-transition');

//adds eventlisteners to handle corresponding events
        dragElem.addEventListener("touchmove", this.moveTouch);
        dragElem.addEventListener("touchend", this.stopTouch);


        let firstTouch = event.touches[0].clientX;

//finds the distance between first touch and current style.left position of carousel
        let diffX =  event.touches[0].pageX - this.state.carouselPosition;
        this.setState({firstTouch: firstTouch});

//pos elem under the touch or cursor
        this.moveUnderCursor(event.currentTarget, firstTouch, diffX);
    }


    moveTouch =(event)=> {

        const dragElem = event.currentTarget;

//finds the distance between first touch and current style.left position of carousel
        let diffX = this.state.firstTouch - this.state.carouselPosition;

//every move event pos carousel to be under the cursor or touch
        this.moveUnderCursor(dragElem, event.touches[0].pageX, diffX);

//defines every touch as a last touch in case it would be really the last touch otherwise it will be rewritten
        this.setState({lastTouch: event.touches[0].pageX});
    }


    stopTouch =(event)=>{

        const dragElem = event.currentTarget;
        const firstTouch = this.state.firstTouch;
        const lastTouch = this.state.lastTouch;

//clears the handlers
        dragElem.removeEventListener('touchmove', this.dragMove);
        dragElem.removeEventListener('touchend', this.dragStop);
        
//gets the string with swipe direction and moves the carousel
        this.swipeMover(this.swipeDetector(firstTouch, lastTouch, 100));
        
//removes the class to provide animation to further nondrag carousel moving
        dragElem.classList.remove('no-transition');
    }


    dragStart =(event)=>{
        
        event.preventDefault();
        const carousel = event.currentTarget;
        const draggingElem = document.elementFromPoint(event.clientX, event.clientY);

        if(draggingElem.id.substr(0,1) === '0' ||
            draggingElem.id.substr(0,1) === '' +(this.props.contentArray.length-1)){
//checks if the current elem is the last or the first in the carousel to prevent the swipespamming
            return;
        }
        
        this.setState({firstTouch: event.pageX})

//removes transition to freely drag elems
        carousel.classList.add('no-transition');

//finds the distance between first touch and current style.left position of carousel
        const shiftX = event.pageX -  this.state.carouselPosition;

        this.setState({shiftMouseX : shiftX});

        this.moveUnderCursor(carousel, event.pageX, shiftX);

        carousel.addEventListener('mousemove', this.dragMove);
        carousel.addEventListener('mouseup', this.dragStop);
        carousel.addEventListener('mouseleave', this.dragStop);
    }


    moveUnderCursor =(elem, pageX, shiftX)=>{
//gets elem , position and shift from that position to desirable style.left of elem
        elem.style.left =pageX - shiftX  +'px';
    }


    dragMove =(event) =>{

        const dragElem = event.currentTarget;
        const shiftMouseX = this.state.shiftMouseX;

        dragElem.style.cursor = 'move';

        this.moveUnderCursor(dragElem, event.pageX, shiftMouseX);

        event.preventDefault();
    };


    dragStop = (event) =>{

        const dragElem = event.currentTarget;

        dragElem.removeEventListener('mousemove', this.dragMove);
        dragElem.removeEventListener('mouseup', this.dragStop);
        dragElem.removeEventListener('mouseleave', this.dragStop);

//gets the string with swipe direction and moves the carousel
        this.swipeMover(this.swipeDetector(this.state.firstTouch, event.pageX, 100));

        dragElem.classList.remove('no-transition');
    }


    swipeDetector = (firstTouch, lastTouch, swipeLength) =>{
//gets pos of first touch and last touch and the distance from which swipe considered as a successful and return the string with the name
        if(firstTouch-lastTouch>swipeLength) return 'leftSwipe';
        else if(lastTouch-firstTouch>swipeLength) return 'rightSwipe';
        else return 'noSwipe';
    }
    

    swipeMover = (whichSwipe)=>{
 //gets a type of swipe and moves carousel
        switch (whichSwipe) {
            case 'rightSwipe':
                if(this.props.setContentNumber(this.props.contentNumber-1) === 'deny') return;
                setTimeout(()=>this.movePicture(-1), 0);
                break;
            case 'leftSwipe':
                if(this.props.setContentNumber(this.props.contentNumber+1) === 'deny') return;
                setTimeout(()=>this.movePicture(1), 0);
                break;
            case 'noSwipe':
                this.movePicture(0);
                break;
        }
    }
   


    givePosition = (elem, shift) =>{
        //gets elem and shifts it, your captain
        const elemWidth = elem.offsetWidth;
        elem.style.left = this.state.carouselPosition - elemWidth * shift  +'px';
        this.setState({carouselPosition:this.state.carouselPosition - elemWidth * shift});
    }


    movePicture = (shift) =>{

        let {contentNumber, contentArray} = this.props;
        let carousel = document.getElementById('myCarousel');

//if the carousel has no-transition class it adds it to provide animation
        if(carousel.classList.contains('no-transition')) {
            carousel.classList.remove('no-transition');
        }

        this.givePosition(carousel, shift);

// checks if the current carousel item is the lst and it should be moved to the first to provide looping
       this.loopContent(carousel,contentNumber, contentArray.length-1)
    }


    loopContent =(elem, contentNumber, maxLength)=>{
// checks if the current carousel item is the lst and it should be moved to the first to provide looping
        if(contentNumber === 0 || contentNumber === maxLength){

            let finalContentNumber = contentNumber === 0 ? maxLength-1 : 1;
            let oldContentNumber = contentNumber;
            this.props.setContentNumber(finalContentNumber);

            setTimeout(()=>{
                elem.classList.add('no-transition');
                this.givePosition(elem, finalContentNumber-oldContentNumber);
                elem.addEventListener('mousedown', this.dragStart);
            },470);
        }
    }

    render() {

        let contentArray = this.props.contentArray.map((item, index) =>{
            return (<CarouselItem contentNumber={this.props.contentNumber} key={index} id={index} item={item}/>);
        });

        return(
            <>
                <div id={'galleryContainer'}>
                    <div id={'gallery'}>
                        <ul className={'carousels'} id={'myCarousel'}
                            onMouseDown={this.dragStart}
                            onTouchStart={this.dragStartTouch}
                        >
                            {contentArray}
                        </ul>
                    </div>
                </div>

                <RadioSwitchers setContentNumber = {this.props.setContentNumber}
                                contentNumber = {this.props.contentNumber}
                                contentArray = {this.props.contentArray}
                                movePicture = {(shift)=>this.movePicture(shift)}
                />

                <Remoter setContentNumber = {this.props.setContentNumber}
                         contentNumber = {this.props.contentNumber}
                         contentArray = {this.props.contentArray}
                         movePicture={(shift)=>this.movePicture(shift)}
                />
            </>
        );
    }
}


export default ContentList;
