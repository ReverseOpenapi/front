import React, { useState } from "react";
import "../style.css";
import GetSchema from '../../../mcd/components/GetSchema/GetSchema'
 
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

const callbackSchema = (schema, responseID) => {
  addParamObj(responses[responseID], "schema", schema);
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
                    if(item !== "id" && item !== "schema"){
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
                  <GetSchema reqHttpID={item} dataSchema={callbackSchema}/>
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
