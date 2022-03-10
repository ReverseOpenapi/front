import React, { useState } from "react";
import UpdatePropertyForm from "../Property/UpdatePropertyForm";
import PropertyFormModal from "../Property/PropertyFormModal";

// '@mui/material/
import { Box, Button, Divider, TextField } from "@mui/material";

// Customized Material component
import { StyledTypography } from "../common/StyledMaterial";

// style
import useStyles from "../style";
//import "./Schema.css";

const UpdateSchemaForm = ({ schemaProps, handleClose }) => {
  const classes = useStyles();

  // setter and getter (state)
  const [schemaName, setSchemaName] = useState(schemaProps.name);

  // toggle modal form
  const [openForm, setOpenForm] = useState(false);

  return (
    <div>
      <StyledTypography variant="overline">schema properties</StyledTypography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "29ch" },
        }}
      >
        <TextField
          InputLabelProps={{ className: classes.textfield }}
          InputProps={{
            style: { color: "#8e44ad", fontWeight: 700 },
          }}
          value={schemaName}
          onChange={(e) => setSchemaName(e.target.value)}
          variant="standard"
          type="text"
          id="name"
          disabled
        />
      </Box>
      <Button
        sx={{ display: "flex", marginLeft: 2 }}
        variant="contained"
        onClick={() => setOpenForm(!openForm)}
      >
        add property to schema
      </Button>
      {openForm && (
        <>
          <PropertyFormModal
            schema={schemaProps}
            setOpenForm={setOpenForm}
            handleClose={handleClose}
          />
          <Divider />
        </>
      )}

      {schemaProps?.schema.properties.lenght !== 0 &&
        schemaProps?.schema.properties.map((property, index) => {
          return (
            <UpdatePropertyForm
              property={property}
              propertyIndex={index}
              schemaName={schemaName}
              handleClose={handleClose}
              key={index}
            />
          );
        })}
    </div>
  );
};

export default UpdateSchemaForm;
