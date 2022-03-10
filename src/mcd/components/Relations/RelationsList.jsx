import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//'@mui/material'
import { TableCell } from "@material-ui/core";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

//Customized Material component
import {
  StyledTableCell,
  StyledTableRow,
  StyledTypography,
} from "../common/StyledMaterial";

// action
import {
  removeRelation,
  updateRelationTargetName,
} from "../../features/relationSlice";
import { updateSchemaName } from "../../features/schemaSlice";

// react-icons
import { GrLink } from "react-icons/gr";

const RelationsList = () => {
  const dispatch = useDispatch();

  //* get data from store
  const relations = useSelector((state) => state.relations.value);

  //handlers
  const handleRemoveRelation = (index) => {
    dispatch(removeRelation(index));
  };

  return (
    <div>
      <StyledTypography variant="subtitle1">Relations list</StyledTypography>
      <div>
        <TableContainer
          component={Paper}
          sx={{ minWidth: 400, maxWidth: 500, borderColor: "white" }}
        >
          <Table
            sx={{ minWidth: 400, maxWidth: 500, borderColor: "white" }}
            aria-label="customized schema"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Source</StyledTableCell>
                <StyledTableCell>target</StyledTableCell>
                <StyledTableCell>actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {relations.map((relation, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      {relation.source.schema} <br /> <GrLink />{" "}
                      {relation.source.port}
                    </StyledTableCell>
                    <StyledTableCell>
                      {relation.target.schema} <br />
                      <GrLink />
                      {relation.target.port}
                    </StyledTableCell>
                    <TableCell
                      style={{ color: "#8B0000", cursor: "pointer" }}
                      onClick={() => handleRemoveRelation(index)}
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

export default RelationsList;
