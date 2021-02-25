import React, { Component } from 'react';

import AppBar from "./AppBar";
import PerferenceForm from "./PerferenceForm";
import MainState from "../enums/MainState";

class Main extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            mainState: MainState.ENTER_PREFERENCES
        };
    }

    updateMainState = (mainState) => {
        this.setState({
            mainState
        });
    }

    render() {
        return (
            <div>
                <AppBar updateMainState={this.updateMainState}/>
                {this.state.mainState == MainState.ENTER_PREFERENCES && <PerferenceForm />}
            </div>
        )
    }
}

export default Main;