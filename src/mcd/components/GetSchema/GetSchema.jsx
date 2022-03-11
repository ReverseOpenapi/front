import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";

// style
import "./GetSchema.css";

const GetSchema = ({dataSchema, reqHttpID}) => {
  const schemas = useSelector((state) => state.schemas.value);

  const selectSchema = (arg) => {
    dataSchema(arg, reqHttpID.id)
  };

  return (
    <div className="wrap-schema-container">
      <Accordion
        style={{
          backgroundColor: "#1976d2",
          opacity: "0.85",
          color: "white",
        }}
        sx={{
          minWidth: 300,
          maxWidth: 300,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="schema-content"
          id="schema-header"
        >
          <Typography>Get schema</Typography>
        </AccordionSummary>
        {schemas.length > 0 &&
          schemas.map((schema, index) => {
            return (
              <AccordionDetails
                className="accordion-details"
                sx={{ backgroundColor: "black" }}
              >
                <Typography
                  sx={{ cursor: "pointer" }}
                  key={index}
                  onClick={() => selectSchema(schema.schema.properties)}
                >
                  {schema.name}
                </Typography>
              </AccordionDetails>
            );
          })}
      </Accordion>
    </div>
  );
};

export default GetSchema;
