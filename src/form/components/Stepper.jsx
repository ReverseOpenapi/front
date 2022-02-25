import React, { useState, useEffect } from 'react'
import "./style.css"

import Info from './Info'
import Paths from './Paths'

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function StepperOpenApi({ dataParentToChild, dataOpenApi }) {


    //Step OpenApi value
    const [steps, setSteps] = useState([
        {
            label: 'info',
            // info: [{ key: "title", value: "" }, { key: "description", value: "" }, { key: "version", value: "" }],
            info: []
        },
        {
            label: 'tags',
            // tags: [{ key: "name", value: "" }, { key: "description", value: "" }],
            tags: []
        },
        {
            label: 'paths',
            // paths: [{ key: "endPoint", value: "" }],
            paths: [],

        }
    ]);

   const arrdataPaths = []
const [dataPaths, setDataPaths] = useState([])

    //Stepper config 
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = (step, index) => {

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const callbackInfo = (childData) => {
        console.log(childData)
        steps[0].info = childData
        handleNext()
    }

    const callbackPath = (childData) => {
        console.log(childData)
        //check here
        arrdataPaths.push(childData)
        setDataPaths(arrdataPaths)
        // steps[2].paths = childData
        // dataParentToChild = steps
        console.log(dataPaths)

        // handleNext()
    }

    const handleShowData = () => {
        console.log(steps)
    }
    useEffect(() => {
        document.title = `Data path :  ${dataPaths} `;
      });

    return (
        <div className='Page_form'>
            <div className="gauche">
                <Box sx={{ maxWidth: 400 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, indexS) => (
                            <Step key={step.label}>
                                <StepLabel >
                                    {step.label}
                                </StepLabel>
                                <StepContent>

                                    {/* Show component according to the step.label */}
                                    {(() => {
                                        switch (step.label) {
                                            case 'info':
                                                return <Info dataInfo={callbackInfo} />
                                            case 'paths':
                                                return <Paths dataPath={callbackPath} />
                                            default:
                                                return null
                                        }
                                    })()}

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
                                            {step.label === "paths" ?
                                                <Button onClick={() => { dataOpenApi(steps) }} sx={{ mt: 1, mr: 1 }}>
                                                    Add data
                                                </Button> : <p />
                                            }
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
                            <Button onClick={() => { dataOpenApi(steps) }} sx={{ mt: 1, mr: 1 }}>
                                Add data
                            </Button>
                        </Paper>
                    )}
                </Box>
            </div>

            <div className="droite">
                <h1>DISLAY PATHS</h1>
                {/* {dataPaths.map(item => {
                    console.log(item)
                    return (
                        <div>
                            <h1>{item}</h1>
                        </div>
                    )
                })} */}
            </div>
        </div>
    )
}