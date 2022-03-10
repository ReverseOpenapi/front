import React, { useState, useEffect } from "react";
import "../style.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

export default function Paths({ dataPath }) {
  const operation = [
    { key: "GET", color: "#3b83f6" },
    { key: "PUT", color: "orange" },
    { key: "POST", color: "#49cc90" },
    { key: "DELETE", color: "red" },
  ];
  const [isClicked, setIsClicked] = useState(false);
  const [opeSelected, setOpeSelected] = useState({ key: "", color: "" });
  let path = "";
  let dataComplete = {};
  const back = false;

  //Select Operation
  const chipsClick = (ope) => {
    setOpeSelected(ope);
    setIsClicked(true);
  };
  const selectOpe = () => {
    setIsClicked(false);
  };

  const handleChange = (event) => {
    path = event.target.value;
    //Need to selected operation to add DataPath
    if (isClicked === false) {
      dataComplete = {
        operationObj: "",
        path: "",
        opeColor: "",
      };
    } else {
      dataComplete = {
        operationObj: opeSelected.key,
        path: path,
        opeColor: opeSelected.color,
      };
    }
  };

  const Field = (
    <TextField
      className="text-field"
      name="test"
      required
      id="filled-required"
      label="Path"
      onChange={(e) => handleChange(e)}
    />
  );

  //IF Operation is not selected, block the Add Path button
  return (
    <div className="">
      <div className="list-item" spacing={1}>
        {isClicked ? (
          <Button
            variant="contained"
            onClick={selectOpe}
            sx={{ backgroundColor: opeSelected.color, margin: "10px" }}
          >
            {opeSelected.key}
          </Button>
        ) : (
          operation.map((ope) => {
            return (
              <Chip
                label={ope.key}
                onClick={() => chipsClick(ope)}
                style={{
                  backgroundColor: ope.color,
                  color: "white",
                  margin: "0px 5px 10px",
                }}
              />
            );
          })
        )}
      </div>
      <div>{Field}</div>
      <Button primary onClick={() => dataPath(back)}>
        Back
      </Button>
      <Button primary onClick={() => dataPath(dataComplete)}>
        Add Path
      </Button>
    </div>
  );
}