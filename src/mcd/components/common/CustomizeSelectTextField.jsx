import React from "react";
import { TextField } from "@mui/material";
import useStyles from "../style";

const selectOptions = [
  {
    value: "integer",
    label: "integer",
  },
  {
    value: "char",
    label: "char",
  },
  {
    value: "varchar",
    label: "varchar",
  },
  {
    value: "boolean",
    label: "boolean",
  },
  {
    value: "datetime",
    label: "datetime",
  },
  {
    value: "timestamp",
    label: "timestamp",
  },
  {
    value: "enum",
    label: "enum",
  },
];

const CustomizeSelectTextField = ({ id, onChange, value, label, onBlur }) => {
  const classes = useStyles();

  return (
    <TextField
      variant="standard"
      InputLabelProps={{ className: classes.textfield }}
      InputProps={{
        style: { color: "black", fontWeight: 700 },
      }}
      sx={{ m: 1, minWidth: 180, maxWidth: 180 }}
      SelectProps={{
        native: true,
      }}
      id={id}
      select
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
      {selectOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );
};

export default CustomizeSelectTextField;
