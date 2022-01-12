import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import useStyles from "./style";
import { StyledTypography } from "./StyledMaterial";

const RelationCard = () => {
  const classes = useStyles();

  const [relationName, setRelationName] = useState("");

  return (
    <div>
      <StyledTypography variant="overline">Relation </StyledTypography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          InputLabelProps={{ className: classes.textfield }}
          InputProps={{
            style: { color: "#8e44ad", fontWeight: 700 },
          }}
          variant="standard"
          type="text"
          id="name"
          placeholder="name of relation"
          value={relationName}
          onChange={(e) => setRelationName(e.target.value)}
        />
      </Box>
      <br />
    </div>
  );
};

export default RelationCard;
