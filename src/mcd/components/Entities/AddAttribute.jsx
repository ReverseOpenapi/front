import { Button, Card, Paper } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAttributeToEntity } from "../../features/entitySlice";

import CustomizeCheckBox from "../common/CustomizeCheckBox";
import CustomizeSelectTextField from "../common/CustomizeSelectTextField";
import CustomizeTextField from "../common/CustomizeTextField";
import "./Entity.css";

const AddAttribute = ({ entity, setOpenForm, handleClose }) => {
  const dispatch = useDispatch();
  const [attributeType, setAttributeType] = useState("integer");
  const [attributeSize, setAttributeSize] = useState("");
  const [attributeName, setAttributeName] = useState("");
  const [attributeKey, setAttributeKey] = useState(false);
  const [attributeNulled, setAttributeNulled] = useState(false);

  const handleAttributes = () => {
    if (!attributeName || !attributeType) return;

    dispatch(
      addAttributeToEntity([
        entity.name,
        {
          name: attributeName,
          type: attributeType,
          size: attributeSize,
          key: attributeKey,
          nulled: attributeNulled,
        },
      ])
    );
    handleClose();
    setAttributeName("");
    setAttributeType("integer");
    setAttributeSize("");
    setAttributeKey(false);
    setAttributeNulled(false);
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
          id="attributeName"
          label="name"
          onChange={(e) => setAttributeName(e.target.value)}
          value={attributeName}
        />

        <CustomizeSelectTextField
          id="attribute-type"
          label="Type"
          onChange={(e) => setAttributeType(e.target.value)}
          value={attributeType}
        />

        <CustomizeTextField
          label="Size"
          type="number"
          id="attributeSize"
          onChange={(e) => setAttributeSize(e.target.value)}
          value={attributeSize}
        />

        <CustomizeCheckBox
          id="key"
          name="key"
          label="primary key"
          value={attributeKey}
          onChange={() => setAttributeKey(!attributeKey)}
        />

        <CustomizeCheckBox
          id="nulled"
          name="nulled"
          label="null"
          value={attributeNulled}
          onChange={() => setAttributeNulled(!attributeNulled)}
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
        onClick={handleAttributes}
      >
        save
      </Button>
      <br />
    </form>
  );
};

export default AddAttribute;
