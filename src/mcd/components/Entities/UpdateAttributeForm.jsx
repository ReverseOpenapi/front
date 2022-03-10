import { Card, CardHeader, IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAttributeToEntity,
  updateEntityKey,
  updateEntityName,
  updateEntityNulled,
  updateEntitySize,
  updateEntityType,
} from "../../features/entitySlice";
import {
  updateRelationSourceName,
  updateRelationTargetName,
} from "../../features/relationSlice";

import CustomizeCheckBox from "../common/CustomizeCheckBox";
import CustomizeSelectTextField from "../common/CustomizeSelectTextField";
import CustomizeTextField from "../common/CustomizeTextField";
import "./Entity.css";
import DeleteIcon from "@mui/icons-material/Delete";

const UpdateAttributeForm = ({
  attribute,
  entityName,
  attributeIndex,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const { type, size, key, nulled, name } = attribute;
  const [attributeType, setAttributeType] = useState(type);
  const [attributeSize, setAttributeSize] = useState(size);
  const [attributeKey, setAttributeKey] = useState(key);
  const [attributeNulled, setAttributeNulled] = useState(nulled);
  const [attributeName, setAttributeName] = useState(name);
  const entities = useSelector((state) => state.entities.value);

  const handleChangeType = (event) => {
    setAttributeType(event.target.value);
  };

  const validateName = () => {
    if (attributeName !== name) {
      dispatch(updateEntityName([entities, name, attributeName, entityName]));
      dispatch(
        updateRelationTargetName([entities, name, attributeName, entityName])
      );
      dispatch(
        updateRelationSourceName([entities, name, attributeName, entityName])
      );
    }
  };
  const validateType = () => {
    if (attributeType !== type) {
      dispatch(updateEntityType([entities, type, attributeType, entityName]));
    }
  };
  const validateSize = () => {
    if (attributeSize !== size) {
      dispatch(updateEntitySize([entities, size, attributeSize, entityName]));
    }
  };
  const validateKey = () => {
    if (attributeKey !== key) {
      dispatch(updateEntityKey([entities, key, attributeKey, entityName]));
    }
  };
  const validateNulled = () => {
    if (attributeNulled !== type) {
      dispatch(
        updateEntityNulled([entities, nulled, attributeNulled, entityName])
      );
    }
  };

  const handleDeleteAttribute = () => {
    dispatch(removeAttributeToEntity([entityName, attributeIndex]));
    handleClose();
  };

  return (
    <div>
      <Card
        component={Paper}
        className="area"
        sx={{ m: 1, minWidth: 230, maxWidth: 230, marginLeft: 2.5 }}
      >
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={handleDeleteAttribute}>
              <DeleteIcon sx={{ color: "	#e10000", opacity: 0.7 }} />
            </IconButton>
          }
        />

        <CustomizeTextField
          type="text"
          id="attributeName"
          label="name"
          value={attributeName}
          onChange={(e) => setAttributeName(e.target.value)}
          onBlur={validateName}
        />

        <CustomizeSelectTextField
          id="attribute-type"
          label="Type"
          value={attributeType}
          onChange={handleChangeType}
          onBlur={validateType}
        />

        <CustomizeTextField
          label="Size"
          type="number"
          id="attributeSize"
          value={attributeSize}
          onChange={(e) => setAttributeSize(e.target.value)}
          onBlur={validateSize}
        />

        <CustomizeCheckBox
          id="key"
          name="key"
          value={attributeKey}
          onChange={() => setAttributeKey(!attributeKey)}
          label="primary key"
          checked={attributeKey === true ? true : false}
          onBlur={validateKey}
        />

        <CustomizeCheckBox
          id="nulled"
          name="nulled"
          value={attributeNulled}
          onChange={() => setAttributeNulled(!attributeNulled)}
          label="null"
          checked={attributeNulled === true ? true : false}
          onBlur={validateNulled}
        />
      </Card>
    </div>
  );
};

export default UpdateAttributeForm;
