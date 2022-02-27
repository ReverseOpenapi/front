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

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function StepperOpenApi({ dataOpenApi }) {

    //Step OpenApi value
    const steps = [
        {
            label: 'info',
            info: []
        },
        {
            label: 'tags',
            tags: []
        },
        {
            label: 'paths',
            paths: [],

        }
    ];

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
        console.log(steps)
        handleNext()
    }

    useEffect(() => {       
        console.log(dataPaths)
    })

    const callbackPath = (childData) => {
        //set current data path in dataPaths
        setDataPaths(currentDataPath => [
            ...currentDataPath,
            {
                operationObj : childData.operationObj,
                path : childData.path,
                opeColor : childData.opeColor
            }
        ])
    }

    const handleShowData = () => {
        steps[2].paths = dataPaths
        console.log(steps)
    }


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
                                                <Button onClick={handleShowData} sx={{ mt: 1, mr: 1 }}>
                                                    Add data to arrSteps
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
                {dataPaths.map(item => {
                    console.log(item)
                    return(
                    <Accordion style={{ backgroundColor: item.opeColor,opacity: "0.85", color: "white" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{item.operationObj} {item.path}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Parameters Component
                                Response Component                               
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    )
                }
                )}
            </div>
        </div>
    )
}