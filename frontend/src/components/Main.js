import React, { Component } from 'react';

import AppBar from "./AppBar";
import PreferenceForm from "./PreferenceForm";
import ViewAllocation from "./ViewAllocation";
import MainState from "../enums/MainState";
import CommonConstant from "../util/CommonConstant";

import ClipLoader from "react-spinners/ClipLoader";
const axios = require('axios');

class Main extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            mainState: MainState.VIEW_ALLOCATIONS_LOADING
        };
    }

    componentDidMount() {
        //this.getPreferenceFormInfo();
        //will call getAllocation() within the ViewAllocation page itself
    }
    
    /**
     * Handle anything when UI state changed
     **/
    componentDidUpdate() {
        //Fetch allocation list when View Allocation tab is clicked
        //Only fetch when the list is still empty (first time) or preferences are updated to avoid redundant expensive calls
        if(this.state.mainState == MainState.VIEW_ALLOCATIONS) {
            if(this.state.allocationInfo) {
                this.setState({
                    mainState: MainState.VIEW_ALLOCATIONS_LOADING
                });
            } 
        }
    }

    getPreferenceFormInfo() {
        axios.get(CommonConstant.SIAS_API_PREFIX + CommonConstant.SIAS_PREFERENCE_INFO_API)
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
            preferenceInfo: response.data
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

    submitPreference = (preference) => {
        console.log(preference);
        this.updateMainState(MainState.ENTER_PREFERENCES_LOADING);

        axios.post(CommonConstant.SIAS_API_PREFIX + CommonConstant.SIAS_PREFERENCE_ADD_API, preference)
        .then(this.submitPreferenceFormResponse)
        .catch(this.error)
        .then(function () {
            // always executed
        });
    }

    submitPreferenceFormResponse = (response) => {
        console.log(response.data);
        //this.updateMainState(MainState.ENTER_PREFERENCES);
        //reset the allocationInfo so it can be re-fetched
        this.state.allocationInfo = null
        this.setState({
            mainState: MainState.ENTER_PREFERENCES_SUCCESS
        });
    }

    render() {
        let page;
        
        //TODO: Temporary linkage
        if(this.state.mainState == MainState.ENTER_PREFERENCES || this.state.mainState == MainState.ENTER_PREFERENCES_SUCCESS) {
            page = <PreferenceForm preferenceInfo={this.state.preferenceInfo} submitPreference={this.submitPreference} showPreferenceSubmitted={this.state.mainState == MainState.ENTER_PREFERENCES_SUCCESS}/>
            {this.state.mainState == MainState.ENTER_PREFERENCES_LOADING && <ClipLoader loading={true} size={150} />}
        } else if(this.state.mainState == MainState.VIEW_ALLOCATIONS_LOADING) {
            console.log('Main', this.state.allocationInfo);
            page =  <ViewAllocation/>
        }
                
        return (
            <div>
                <AppBar updateMainState={this.updateMainState}/>
                {page}
            </div>
        )
    }
}

export default Main;