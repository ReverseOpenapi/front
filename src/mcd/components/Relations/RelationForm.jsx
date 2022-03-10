import { Box, Card, Paper } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRelation } from "../../features/relationSlice";
import SelectInput from "../common/SelectInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStyles from "../style";
import "./Relation.css";

import { StyledButton, StyledTypography } from "../common/StyledMaterial";

const RelationForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const entities = useSelector((state) => state.entities.value);
  const [portOptions, setPortOptions] = useState([
    {
      name: "port",
      type: "type",
      size: "",
      key: false,
      nulled: false,
    },
  ]);

  const [sourceEntity, setSourceEntity] = useState("");
  const [targetEntity, setTargetEntity] = useState("");
  const [sourcePort, setSourcePort] = useState("");
  const [targetPort, setTargetPort] = useState("");

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

  const handleRelation = () => {
    if (!sourceEntity || !sourcePort || !targetPort || !targetPort) return;
    if (sourceEntity === targetEntity) {
      notify();
      return;
    }
    dispatch(
      addRelation({
        source: { table: sourceEntity, port: sourcePort },
        target: { table: targetEntity, port: targetPort },
      })
    );

    setSourceEntity("");
    setTargetEntity("");
    setSourcePort("");
    setTargetPort("");
  };

  const handleSelectSource = (e) => {
    setSourceEntity(e.target.value);
    entities.map((entity) => {
      if (entity.name === e.target.value) {
        setPortOptions(entity.attributes);
      }
    });
  };
  const handleSelectTaget = (e) => {
    setTargetEntity(e.target.value);
    entities.map((entity) => {
      if (entity.name === e.target.value) {
        setPortOptions(entity.attributes);
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
          label="Source entity"
          value={sourceEntity}
          onChange={(e) => handleSelectSource(e)}
          selectOptions={entities}
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
          label="Target entity"
          value={targetEntity}
          onChange={(e) => handleSelectTaget(e)}
          selectOptions={entities}
          required
        />
        <SelectInput
          id="target-port"
          select
          label="select port"
          value={targetPort}
          onChange={hanbleTargetPort}
          selectOptions={portOptions}
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
