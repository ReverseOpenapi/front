import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAttribute } from "../features/attributeSlice";
import { addEntity } from "../features/entitySlice";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  Card,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

//Icons
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloseIcon from "@mui/icons-material/Close";

import useStyles from "./style";

import {
  StyledButton,
  StyledTableCell,
  StyledTableRow,
  StyledTypography,
} from "./StyledMaterial";

const EntityCard = () => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const dictionary = useSelector((state) => state.dictionary.value);
  const attributes = useSelector((state) => state.attributes.value);
  const entities = useSelector((state) => state.entities.value);

  console.log(entities);
  console.log(attributes);

  //data entity
  const [entityName, setEntityName] = useState("");
  const [attributeName, setAttributeName] = useState("");
  const [attributeType, setAttributeType] = useState("");
  const [attributeSize, setAttributeSize] = useState("");
  const [attributeKey, setAttributeKey] = useState("");
  const [attributeNulled, setAttributeNulled] = useState(false);

  const toogleOpen = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const myfunction = (e) => {
    dictionary.map((data) => {
      if (data.name === e.target.value) {
        setAttributeName(data.name);
        setAttributeType(data.type);
        setAttributeSize(data.size);
      }
    });
  };

  const handleAttributes = () => {
    if (!attributeName || !attributeType || !attributeSize) return;

    dispatch(
      addAttribute({
        name: attributeName,
        type: attributeType,
        size: attributeSize,
        key: attributeKey,
        nulled: attributeNulled,
      })
    );

    setAttributeName("");
    setAttributeType("");
    setAttributeSize("");
    setAttributeKey("");
  };

  const handleEntity = () => {
    if (attributes.length == 0 || !entityName) return;

    dispatch(addEntity({ entityName: entityName, attributes: attributes }));
  };

  return (
    <div className="entity-template">
      <StyledTypography variant="overline">Entity Properties</StyledTypography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          InputLabelProps={{ className: classes.textfield }}
          InputProps={{
            style: { color: "#8e44ad", fontWeight: 700 },
          }}
          variant="standard"
          type="text"
          id="name"
          placeholder="name of entity"
          value={entityName}
          onChange={(e) => setEntityName(e.target.value)}
        />
      </Box>
      <Card
        component={Paper}
        className="area"
        style={{ backgroundColor: "#333340" }}
      >
        <Box
          component="animate"
          sx={{
            "& > :not(style)": { m: 0.1, width: "25ch" },
          }}
        >
          <StyledButton
            variant="text"
            className={classes.buttonBg}
            onClick={() => toogleOpen()}
          >
            Data dictionary {open ? <CloseIcon /> : <MenuBookIcon />}
          </StyledButton>
        </Box>
        {open && (
          <div className="input-field">
            <InputLabel
              id="data-from-dic"
              className={classes.textfield}
              color="warning"
              focused
            >
              Select
            </InputLabel>
            <Select
              id="data-from-dic"
              value={selectedData}
              onChange={(e) => myfunction(e)}
            >
              <MenuItem value="none">None</MenuItem>
              {dictionary.map((data, index) => {
                return (
                  <MenuItem value={data.name} key={index}>
                    {data.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        )}
        <TextField
          InputLabelProps={{ className: classes.textfield }}
          InputProps={{
            style: { color: "white", fontWeight: 100 },
          }}
          variant="standard"
          type="text"
          id="attributeName"
          placeholder="name"
          value={attributeName}
          onChange={(e) => setAttributeName(e.target.value)}
        />
        <FormControl
          variant="filled"
          className={classes.greenUnderline}
          sx={{ m: 1, minWidth: 180, maxWidth: 180 }}
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
            value={attributeType}
            onChange={(e) => setAttributeType(e.target.value)}
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
            style: { color: "white", fontWeight: 100 },
          }}
          variant="standard"
          type="number"
          id="attributeSize"
          placeholder="Size"
          value={attributeSize}
          onChange={(e) => setAttributeSize(e.target.value)}
        />

        <FormControl
          variant="standard"
          className={classes.greenUnderline}
          sx={{ m: 1, minWidth: 180, maxWidth: 180 }}
        >
          <InputLabel
            id="select-type"
            className={classes.textfield}
            color="warning"
            focused
          >
            Key
          </InputLabel>
          <Select
            labelId="select-type"
            id="key"
            value={attributeKey}
            onChange={(e) => setAttributeKey(e.target.value)}
            style={{ color: "white" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="prk">Primary Key</MenuItem>
            <MenuItem value="unique">Unique</MenuItem>
            <MenuItem value="index">Index</MenuItem>
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            className={classes.checkboxLabel}
            control={
              <Checkbox
                color="secondary"
                id="nulled"
                name="nulled"
                value={attributeNulled}
                onChange={() => setAttributeNulled(!attributeNulled)}
              />
            }
            label="Null"
          />
        </FormGroup>
        <StyledButton
          variant="contained"
          className={classes.buttonBg}
          onClick={handleAttributes}
        >
          Add
        </StyledButton>
      </Card>

      <br />
      <StyledTypography variant="overline">Attributes list</StyledTypography>
      <div className="dictionary-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Type</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attributes.map((attribute, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {attribute.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {attribute.type}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <br />
      <StyledButton
        variant="contained"
        className={classes.buttonBg}
        onClick={handleEntity}
      >
        Create
      </StyledButton>
    </div>
  );
};

export default EntityCard;
