import React, { Component } from 'react';
import './PerferenceForm.css'

import { 
    Button,
    Form, 
    FormGroup, 
    FormInput,
    FormSelect,
    Slider
} from "shards-react";

class PerferenceForm extends Component {
    render() {
        return (
            <div className="pfContent">
                <h1 style={{color:"#555555"}}>Perferences</h1>
                <Form>
                    <FormGroup>
                        <div className="pfPerferenceBlock">
                            {/*<label htmlFor="name">Name</label>
                            <FormInput className="nameInput" id="name" placeholder="Enter Name" theme="dark"/>*/}
                            <label>Name</label>
                            <FormSelect>
                                {this.props.perferenceInfo.staff.map((s, i) => (
                                    <option value={s}>{s}</option>
                                ))}
                            </FormSelect>
                        </div>
                        <br />
                        <br />
                        <div className="pfPerferenceBlock">
                            <label>Perference 1</label>
                            <FormSelect>
                                {this.props.perferenceInfo.duty.map((d, i) => (
                                    <option value={i}>{d.day + " " + d.time + " " + d.module + " " + d.room + " " + d.type}</option>
                                ))}
                            </FormSelect>
                            {/*<Slider className="perferenceInput1" 
                                    connect={[true, false]} 
                                    start={[5]} 
                                    range={{ min: 1, max: 5 }} 
                                    step={1}
                                pips={{ mode: "steps", stepped: true, density: 20 }} />*/}
                        </div>
                        <br />
                        <br />
                        <div className="pfPerferenceBlock">
                            <label>Perference 2</label>
                            <FormSelect>
                                {this.props.perferenceInfo.duty.map((d, i) => (
                                    <option value={i}>{d.day + " " + d.time + " " + d.module + " " + d.room + " " + d.type}</option>
                                ))}
                            </FormSelect>
                        </div>
                        <br />
                        <br />
                        <div className="pfPerferenceBlock">
                            <label>Perference 3</label>
                            <FormSelect>
                                {this.props.perferenceInfo.duty.map((d, i) => (
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

export default PerferenceForm;