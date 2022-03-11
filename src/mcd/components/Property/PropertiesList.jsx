import React from "react";
import { useSelector, useDispatch } from "react-redux";

//Customized Material components
import {
  StyledTableCell,
  StyledTableRow,
  StyledTypography,
} from "../common/StyledMaterial";

//'@maui/material'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// action
import { removeProperty } from "../../features/propertySlice";

//style
import "./Property.css";

const PropertiesList = () => {
  const dispatch = useDispatch();

  //* get data from store (db)
  const properties = useSelector((state) => state.properties.value);

  //* handler
  const handleRemoveProperty = (index) => {
    dispatch(removeProperty(index));
  };

  return (
    <div>
      <div className="wrap-container">
        <StyledTypography
          sx={{
            width: 1,
            borderRadius: "16px",
            padding: 1,
          }}
          variant="subtitle1"
        >
          Properties list
        </StyledTypography>
        <TableContainer
          component={Paper}
          sx={{ minWidth: 200, maxWidth: 1170, borderColor: "white" }}
        >
          <Table
            sx={{ width: 1, borderColor: "white" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {properties.map((property, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{Object.keys(property)}</StyledTableCell>
                    <StyledTableCell>
                      {property[Object.keys(property)].type}
                    </StyledTableCell>
                    <TableCell
                      style={{ color: "#8B0000", cursor: "pointer" }}
                      onClick={() => handleRemoveProperty(index)}
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

export default PropertiesList;
