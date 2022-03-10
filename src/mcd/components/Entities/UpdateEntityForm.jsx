import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import useStyles from "../style";
import { StyledTypography } from "../common/StyledMaterial";
import UpdateAttributeForm from "./UpdateAttributeForm";

const UpdateEntity = ({ entityProps }) => {
  const classes = useStyles();
  const [entityName, setEntityName] = useState(entityProps.name);

  return (
    <div>
      <StyledTypography variant="overline">Entity Properties</StyledTypography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "29ch" },
        }}
      >
        <TextField
          InputLabelProps={{ className: classes.textfield }}
          InputProps={{
            style: { color: "#8e44ad", fontWeight: 700 },
          }}
          value={entityName}
          onChange={(e) => setEntityName(e.target.value)}
          variant="standard"
          type="text"
          id="name"
          disabled
        />
      </Box>
      {entityProps?.attributes.lenght !== 0 &&
        entityProps?.attributes.map((attribute, index) => {
          return (
            <UpdateAttributeForm
              attribute={attribute}
              attributeIndex={index}
              entityName={entityName}
              key={index}
            />
          );
        })}
    </div>
  );
};

export default UpdateEntity;
