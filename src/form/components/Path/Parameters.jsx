import React, { useState } from "react";
import "../style.css";
// import OptionalParams from "./OptionalParams";
import CustomizedList from "./CustomizedList";
import ListType from "./ListType";

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
  const [nbIn, setNbIn] = useState(0)

  // FUNCTIONS UTILS
  const addParamObj = (obj, key, value) => {
    obj[key] = value;
  };

  //Create locationParam value
  const callbackIn = (currentID, locationParam) => {
    addParamObj(parameters[currentID], "in", locationParam)
  };

  //create type value 
  const callbackType = (currentID, dataType) => {
    addParamObj(parameters[currentID], "schemaType", dataType)
  };

  //onChange Value
  const handleChange = (event, i, key) => {
    if (
      key === "required" ||
      key === "deprecated" ||
      key === "allowEmptyValue"
    ) {
      addParamObj(parameters[i], key, event.target.checked)
    } else if (key !== "in") {
      addParamObj(parameters[i], key, event.target.value)
    }
  };

//Add data to stepper
const addParameter = () => {
  dataParam(parameters, dataPath);
}

//Add new parameter
const addLocationParam = () => {
  setNbIn(nbIn + 1)
  setParameters((currentDataParams) => 
  [...currentDataParams, 
  {
    id : nbIn,
    name : String, 
    required : true
  }])
}

  return (
    <div>
    <IconButton
     aria-label="fingerprint"
     color="secondary"
     onClick={() => addLocationParam()}>
     <AddIcon />
     Add Parameter
   </IconButton>

      {parameters.map((item, i) => {
        const indexParams = Object.keys(parameters[i])
        return(
      <>
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
         <CustomizedList dataIn={callbackIn} paramsID={i} />

         {indexParams.map((item, index) => {
           if (
             item === "required" ||
             item === "deprecated" ||
             item === "allowEmptyValue"
           ) {
             return (
               <div className="checkboxStyle">
                 <FormControlLabel
                   control={
                     <Checkbox
                       id={item}
                       name={item}
                       defaultChecked
                       onChange={(e) => handleChange(e, i, item)}
                     />
                   }
                   label={item}
                 />
               </div>
             );
           } else if (item !== "in" && item !== "id" && item !== "schemaType") {
             return (
               <TextField
                 className="text-field"
                 name={item}
                 required
                 id="filled-required"
                 label={item}
                 onChange={(e) => handleChange(e, i, item)}
                //  defaultValue={arrParamsStorage[i].name}
                 style={{ display: "flex", margin: "5px" }}
               />
             );
           }
         }, {})}

        <ListType dataType={callbackType} paramsID={i} />
         <Button primary onClick={() => addParameter()}>
           Add Parameter
         </Button>
       </Typography>
     </AccordionDetails>
   </Accordion>
   </>
      )
      },{})}
    </div>
  );
}
