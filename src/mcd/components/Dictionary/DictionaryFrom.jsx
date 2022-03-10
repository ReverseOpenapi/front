import React, { useState } from "react";
import { useDispatch } from "react-redux";

//Material Icon
import SendIcon from "@mui/icons-material/Send";

//'@mui/material'
import { Box, TextField } from "@mui/material";

//Customized Material componenents
import { StyledButton } from "../common/StyledMaterial";
import CustomizeSelectTextField from "../common/CustomizeSelectTextField";

//style
import "./Dictionary.css";
import useStyles from "../style";

// action from slice
import { addProperty } from "../../features/dictionarySlice";

const DictionaryFrom = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // setter and getter (state)
  const [name, setName] = useState("");
  const [type, setType] = useState("integer");

  //handlers
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleCreateProperty = () => {
    if (!name || !type) return;

    dispatch(addProperty({ name: name, type: type }));

    setName("");
    setType("integer");
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
      </Box>
      <br />
      <div className="add-btn">
        <StyledButton
          variant="contained"
          onClick={handleCreateProperty}
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
