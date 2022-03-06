import React from "react";
import { TextField } from "@mui/material";
import useStyles from "../style";

const CustomizeTextField = ({
  type,
  label,
  id,
  onChange,
  value,
  onBlur,
  helperText,
  error,
}) => {
  const classes = useStyles();

  return (
    <TextField
      InputLabelProps={{ className: classes.textfield }}
      InputProps={{
        style: { color: "black", fontWeight: 700, marginTop: "1.5rem" },
      }}
      variant="standard"
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      label={label}
      onBlur={onBlur}
      helperText={helperText}
      required
      error={error}
    />
  );
};

export default CustomizeTextField;
