import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import useStyles from "../style";

const CustomizeCheckBox = ({
  id,
  name,
  value,
  onChange,
  label,
  checked,
  onBlur,
}) => {
  const classes = useStyles();

  return (
    <FormGroup>
      <FormControlLabel
        className={classes.checkboxLabel}
        control={
          <Checkbox
            color="secondary"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            checked={checked}
            onBlur={onBlur}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default CustomizeCheckBox;
