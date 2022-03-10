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
import "./Dictionary.css";

// Styled Material Components
import {
  StyledTableCell,
  StyledTableRow,
  StyledTypography,
} from "../common/StyledMaterial";
import { TableCell } from "@mui/material";
import { removedata } from "../../features/dictionarySlice";

const DictionaryCard = () => {
  const dispatch = useDispatch();
  const dictionary = useSelector((state) => state.dictionary.value);

  const handleRemoveAttributeFromDictionary = (index) => {
    dispatch(removedata(index));
  };

  return (
    <div className="wrap-container" data-testid="dictionary-card">
      <div className="dictionary-form">
        <StyledTypography variant="subtitle1">
          Add a new data in dictionary
        </StyledTypography>

        <DictionaryFrom />
      </div>
      <div className="dictionary-list">
        <StyledTypography variant="subtitle1">Data dictionary</StyledTypography>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 200, borderColor: "white" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Type</StyledTableCell>
                <StyledTableCell align="right">Size</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
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
                    <TableCell
                      style={{ color: "#8B0000", cursor: "pointer" }}
                      onClick={() => handleRemoveAttributeFromDictionary(index)}
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
