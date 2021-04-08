import React, { Component } from 'react';

import ContentList from "./ContentList";
import MyForm from "./MyForm";

import '../styles/App.css';


class App extends Component{

    initialState = {
        contentNumber: 1,
        content:[{URL: 'files/124.jpg', kind: 'img'}, {URL:'files/125.jpg', kind: 'img'}, {URL:'files/rabbit320.webm', kind: 'video'}],
        shownContent: null,
    }

    state = this.initialState;


    componentDidMount() {
//clones the last and the first elements to show them when carousel items will end
        this.setState({shownContent: this.contentWrapper(this.state.content)});
    }

    contentAdder = (myFile) =>{

        this.setState({content : [...this.state.content, myFile ]});
    }

    
    contentWrapper = (arr) =>{
//clones the last and the first elements to show them when carousel items will end
        let carouselContent = [arr[arr.length-1], ...arr, arr[0]];
//probably should do more proper copying cuz the method above copying it with problems to identificate it from its clones
        return carouselContent;
    }


    setContentNumber = (num) =>{
// defines which content should be active and return deny or success to verify action

        if(isNaN(num) || num<0 || num>this.state.content.length+1){
//checks if the setting number is valid
            return 'deny';
        }

        this.setState({ contentNumber: num });
        return 'success';
    }


    render(){
//wraps the content to provide it to child elements
        const carouselContentArray = this.contentWrapper(this.state.content);

        return(
            <>
                <ContentList contentNumber={this.state.contentNumber}
                             contentArray={carouselContentArray}
                             setContentNumber={this.setContentNumber}
                />
                <MyForm id={'uploadForm'} contentAdder={this.contentAdder}/>
            </>
        );
    }
}


export default App;
