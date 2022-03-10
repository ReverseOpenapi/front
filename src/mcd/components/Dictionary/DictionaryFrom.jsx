import { Box, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomizeSelectTextField from "../common/CustomizeSelectTextField";
import { StyledButton } from "../common/StyledMaterial";
import useStyles from "../style";
import { useDispatch } from "react-redux";

//Icons
import SendIcon from "@mui/icons-material/Send";
import { addData } from "../../features/dictionarySlice";
import "./Dictionary.css";

const DictionaryFrom = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [type, setType] = useState("integer");
  const [size, setSize] = useState("");

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleData = () => {
    if (!name || !type) return;

    dispatch(addData({ name: name, type: type, size: size }));

    setName("");
    setType("integer");
    setSize("");
  };

  return (
    <div className="dictionary-form-container">
      <Box
        component="form"
        sx={{
          width: 1,
          borderRadius: "16px",
          padding: 1,
        }}
      >
        <TextField
          InputLabelProps={{ className: classes.textfield }}
          InputProps={{
            style: { color: "black", fontWeight: 700, marginTop: "1.5rem" },
          }}
          id="name"
          label="Name"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <CustomizeSelectTextField
          id="type"
          label="Type"
          value={type}
          onChange={handleChangeType}
        />

        <TextField
          InputLabelProps={{ className: classes.textfield }}
          InputProps={{
            style: { color: "black", fontWeight: 700, marginTop: "1.5rem" },
          }}
          id="type"
          label="Size"
          variant="standard"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </Box>
      <br />
      <div className="add-btn">
        <StyledButton
          variant="contained"
          onClick={handleData}
          endIcon={<SendIcon />}
          className={classes.buttonBg}
        >
          Send
        </StyledButton>
      </div>
    </div>
  );
};

export default DictionaryFrom;
