import React, { Component } from 'react';

import AppBar from "./AppBar";
import PerferenceForm from "./PerferenceForm";
import MainState from "../enums/MainState";
import CommonConstant from "../util/CommonConstant";

import ClipLoader from "react-spinners/ClipLoader";
const axios = require('axios');

class Main extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            mainState: MainState.ENTER_PREFERENCES_LOADING
        };
    }

    componentDidMount() {
        this.getPerferenceFormInfo();
    }

    getPerferenceFormInfo() {
        axios.get(CommonConstant.SIAS_API_PREFIX + CommonConstant.SIAS_INFO_API)
        .then(this.updatePreferenceForm)
        .catch(this.error)
        .then(function () {
            // always executed
        });
    }

    updatePreferenceForm = (response) => {
        console.log(response.data);
        //this.updateMainState(MainState.ENTER_PREFERENCES);
        this.setState({
            mainState: MainState.ENTER_PREFERENCES,
            perferenceInfo: response.data
        });
    }

    handleError = (error) => {
        console.log(error);
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
                {this.state.mainState == MainState.ENTER_PREFERENCES && <PerferenceForm perferenceInfo={this.state.perferenceInfo}/>}
                {this.state.mainState == MainState.ENTER_PREFERENCES_LOADING && <ClipLoader loading={true} size={150} />}
            </div>
        )
    }
}

export default Main;