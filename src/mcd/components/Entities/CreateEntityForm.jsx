import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEntity } from "../../features/entitySlice";
import { Box, TextField } from "@mui/material";
import useStyles from "../style";
import { StyledButton, StyledTypography } from "../common/StyledMaterial";
import AttributeFrom from "./AttributeFrom";
import AttributesList from "./AttributesList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initializeAttributesList } from "../../features/attributeSlice";
import "./Entity.css";

const CreateEntityForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const attributes = useSelector((state) => state.attributes.value);
  const entities = useSelector((state) => state.entities.value);
  const [entityName, setEntityName] = useState("");
  const [entityNameError, setEntityNameError] = useState("");
  const [errorColor, setErrorColor] = useState(false);
  const notify = () =>
    toast.success(`${entityName} collection successfully created !`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyError = () =>
    toast.warn(`${entityName} collection already exists!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleEntity = () => {
    if (!entityName) {
      setEntityNameError("Add entity name");
      setErrorColor(true);
    }
    if (attributes.length === 0 || !entityName) return;

    const checkEntityNameExist = (obj) => obj.name === entityName;
    const value = entities.some(checkEntityNameExist);

    if (value) {
      return notifyError();
    }
    dispatch(addEntity({ name: entityName, attributes: attributes }));
    dispatch(initializeAttributesList(attributes));
    setEntityNameError("");
    setErrorColor(false);
    notify();
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
          <StyledTypography variant="h5">Create a collection</StyledTypography>
          <br />
          <TextField
            InputLabelProps={{ className: classes.textfield }}
            InputProps={{
              style: { color: "#8e44ad", fontWeight: 700 },
            }}
            variant="standard"
            type="text"
            id="name"
            placeholder="name of collection"
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            helperText={entityNameError && entityNameError}
            required
            error={errorColor}
          />
        </Box>
        <AttributeFrom />
      </div>
      <br />
      <AttributesList />
      <div className="wrap-button">
        <StyledButton
          variant="contained"
          className={classes.buttonBg}
          onClick={handleEntity}
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

export default CreateEntityForm;
