import React, { useState, useEffect } from "react";
import "./Entity.css";
import useStyles from "../style";
import { Box, Button, Divider, TextField } from "@mui/material";
import { StyledTypography } from "../common/StyledMaterial";
import UpdateAttributeForm from "./UpdateAttributeForm";
import AddAttribute from "./AddAttribute";

const UpdateEntity = ({ entityProps, handleClose }) => {
  const classes = useStyles();
  const [entityName, setEntityName] = useState(entityProps.name);
  const [openForm, setOpenForm] = useState(false);

  return (
    <div>
      <StyledTypography variant="overline">
        Collection Properties
      </StyledTypography>
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
      <Button
        sx={{ display: "flex", marginLeft: 2 }}
        variant="contained"
        onClick={() => setOpenForm(!openForm)}
      >
        add attribute to collection
      </Button>
      {openForm && (
        <>
          <AddAttribute
            entity={entityProps}
            setOpenForm={setOpenForm}
            handleClose={handleClose}
          />
          <Divider />
        </>
      )}

      {entityProps?.attributes.lenght !== 0 &&
        entityProps?.attributes.map((attribute, index) => {
          return (
            <UpdateAttributeForm
              attribute={attribute}
              attributeIndex={index}
              entityName={entityName}
              handleClose={handleClose}
              key={index}
            />
          );
        })}
    </div>
  );
};

export default UpdateEntity;
