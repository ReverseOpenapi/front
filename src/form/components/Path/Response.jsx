import React, { useState, useEffect } from "react";
import "../style.css";

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

export default function Response({ dataResponse, dataPath }) {
  const [responses, setResponses] = useState([]);
  const [nbRes, setNbRes] = useState(0);

  // FUNCTIONS UTILS
  const addParamObj = (obj, key, value) => {
    obj[key] = value;
  };

  //onChange Value
  const handleChange = (event, i, key) => {
      addParamObj(responses[i], key, event.target.value);
  };

  const addDataResponses = () => {
    console.log(responses[responses.length-1])
    dataResponse(responses, dataPath);
  };

  //Add new parameter
const addResponses = () => {
    setNbRes(nbRes + 1)
    setResponses((currentDataResponse) => 
    [...currentDataResponse, 
    {
      id : nbRes,
      status : String, 
      description : String
    }])
  }

  return (
    <div>
      <IconButton
        aria-label="fingerprint"
        color="secondary"
        onClick={() => addResponses()}
      >
        <AddIcon />
        Add Response
      </IconButton>

      {responses.map((item, i) => {
        return (
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
                <Typography>RESPONSE</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>

                  {Object.keys(responses[i]).map((item, index) => {
                    if(item !== "id"){
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
                  })}

                  <Button primary onClick={() => addDataResponses()}>
                    Add Response
                  </Button>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </>
        );
      })}
    </div>
  );
}
