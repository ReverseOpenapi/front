import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addData } from "../features/dictionarySlice";

//import styled
import useStyles from "./style";

//Icons
import SendIcon from "@mui/icons-material/Send";

//'@mui/material/'
import { Typography } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// Styled Material Components
import {
  StyledButton,
  StyledTableCell,
  StyledTableRow,
} from "./StyledMaterial";

const DictionaryCard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");

  const dictionary = useSelector((state) => state.dictionary.value);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleData = () => {
    if (!name || !type || !size) return;

    dispatch(addData({ name: name, type: type, size: size }));

    setName("");
    setType("");
    setSize("");
  };

  return (
    <div className="dictionary-template">
      <Typography variant="h5">Data dictionary</Typography>
      <div className="dictionary-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Type</StyledTableCell>
                <StyledTableCell align="right">Size</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dictionary.map((data, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {data.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{data.type}</StyledTableCell>
                    <StyledTableCell align="right">{data.size}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <br />
      <div>
        <Typography variant="h6">Add a new data</Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 0.1, width: "20ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            InputLabelProps={{ className: classes.textfield }}
            InputProps={{
              className: classes.greenUnderline,
              style: { color: "silver" },
            }}
            id="name"
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FormControl
            variant="filled"
            className={classes.greenUnderline}
            sx={{ m: 1, minWidth: 120 }}
          >
            <InputLabel
              id="select-type"
              className={classes.textfield}
              color="warning"
              focused
            >
              Type
            </InputLabel>
            <Select
              labelId="select-type"
              id="type"
              value={type}
              onChange={handleChange}
              style={{ color: "silver" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Varchar">Varchar</MenuItem>
              <MenuItem value="Int">Integer</MenuItem>
              <MenuItem value="Bool">Boolean</MenuItem>
              <MenuItem value="Date">Date</MenuItem>
            </Select>
          </FormControl>

          <TextField
            InputLabelProps={{ className: classes.textfield }}
            InputProps={{
              className: classes.greenUnderline,
              style: { color: "silver" },
            }}
            id="type"
            label="Size"
            variant="filled"
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
    </div>
  );
};

export default DictionaryCard;
