import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./style.css"
import AddField from './AddField'

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

export default function DataForm({ dataParentToChild }) {

    const operation = [{ key: "GET", color: "blue" }, { key: "PUT", color: "orange" }, { key: "POST", color: "green" }, { key: "DELETE", color: "red" }]
    const [isClicked, setIsClicked] = useState(false)

    //Step OpenApi value
    const [steps, setSteps] = useState([
        {
            label: 'info',
            // info: [{ key: "title", value: "" }, { key: "description", value: "" }, { key: "version", value: "" }],
            info : []
        },
        {
            label: 'tags',
            // tags: [{ key: "name", value: "" }, { key: "description", value: "" }],
            tags : []
        },
        {
            label: 'paths',
            // paths: [{ key: "endPoint", value: "" }],
            paths: [],
            operation: { operation },
            operationObj: {}
        },
        // {
        //     label : 'content',
        //     content : [{key:"mediaType", value : ""}, {key:"schema", value : schema}]
        // }
    ]);

    const [info, setInfo] = useState([{ key: "title", value: "" }, { key: "description", value: "" }, { key: "version", value: "" }]);
    const [tags, setTags] = useState([{ key: "name", value: "" }, { key: "description", value: "" }]);
    const [paths, setPaths] = useState([{ key: "endPoint", value: "" }]);


    const [response, setResponse] = useState([{ key: "code", value: "" }, { key: "description", value: "" }])
    const [operationObj, setOperationObj] = useState([{ key: "response", value: response }]);
    const [schema, setSchema] = useState([{ key: "$ref", value: "" }])
    const [opeSelected, setOpeSelected] = useState({ key: "", color: "" })
    const arrObjOpenAPI = [info, tags, paths]

    /*
    onChange textInput
    */
    const handleChange = (i, iStep, objOpenApi, key, event) => {
        const objs = arrObjOpenAPI[iStep][i] // arrObjOpenApi[index] = info => info[index]
        switch (key) {
            case objs.key:
                objs.value = event.target.value     //save data 
            default:
                return;
        }
    }

    //Get Data from AddField
    const [data, setData] = useState([])
    const handleCallback = (childData) => {
        //Need setData but why ?
        setData(childData)
        for (let i = 0; i < childData.length; i++) {
            info.push({ key: childData[i], value: "" })
        }
        childData.splice(0, childData.length)
    }

    //Select Operation
    const chipsClick = (ope) => {
        setOpeSelected(ope)
        setIsClicked(true)
    }
    const selectOpe = () => {
        setIsClicked(false)
    }

    //Add Tag
    const AddTag = (index, step) => {
        steps[1].tags.push({key : arrObjOpenAPI[index].key, value : arrObjOpenAPI[index].value})
        // steps[index][step.label].push(arrObjOpenAPI[index])
        console.log(steps)
    }

    //Stepper config 
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = (step, index) => {
        // add data to Steps Object
        if(step.label === "tags"){
            steps[index][step.label] = arrObjOpenAPI[index]
        }
            // steps[index][step.label].push(arrObjOpenAPI[index])
            console.log(steps)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    console.log(steps)

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, indexS) => (
                    <Step key={step.label}>
                        <StepLabel >
                            {step.label}
                        </StepLabel>
                        <StepContent>

                            {/* Add Fields according to the label */}
                            {/* {step[step.label].map((item, index) => { */}
                            {arrObjOpenAPI[indexS].map((item, index) => {
                                return (
                                    <TextField
                                        className="text-field"
                                        name={item.key}
                                        required
                                        id="filled-required"
                                        label={item.key}
                                        onChange={(e) => handleChange(index, indexS, step.label, item.key, e)}
                                    />
                                )
                            })}

                            {/*Show Button Add Tag */}
                            {step.label === "tags" ?
                                <div className="list-item">
                                    <Button
                                        variant="contained"
                                        onClick={() => AddTag(indexS, step)}
                                    >
                                        Add Tag
                                    </Button>
                                </div>
                                :
                                <p />
                            }

                            {

                            }

                            {/*Show operation list OR opertation selected*/}
                            <div className="list-item" spacing={1}>
                                {isClicked && step.label === "paths"?
                                    <Button
                                        variant="contained"
                                        onClick={selectOpe}
                                        sx={{ backgroundColor: opeSelected.color }}
                                    >
                                        {opeSelected.key}
                                    </Button> :
                                    operation.map(ope => {
                                        if (step.label === "paths") {
                                            return (
                                                <Chip label={ope.key} onClick={() => chipsClick(ope)}
                                                    style={{ backgroundColor: ope.color, color: "white" }} />
                                            )
                                        }
                                    }
                                    )
                                }
                            </div>

                            {/* Show OptionFields */}
                            <AddField addField={handleCallback} dataParentToChild={steps} />

                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleNext(step, indexS)}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {indexS === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={indexS === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    )
}