import React, { useState } from "react";
import "./style.css";

import Info from "./Info/Info";
import Tags from "./Tag/Tags";
import Paths from "./Path/Paths";
import Parameters from "./Path/Parameters";
import Response from "./Path/Response";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


import { styled } from "@material-ui/styles";

export default function StepperOpenApi() {
  //Step OpenApi value
  const steps = [
    {
      label: "info",
      info: [],
    },
    {
      label: "tags",
      tags: Array,
    },
    {
      label: "paths",
      paths: [],
    },
  ];

  const [dataInfo, setDataInfo] = useState([]);
  const [dataTags, setDataTags] = useState([]);
  const [dataPaths, setDataPaths] = useState([]);
  const [nbPath, setNbPath] = useState(0)
  
  //Stepper config
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const callbackInfo = (childData) => {
    //replace old data Info with the updated data
    if (dataInfo !== []) {
      dataInfo.splice(0);
    }
    for (let i = 0; i < childData.length; i++) {
      //set current data info in dataInfos
      setDataInfo((currentDataPath) => [
        ...currentDataPath,
        {
          [childData[i].key] : childData[i].value,
        },
      ]);
    }
    // steps[0].info = childData;
    localStorage.setItem("info", JSON.stringify(childData));
    handleNext();
  };

  const callbackTag = (nextStep, tags) => {
    setDataTags((currentDataTag) => [...currentDataTag, tags ]);
    if (nextStep === true) {
      handleNext();
    } else {
      handleBack();
    }
  };

  const callbackPath = (childData) => {
    let childDataPath = childData.path === undefined ? "" : childData.path.trim();
    let childDataOpe = childData.operationObj === undefined ? "" : childData.operationObj.trim();
    if (childData === false) {
      handleBack();
    }
    if (childDataPath !== "" && childDataOpe !== "") {
      setNbPath(nbPath + 1)
      //set current data path in dataPaths
      setDataPaths((currentDataPath) => [
        ...currentDataPath,
        {
          id : nbPath,
          operationObj: childData.operationObj,
          path: childData.path.trim(), // trim() : remove the spaces, before and after the value
          opeColor: childData.opeColor,
          tags : childData.tags,
        },
      ]);
    }
  };

  const callbackParam = (parameters, dataPath) => {
    dataPaths.filter((item, i) => {
      if (item.id === dataPath.id) {
        dataPaths[i] = { ...dataPaths[i], parameters };
      }
      return item;
    });
  };

  const callbackResponse = (responses, dataPath) => {
    dataPaths.filter((item, i) => {
      if (item.id === dataPath.id) {
        dataPaths[i] = { ...dataPaths[i], responses };
      }
      return item;
    });
  };



  const handleShowData = () => {
    steps[0].info = dataInfo;
    steps[1].tags = dataTags;
    steps[2].paths = dataPaths;
    console.log(steps);
  };

  const StyledStepLabel = styled(StepLabel)({
    "& .MuiStepLabel-label": {
      color: "white",
    },
  });

  return (
    <div className="Page_form">
      <div className="gauche">
        <Box sx={{ maxWidth: 400 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, indexS) => (
              <Step key={step.label}>
                <StyledStepLabel>{step.label}</StyledStepLabel>
                <StepContent>
                  {/* Show component according to the step.label */}
                  {(() => {
                    switch (step.label) {
                      case "info":
                        return <Info dataInfo={callbackInfo} />;
                      case "tags":
                        return <Tags dataTags={callbackTag} />;
                      case "paths":
                        return <Paths dataPath={callbackPath} />;
                      default:
                        return null;
                    }
                  })()}

                  <Box sx={{ mb: 2 }}>
                    <div>
                      {/* <Button
                        variant="contained"
                        onClick={() => handleNext(step, indexS)}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {indexS === steps.length - 1
                          ? "Finish"
                          : "Press just for TAG Step"}
                      </Button>
                      <Button
                        disabled={indexS === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button> */}
                      {step.label === "paths" ? (
                        <Button onClick={handleShowData} sx={{ mt: 1, mr: 1 }}>
                          Show OpenAPI Data in the console
                        </Button>
                      ) : (
                        <p />
                      )}
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>

      <div className="droite">
        {dataPaths.map((item) => {
          return (
            <Accordion
              style={{
                backgroundColor: item.opeColor,
                opacity: "0.85",
                color: "white",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  {item.operationObj} {item.path} 
                  <Chip label={item.tags.name}         
                  style={{
                  backgroundColor: "gray",
                  color: "white",
                  margin: "0px 5px 10px",
                }}/>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Parameters dataPath={item} dataParam={callbackParam} />
                <Response dataPath={item} dataResponse={callbackResponse} />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
