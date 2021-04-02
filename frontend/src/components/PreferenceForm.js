import React, { Component } from 'react';
import './PreferenceForm.css'

import { 
    Button,
    Form, 
    FormGroup, 
    FormInput,
    FormSelect,
    Slider
} from "shards-react";

class PreferenceForm extends Component {
    render() {
        return (
            <div className="pfContent">
                <h1 style={{color:"#555555"}}>Preferences</h1>
                <Form>
                    <FormGroup>
                        <div className="pfPreferenceBlock">
                            {/*<label htmlFor="name">Name</label>
                            <FormInput className="nameInput" id="name" placeholder="Enter Name" theme="dark"/>*/}
                            <label>Name</label>
                            <FormSelect>
                                {this.props.preferenceInfo.staff.map((s, i) => (
                                    <option value={s}>{s}</option>
                                ))}
                            </FormSelect>
                        </div>
                        <br />
                        <br />
                        <div className="pfPreferenceBlock">
                            <label>Preference 1</label>
                            <FormSelect>
                                {this.props.preferenceInfo.duty.map((d, i) => (
                                    <option value={i}>{d.day + " " + d.time + " " + d.module + " " + d.room + " " + d.type}</option>
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
                            <label>Preference 2</label>
                            <FormSelect>
                                {this.props.preferenceInfo.duty.map((d, i) => (
                                    <option value={i}>{d.day + " " + d.time + " " + d.module + " " + d.room + " " + d.type}</option>
                                ))}
                            </FormSelect>
                        </div>
                        <br />
                        <br />
                        <div className="pfPreferenceBlock">
                            <label>Preference 3</label>
                            <FormSelect>
                                {this.props.preferenceInfo.duty.map((d, i) => (
                                    <option value={i}>{d.day + " " + d.time + " " + d.module + " " + d.room + " " + d.type}</option>
                                ))}
                            </FormSelect>
                        </div>
                        <br />
                        <br />
                        <Button>Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default PreferenceForm;