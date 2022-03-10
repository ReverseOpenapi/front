import React, { useState } from "react";
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
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableCell } from "@material-ui/core";
import {
  removeRelation,
  updateRelationTargetName,
} from "../../features/relationSlice";
import { GrLink } from "react-icons/gr";
import { updateEntityName } from "../../features/entitySlice";

const RelationsList = () => {
  const dispatch = useDispatch();
  const relations = useSelector((state) => state.relations.value);
  const entities = useSelector((state) => state.entities.value);
  const [attributeName, setAttributeName] = useState("");
  const [openInput, setOpenInput] = useState(true);

  const handleRemoveRelation = (index) => {
    dispatch(removeRelation(index));
  };

  const handleRename = (
    relationTargetPortRename,
    relationTargetPortNotRename,
    relationTargetTable
  ) => {
    if (
      !attributeName &&
      relationTargetPortRename !== attributeName &&
      relationTargetPortRename !== relationTargetPortNotRename
    ) {
      dispatch(
        updateEntityName([
          entities,
          relationTargetPortNotRename,
          relationTargetPortRename,
          relationTargetTable,
        ])
      );
      dispatch(
        updateRelationTargetName([
          relations,
          relationTargetPortNotRename,
          relationTargetPortRename,
          relationTargetTable,
        ])
      );
      setOpenInput(false);
    } else if (attributeName && attributeName === relationTargetPortNotRename) {
    } else {
      dispatch(
        updateEntityName([
          entities,
          relationTargetPortNotRename,
          attributeName,
          relationTargetTable,
        ])
      );
      dispatch(
        updateRelationTargetName([
          relations,
          relationTargetPortNotRename,
          relationTargetPortRename,
          relationTargetTable,
        ])
      );
      setOpenInput(false);
    }
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
            aria-label="customized table"
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
                      {relation.source.table} <br /> <GrLink />{" "}
                      {relation.source.port}
                    </StyledTableCell>
                    <StyledTableCell>
                      {relation.target.table} <br />
                      <GrLink />
                      {openInput ? (
                        <>
                          {"(rename suggestion)"}
                          <input
                            type="type"
                            id="source"
                            className="input"
                            defaultValue={`${relation.source.table}_${relation.source.port}`}
                            onChange={(e) => setAttributeName(e.target.value)}
                          />
                          <button
                            onClick={() =>
                              handleRename(
                                relation.source.table +
                                  "_" +
                                  relation.source.port,
                                relation.target.port,
                                relation.target.table
                              )
                            }
                          >
                            validate
                          </button>
                        </>
                      ) : (
                        relation.target.port
                      )}
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
