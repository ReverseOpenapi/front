import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DictionaryFrom from "./DictionaryFrom";

//'@mui/material/'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableCell } from "@mui/material";

// Styles
import {
  StyledTableCell,
  StyledTableRow,
  StyledTypography,
} from "../common/StyledMaterial";
import "./Dictionary.css";

//actions from slice
import { removeProperty } from "../../features/dictionarySlice";

const DictionaryCard = () => {
  const dispatch = useDispatch();

  //* get data from store (db)
  const dictionary = useSelector((state) => state.dictionary.value);

  const handleRemovePropertyFromDictionary = (index) => {
    dispatch(removeProperty(index));
  };

  return (
    <div className="wrap-container">
      <div className="dictionary-form">
        <StyledTypography variant="subtitle1">
          Add properties to dictionary
        </StyledTypography>

        <DictionaryFrom />
      </div>
      <div className="dictionary-list">
        <StyledTypography variant="subtitle1">
          Dictionary of properties
        </StyledTypography>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 200, borderColor: "white" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="left">Type</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dictionary.map((data, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {data.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">{data.type}</StyledTableCell>
                    <TableCell
                      style={{ color: "#8B0000", cursor: "pointer" }}
                      onClick={() => handleRemovePropertyFromDictionary(index)}
                    >
                      delete
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DictionaryCard;
