import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTypography,
} from "../common/StyledMaterial";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { removeAttribute } from "../../features/attributeSlice";
import "./Entity.css";

const AttributesList = () => {
  const dispatch = useDispatch();
  const attributes = useSelector((state) => state.attributes.value);

  const handleRemoveAttribute = (index) => {
    dispatch(removeAttribute(index));
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
          Attributes list
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
                <StyledTableCell>Size</StyledTableCell>
                <StyledTableCell>key</StyledTableCell>
                <StyledTableCell>Null</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attributes.map((attribute, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {attribute.key === true ? (
                        <>
                          {attribute.name}
                          <img
                            src="./assets/icons/key-icon.svg"
                            alt="primary-key"
                          />
                        </>
                      ) : (
                        attribute.name
                      )}
                    </StyledTableCell>
                    <StyledTableCell>{attribute.type}</StyledTableCell>
                    <StyledTableCell>{attribute.size}</StyledTableCell>
                    <StyledTableCell>
                      {attribute.key ? (
                        <span style={{ color: "green" }}>true</span>
                      ) : (
                        <span style={{ color: "blue" }}>false</span>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {attribute.nulled ? (
                        <span style={{ color: "green" }}>true</span>
                      ) : (
                        <span style={{ color: "blue" }}>false</span>
                      )}
                    </StyledTableCell>
                    <TableCell
                      style={{ color: "#8B0000", cursor: "pointer" }}
                      onClick={() => handleRemoveAttribute(index)}
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

export default AttributesList;
