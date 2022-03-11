import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

//action
import { addRelation } from "../../features/relationSlice";

// '@mui/materail'
import { Box } from "@mui/material";

//Customized Material component
import { StyledButton, StyledTypography } from "../common/StyledMaterial";
import SelectInput from "../common/SelectInput";

//style
import "react-toastify/dist/ReactToastify.css";
import useStyles from "../style";
import "./Relation.css";

const RelationForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //* get data from store
  const schemas = useSelector((state) => state.schemas.value);

  // setter and getter (state)
  const [sourceProperty, setSourceProperty] = useState("");
  const [targetProperty, setTargetProperty] = useState("");
  const [sourcePort, setSourcePort] = useState("");
  const [targetPort, setTargetPort] = useState("");
  const [portOptions, setPortOptions] = useState([
    {
      name: "port",
      type: "type",
    },
  ]);
  const [targetPortOptions, setTargetPortOptions] = useState([
    {
      name: "port",
      type: "type",
    },
  ]);

  //notifications
  const notify = () =>
    toast.error(
      `relation can only be created between two different collections !`,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

  //handlers
  const handleRelation = () => {
    if (!sourceProperty || !sourcePort || !targetPort || !targetPort) return;
    if (sourceProperty === targetProperty) {
      notify();
      return;
    }
    dispatch(
      addRelation({
        source: { schema: sourceProperty, port: sourcePort },
        target: { schema: targetProperty, port: targetPort },
      })
    );

    setSourceProperty("");
    setTargetProperty("");
    setSourcePort("");
    setTargetPort("");
  };

  const handleSelectSource = (e) => {
    setSourceProperty(e.target.value);
    schemas.map((schema) => {
      if (schema.name === e.target.value) {
        setPortOptions(schema.properties);
      }
    });
  };
  const handleSelectTaget = (e) => {
    setTargetProperty(e.target.value);
    schemas.map((schema) => {
      if (schema.name === e.target.value) {
        setTargetPortOptions(schema.properties);
      }
    });
  };

  const hanbleSourcePort = (e) => {
    setSourcePort(e.target.value);
  };

  const hanbleTargetPort = (e) => {
    setTargetPort(e.target.value);
  };

  return (
    <div>
      <StyledTypography variant="subtitle1">Relation form</StyledTypography>
      <Box className="area-relation">
        <SelectInput
          id="source"
          select
          label="Source schema"
          value={sourceProperty}
          onChange={(e) => handleSelectSource(e)}
          selectOptions={schemas}
          required
        />
        <SelectInput
          id="source-port"
          select
          label="select port"
          value={sourcePort}
          onChange={hanbleSourcePort}
          selectOptions={portOptions}
          required
        />
      </Box>
      <Box style={{ marginTop: "5px" }} className="area-relation">
        <SelectInput
          id="target"
          select
          label="Target schema"
          value={targetProperty}
          onChange={(e) => handleSelectTaget(e)}
          selectOptions={schemas}
          required
        />
        <SelectInput
          id="target-port"
          select
          label="select port"
          value={targetPort}
          onChange={hanbleTargetPort}
          selectOptions={targetPortOptions}
          required
        />
      </Box>
      <br />
      <StyledButton
        variant="contained"
        className={classes.buttonBg}
        onClick={handleRelation}
      >
        Link
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
  );
};

export default RelationForm;
