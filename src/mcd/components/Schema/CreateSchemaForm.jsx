import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import PropertyForm from "../Property/PropertyForm";
import PropertiesList from "../Property/PropertiesList";

//action
import { addSchema } from "../../features/schemaSlice";
import { initializePropertiesList } from "../../features/propertySlice";

//'@mui/materail'
import { Box, TextField } from "@mui/material";

// Customized Material component
import { StyledButton, StyledTypography } from "../common/StyledMaterial";

//style
import "react-toastify/dist/ReactToastify.css";
import useStyles from "../style";
import "./Schema.css";

const SchemaForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // get data from store (db)
  const properties = useSelector((state) => state.properties.value);
  const schemas = useSelector((state) => state.schemas.value);

  // setter and getter (state)
  const [schemaName, setSchemaName] = useState("");

  //error
  const [schemaNameError, setSchemaNameError] = useState("");
  const [errorColor, setErrorColor] = useState(false);

  // notifications
  const notifySuccess = () =>
    toast.success(`${schemaName} schema successfully created !`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyError = () =>
    toast.warn(`${schemaName} schema already exists!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  //handler
  const handleCreateSchema = () => {
    if (!schemaName) {
      setSchemaNameError("Add schema name");
      setErrorColor(true);
    }
    if (properties.length === 0 || !schemaName) return;

    const checkIfSchemaExist = (obj) => obj.name === schemaName;
    const value = schemas.some(checkIfSchemaExist);

    if (value) {
      notifyError();
      return;
    }
    dispatch(
      addSchema({
        name: schemaName,
        schema: { type: "object", properties: properties },
      })
    );
    dispatch(initializePropertiesList(properties));
    setSchemaNameError("");
    setErrorColor(false);
    notifySuccess();
  };

  return (
    <>
      <div className="wrap-container">
        <Box
          component="form"
          sx={{
            width: 1,
            borderRadius: "16px",
            padding: 1,
          }}
        >
          <StyledTypography variant="h5">Create a schema</StyledTypography>
          <br />
          <TextField
            InputLabelProps={{ className: classes.textfield }}
            InputProps={{
              style: { color: "#8e44ad", fontWeight: 700 },
            }}
            variant="standard"
            type="text"
            id="name"
            placeholder="name of schema"
            value={schemaName}
            onChange={(e) => setSchemaName(e.target.value)}
            helperText={schemaNameError && schemaNameError}
            required
            error={errorColor}
          />
        </Box>
        <PropertyForm />
      </div>
      <br />
      <PropertiesList />
      <div className="wrap-button">
        <StyledButton
          variant="contained"
          className={classes.buttonBg}
          onClick={handleCreateSchema}
        >
          Create
        </StyledButton>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default SchemaForm;
