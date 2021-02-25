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
                <h1 style={{color:"#555555"}}>Bid</h1>
                <Form>
                    <FormGroup>
                        <div className="pfUsernameBlock">
                            <label htmlFor="name">Name</label>
                            <FormInput className="nameInput" id="name" placeholder="Enter Name" theme="dark"/>
                        </div>
                        <br />
                        <br />
                        <div className="pfPerferenceBlock">
                            <label>Perference 1</label>
                            <FormSelect>
                                <option value="first">Math</option>
                                <option value="second">Physics</option>
                                <option value="third">Chemistry</option>
                            </FormSelect>
                            <Slider className="perferenceInput1" 
                                    connect={[true, false]} 
                                    start={[5]} 
                                    range={{ min: 1, max: 5 }} 
                                    step={1}
                                    pips={{ mode: "steps", stepped: true, density: 20 }} />
                        </div>
                        <br />
                        <br />
                        <div className="pfPerferenceBlock">
                            <label>Perference 2</label>
                            <FormSelect>
                                <option value="first">Math</option>
                                <option value="second" selected >Physics</option>
                                <option value="third">Chemistry</option>
                            </FormSelect>
                            <Slider className="perferenceInput2" 
                                    connect={[true, false]} 
                                    start={[3]} 
                                    range={{ min: 1, max: 5 }} 
                                    step={1}
                                    pips={{ mode: "steps", stepped: true, density: 20 }} />
                        </div>
                        <br />
                        <br />
                        <div className="pfPerferenceBlock">
                            <label>Perference 3</label>
                            <FormSelect>
                                <option value="first">Math</option>
                                <option value="second">Physics</option>
                                <option value="third" selected>Chemistry</option>
                            </FormSelect>
                            <Slider className="perferenceInput3" 
                                    connect={[true, false]} 
                                    start={[1]} 
                                    range={{ min: 1, max: 5 }} 
                                    step={1}
                                    pips={{ mode: "steps", stepped: true, density: 20 }} />
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