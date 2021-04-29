import React, { Component } from 'react';
import './PreferenceForm.css'

import { 
    Button,
    Collapse,
    Form, 
    FormGroup, 
    FormInput,
    FormSelect,
    Slider
} from "shards-react";

class PreferenceForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            showPreferenceSubmitted: false,
            staff: '',
            preference1: 0,
            preference2: 1,
            preference3: 2
        };
    }

    componentDidMount() {
        //if (this.props.preferenceInfo.staff[0] in this.props.preferenceInfo.preference) {
        let pIndex = this.props.preferenceInfo.preference.map(p => p.staff).indexOf(this.props.preferenceInfo.staff[0]);
        if (pIndex != -1) { 
            console.log("Staff found: " + this.props.preferenceInfo.staff[0]);
            this.setState({
                showPreferenceSubmitted: this.props.showPreferenceSubmitted,
                staff: this.props.preferenceInfo.staff[0],
                preference1: this.props.preferenceInfo.duty.map(d => d.id).indexOf(this.props.preferenceInfo.preference[pIndex].preferences[0]),
                preference2: this.props.preferenceInfo.duty.map(d => d.id).indexOf(this.props.preferenceInfo.preference[pIndex].preferences[1]),
                preference3: this.props.preferenceInfo.duty.map(d => d.id).indexOf(this.props.preferenceInfo.preference[pIndex].preferences[2])
            });
        }
        else {
            console.log("Staff not found: " + this.props.preferenceInfo.staff[0]);
            this.setState({
                showPreferenceSubmitted: this.props.showPreferenceSubmitted,
                staff: this.props.preferenceInfo.staff[0],
            });
        }

        setTimeout(() => {
            this.setState({
                showPreferenceSubmitted: false
            });
        }, 5000);
    }

    staffValueOnChange = (event) => {
        let pIndex = this.props.preferenceInfo.preference.map(p => p.staff).indexOf(event.target.value);
        if (pIndex != -1) { 
            this.setState({
                staff: event.target.value,
                preference1: this.props.preferenceInfo.duty.map(d => d.id).indexOf(this.props.preferenceInfo.preference[pIndex].preferences[0]),
                preference2: this.props.preferenceInfo.duty.map(d => d.id).indexOf(this.props.preferenceInfo.preference[pIndex].preferences[1]),
                preference3: this.props.preferenceInfo.duty.map(d => d.id).indexOf(this.props.preferenceInfo.preference[pIndex].preferences[2])
            });
        }
        else {
            this.setState({staff: event.target.value});
        }
    }

    preference1ValueOnChange = (event) => {
        this.setState({preference1: event.target.value});
    }

    preference2ValueOnChange = (event) => {
        this.setState({preference2: event.target.value});
    }

    preference3ValueOnChange = (event) => {
        this.setState({preference3: event.target.value});
    }

    render() {
        let p1 = 1;
        let p2 = 2;
        let p3 = 3;
        if (this.state.staff in this.props.preferenceInfo.preference) {
            p1 = this.props.preferenceInfo.duty.map(d => d.id).indexOf(this.props.preferenceInfo.preference.preferences[0]);
            p2 = this.props.preferenceInfo.duty.map(d => d.id).indexOf(this.props.preferenceInfo.preference.preferences[1]);
            p3 = this.props.preferenceInfo.duty.map(d => d.id).indexOf(this.props.preferenceInfo.preference.preferences[2]);
        }

        return (
            <div className="pfContent">
                <h1 style={{color:"#555555"}}>Preferences</h1>
                <Collapse open={this.state.showPreferenceSubmitted}>
                    <div className="pfPreferenceAddStatusSuccess">
                        Preference Submitted
                    </div>
                </Collapse>
                <Form>
                    <FormGroup>
                        <div className="pfPreferenceBlock">
                            {/*<label htmlFor="name">Name</label>
                            <FormInput className="nameInput" id="name" placeholder="Enter Name" theme="dark"/>*/}
                            <label>Name</label>
                            <FormSelect value={this.state.staff} onChange={this.staffValueOnChange}>
                                {this.props.preferenceInfo.staff.map((s, i) => (
                                    <option key={i} value={s}>{s}</option>
                                ))}
                            </FormSelect>
                        </div>
                        <br />
                        <br />
                        <div className="pfPreferenceBlock">
                            <label>Preference 1 (Day, Time, Module, Room, Role)</label>
                            <FormSelect value={this.state.preference1} onChange={this.preference1ValueOnChange}>
                                {this.props.preferenceInfo.duty.map((d, i) => (
                                    <option key={i} value={i}>{d.day + " " + d.time + " " + d.module + " " + d.room + " " + d.type}</option>
                                ))}
                            </FormSelect>
                            {/*<Slider className="preferenceInput1" 
                                    connect={[true, false]} 
                                    start={[5]} 
                                    range={{ min: 1, max: 5 }} 
                                    step={1}
                                pips={{ mode: "steps", stepped: true, density: 20 }} />*/}
                        </div>
                        <br />
                        <br />
                        <div className="pfPreferenceBlock">
                            <label>Preference 2 (Day, Time, Module, Room, Role)</label>
                            <FormSelect value={this.state.preference2} onChange={this.preference2ValueOnChange}>
                                {this.props.preferenceInfo.duty.map((d, i) => (
                                    <option key={i} value={i}>{d.day + " " + d.time + " " + d.module + " " + d.room + " " + d.type}</option>
                                ))}
                            </FormSelect>
                        </div>
                        <br />
                        <br />
                        <div className="pfPreferenceBlock">
                            <label>Preference 3 (Day, Time, Module, Room, Role)</label>
                            <FormSelect value={this.state.preference3} onChange={this.preference3ValueOnChange}>
                                {this.props.preferenceInfo.duty.map((d, i) => (
                                    <option key={i} value={i}>{d.day + " " + d.time + " " + d.module + " " + d.room + " " + d.type}</option>
                                ))}
                            </FormSelect>
                        </div>
                        <br />
                        <br />
                        <Button onClick={() => {
                            this.props.submitPreference({
                                staff: this.state.staff,
                                preference1: this.props.preferenceInfo.duty[this.state.preference1].id,
                                preference2: this.props.preferenceInfo.duty[this.state.preference2].id,
                                preference3: this.props.preferenceInfo.duty[this.state.preference3].id
                            })
                        }}>Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default PreferenceForm;