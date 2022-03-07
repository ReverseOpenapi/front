import React, { useState, useEffect } from "react";
import "./style.css";
import OptionalParams from "./OptionalParams";
import CustomizedList from "./CustomizedList";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

export default function Parameters({ dataParam, dataPath }) {
  const [parameters, setParameters] = useState([]);
  const [keyParameter, setKeyParameter] = useState([]);
  const requiredParameter = [
    { key: "name", value: String },
    { key: "required", value: true },
  ];
  const localStorageParam = JSON.parse(localStorage.getItem("param"));

  if (localStorageParam !== null && parameters.length === 0) {
    //If we have data in localstorage, add to parameters
    for (let i = 0; i < localStorageParam.length; i++) {
      setParameters((currentDataParam) => [
        ...currentDataParam,
        {
          key: localStorageParam[i].key,
          value: localStorageParam[i].value,
        },
      ]);
      setKeyParameter((currentDataKeyParam) => [
        ...currentDataKeyParam,
        localStorageParam[i].key,
      ]);
    }
  } else if (parameters.length === 0) {
    //If parameters is empty, add requiredParameter to parameters
    for (let i = 0; i < requiredParameter.length; i++) {
      setParameters((currentDataParam) => [
        ...currentDataParam,
        {
          key: requiredParameter[i].key,
          value: requiredParameter[i].value,
        },
      ]);

      setKeyParameter((currentDataKeyParam) => [
        ...currentDataKeyParam,
        requiredParameter[i].key,
      ]);
    }
  }

  //Manage values of Parameters Object
  const handleChange = (event, index, key, i, item) => {
    if (
      key === "required" ||
      key === "deprecated" ||
      key === "allowEmptyValue"
    ) {
      parameters[index].value = event.target.checked;
    } else if (key !== "in") {
      parameters[index].value = event.target.value;
    }
  };

  //Get Data from AddField
  const handleCallback = (childData) => {
    for (let i = 0; i < childData.length; i++) {
      //Add a condition to avoid duplication
      if (keyParameter.includes(childData[i]) === false) {
        if (
          childData[i] === "required" ||
          childData[i] === "deprecated" ||
          childData[i] === "allowEmptyValue"
        ) {
          setParameters((currentDataParam) => [
            ...currentDataParam,
            {
              key: childData[i],
              value: true,
            },
          ]);
        } else {
          setParameters((currentDataParam) => [
            ...currentDataParam,
            {
              key: childData[i],
              value: String,
            },
          ]);
        }
      }

      setKeyParameter((currentDataKeyInfo) => [
        ...currentDataKeyInfo,
        childData[i],
      ]);
    }
  };

  const callbackIn = (inData) => {
    if (keyParameter.includes("in")) {
      keyParameter.splice(keyParameter.indexOf("in"), 1); //avoids duplication
      parameters.filter((item) => {
        if (item.key === "in") {
          parameters.splice(parameters.indexOf(item), 1); //avoids duplication
        }
      });
    }
    setParameters((currentDataParam) => [
      ...currentDataParam,
      {
        key: "in",
        value: inData,
      },
    ]);

    setKeyParameter((currentDataKeyInfo) => [...currentDataKeyInfo, "in"]);
  };

  const addParameter = () => {
    dataParam(parameters, dataPath);
  };

  const addIn = () => {
    console.log("addIn");
  };

  console.log(parameters);
  console.log(localStorage.getItem("param"));
 
  return (
    <div>
      {/* {parameter} */}
      <IconButton
        aria-label="fingerprint"
        color="secondary"
        onClick={() => addIn()}
      >
        <AddIcon />
      </IconButton>

      <Accordion
        style={{
          backgroundColor: dataPath.opeColor,
          opacity: "0.85",
          color: "white",
          border: "solid",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>IN</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <CustomizedList dataIn={callbackIn} />
            {parameters.map((item, index) => {
              if (
                item.key === "required" ||
                item.key === "deprecated" ||
                item.key === "allowEmptyValue"
              ) {
                return (
                  <div className="checkboxStyle">
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={item.key}
                          name={item.key}
                          defaultChecked
                          onChange={(e) => handleChange(e, index, item.key)}
                        />
                      }
                      label={item.key}
                    />
                  </div>
                );
              } else if (item.key !== "in") {
                return (
                  <TextField
                    className="text-field"
                    name={item.key}
                    required
                    id="filled-required"
                    label={item.key}
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={parameters[index].value} //Show LocalStorage value
                    style={{ display: "flex", margin: "5px" }}
                  />
                );
              }
            })}

            <OptionalParams
              addField={handleCallback}
              dataParentToChild={parameters}
            />
            <Button primary onClick={() => addParameter()}>
              Add Parameter
            </Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
