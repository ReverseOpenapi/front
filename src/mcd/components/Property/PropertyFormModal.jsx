import React, { useState } from "react";
import { useDispatch } from "react-redux";

//'@mui/material
import { Button, Card, Paper } from "@mui/material";

// action from slice
import { addPropertyToSchema } from "../../features/schemaSlice";

// Customize material components
import CustomizeSelectTextField from "../common/CustomizeSelectTextField";
import CustomizeTextField from "../common/CustomizeTextField";

//style
import "./Property.css";

const PropertyFormModal = ({ schema, setOpenForm, handleClose }) => {
  const dispatch = useDispatch();

  // setter and getter (state)
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, SetPropertyType] = useState("integer");

  // handler
  const handleAddProperty = () => {
    if (!propertyName || !propertyType) return;

    dispatch(
      addPropertyToSchema([
        schema.name,
        {
          name: propertyName,
          type: propertyType,
        },
      ])
    );
    handleClose();
    setPropertyName("");
    SetPropertyType("integer");
    setOpenForm(false);
  };

  return (
    <form>
      <Card
        component={Paper}
        className="area"
        sx={{ m: 1, minWidth: 230, maxWidth: 230, marginLeft: 2.5 }}
      >
        <CustomizeTextField
          type="text"
          id="propertyName"
          label="name"
          onChange={(e) => setPropertyName(e.target.value)}
          value={propertyName}
        />

        <CustomizeSelectTextField
          id="property-type"
          label="Type"
          onChange={(e) => SetPropertyType(e.target.value)}
          value={propertyType}
        />
      </Card>
      <Button
        sx={{
          display: "flex",
          marginLeft: 2,
          width: 20,
          backgroundColor: "#6c5ca0",
        }}
        variant="contained"
        onClick={handleAddProperty}
      >
        save
      </Button>
      <br />
    </form>
  );
};

export default PropertyFormModal;
