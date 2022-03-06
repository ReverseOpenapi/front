import React from "react";
import { TextField } from "@mui/material";
import useStyles from "../style";

const SelectInput = ({
  id,
  onChange,
  value,
  error,
  helperText,
  label,
  selectOptions = [],
}) => {
  const classes = useStyles();

  return (
    <>
      <TextField
        variant="standard"
        InputLabelProps={{ className: classes.textfield }}
        InputProps={{
          style: { color: "black", fontWeight: 700 },
        }}
        sx={{ m: 1, minWidth: 120, maxWidth: 120 }}
        SelectProps={{
          native: true,
        }}
        id={id}
        select
        label={label}
        value={value}
        onChange={onChange}
        required
        helperText={helperText}
        error={error}
      >
        <option value={""}></option>
        {selectOptions.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </TextField>
    </>
  );
};

export default SelectInput;
