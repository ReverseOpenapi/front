import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Paper, TextField, Card } from "@mui/material";

import useStyles from "../style";
import "./Entity.css";

//Icons
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloseIcon from "@mui/icons-material/Close";
import { StyledButton } from "../common/StyledMaterial";
import CustomizeTextField from "../common/CustomizeTextField";
import CustomizeSelectTextField from "../common/CustomizeSelectTextField";
import CustomizeCheckBox from "../common/CustomizeCheckBox";
import { addAttribute } from "../../features/attributeSlice";

const AttributeFrom = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dictionary = useSelector((state) => state.dictionary.value);
  const [attributNameError, setAttributeNameError] = useState("");
  const [errorColor, setErrorColor] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [attributeName, setAttributeName] = useState("");
  const [attributeType, setAttributeType] = useState("integer");
  const [attributeSize, setAttributeSize] = useState("");
  const [attributeKey, setAttributeKey] = useState(false);
  const [attributeNulled, setAttributeNulled] = useState(false);

  const handleChangeType = (event) => {
    setAttributeType(event.target.value);
  };

  const toogleOpen = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const myFunction = (e) => {
    setSelectedData(e.target.value);
    dictionary.map((data) => {
      if (data.name === e.target.value) {
        setAttributeName(data.name);
        setAttributeType(data.type);
        setAttributeSize(data.size);
      }
    });
  };

  const handleAttributes = () => {
    if (!attributeName) {
      setAttributeNameError("Add attribute name");
      setErrorColor(true);
    }
    if (!attributeName || !attributeType) return;

    dispatch(
      addAttribute({
        name: attributeName,
        type: attributeType,
        size: attributeSize,
        key: attributeKey,
        nulled: attributeNulled,
      })
    );
    setAttributeNameError("");
    setAttributeName("");
    setAttributeType("integer");
    setAttributeSize("");
    setAttributeKey(false);
    setAttributeNulled(false);
    setErrorColor(false);
  };

  return (
    <Box
      sx={{
        width: 1,
        borderRadius: "5px",
        padding: 1,
      }}
      className="attribute-container"
    >
      {" "}
      <div className="preload-dictionary">
        <StyledButton
          variant="text"
          className={classes.buttonBg}
          onClick={() => toogleOpen()}
        >
          preload data dictionary {open ? <CloseIcon /> : <MenuBookIcon />}
        </StyledButton>{" "}
        {open && (
          <TextField
            variant="standard"
            InputLabelProps={{ className: classes.textfield }}
            InputProps={{
              style: { color: "black", fontWeight: 700 },
            }}
            sx={{ m: 1, minWidth: 180, maxWidth: 180 }}
            SelectProps={{
              native: true,
            }}
            id="dictionary-data"
            select
            label="Preload data"
            value={selectedData}
            onChange={(e) => myFunction(e)}
          >
            {" "}
            <option value="none">no data selected</option>
            {dictionary.map((data, index) => (
              <option value={data.name} key={index}>
                {data.name}
              </option>
            ))}
          </TextField>
        )}
      </div>
      <div className="attributes-form">
        <CustomizeTextField
          type="text"
          id="attributeName"
          label="name"
          value={attributeName}
          onChange={(e) => setAttributeName(e.target.value)}
          helperText={attributNameError && attributNameError}
          required
          error={errorColor}
        />
        <CustomizeSelectTextField
          id="attribute-type"
          label="Type"
          value={attributeType}
          onChange={handleChangeType}
        />
        <CustomizeTextField
          type="number"
          id="attributeSize"
          label="size"
          value={attributeSize}
          onChange={(e) => setAttributeSize(e.target.value)}
        />
        <CustomizeCheckBox
          id="key"
          name="key"
          value={attributeKey}
          onChange={() => setAttributeKey(!attributeKey)}
          label="primary key"
        />

        <CustomizeCheckBox
          id="nulled"
          name="nulled"
          value={attributeNulled}
          onChange={() => setAttributeNulled(!attributeNulled)}
          label="nulled"
        />
        <StyledButton
          variant="contained"
          className={classes.buttonBg}
          onClick={handleAttributes}
        >
          Add
        </StyledButton>
      </div>
    </Box>
  );
};

export default AttributeFrom;
