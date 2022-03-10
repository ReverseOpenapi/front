import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//'@mui/material'
import { Box, TextField } from "@mui/material";

// Customize Material components
import CustomizeTextField from "../common/CustomizeTextField";
import CustomizeSelectTextField from "../common/CustomizeSelectTextField";
import { StyledButton } from "../common/StyledMaterial";

//style
import useStyles from "../style";
import "./Property.css";

//Icons
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloseIcon from "@mui/icons-material/Close";

// action
import { addProperty } from "../../features/propertySlice";

const PropertyFrom = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //* get data from store (db)
  const dictionary = useSelector((state) => state.dictionary.value);

  // setter and getter (state)
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("integer");

  //errors
  const [propertyNameError, setPropertyNameError] = useState("");
  const [errorColor, setErrorColor] = useState(false);

  // property selected from dictionary
  const [selectedProperty, setSelectedProperty] = useState("");

  //dictionary button (set toggle)
  const [open, setOpen] = useState(false);
  const toogleOpen = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const myFunction = (e) => {
    setSelectedProperty(e.target.value);
    dictionary.map((data) => {
      if (data.name === e.target.value) {
        setPropertyName(data.name);
        setPropertyType(data.type);
      }
    });
  };

  //handlers
  const handleChangeType = (event) => {
    setPropertyType(event.target.value);
  };

  const handleAddProperty = () => {
    if (!propertyName) {
      setPropertyNameError("Add schema name");
      setErrorColor(true);
    }
    if (!propertyName || !propertyType) return;

    dispatch(
      addProperty({
        [propertyName]: {
          type: propertyType,
        },
      })
    );
    setPropertyNameError("");
    setPropertyName("");
    setPropertyType("integer");
    setErrorColor(false);
  };

  return (
    <Box
      sx={{
        width: 1,
        borderRadius: "5px",
        padding: 1,
      }}
      className="property-container"
    >
      {" "}
      <div className="preload-dictionary">
        <StyledButton
          variant="text"
          className={classes.buttonBg}
          onClick={() => toogleOpen()}
        >
          properties from dictionary {open ? <CloseIcon /> : <MenuBookIcon />}
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
            label="Preloadeded property"
            value={selectedProperty}
            onChange={(e) => myFunction(e)}
          >
            {" "}
            <option value="none">no property selected</option>
            {dictionary.map((data, index) => (
              <option value={data.name} key={index}>
                {data.name}
              </option>
            ))}
          </TextField>
        )}
      </div>
      <div className="properties-form">
        <CustomizeTextField
          type="text"
          id="propertyName"
          label="name"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
          helperText={propertyNameError && propertyNameError}
          required
          error={errorColor}
        />
        <CustomizeSelectTextField
          id="property-type"
          label="Type"
          value={propertyType}
          onChange={handleChangeType}
        />
        <StyledButton
          variant="contained"
          className={classes.buttonBg}
          onClick={handleAddProperty}
        >
          Add
        </StyledButton>
      </div>
    </Box>
  );
};

export default PropertyFrom;
