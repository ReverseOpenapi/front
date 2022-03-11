import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//'@mui/material'
import { Card, CardHeader, IconButton, Paper } from "@mui/material";

//Customized Materiail components
import CustomizeSelectTextField from "../common/CustomizeSelectTextField";
import CustomizeTextField from "../common/CustomizeTextField";

// icon
import DeleteIcon from "@mui/icons-material/Delete";

// actions
import {
  removePropertySchema,
  updateSchemaName,
  updateSchemaType,
} from "../../features/schemaSlice";
import {
  updateRelationSourceName,
  updateRelationTargetName,
} from "../../features/relationSlice";

//style
import "./Property.css";

const UpdatePropertyForm = ({
  property,
  propertyIndex,
  schemaName,
  handleClose,
}) => {
  const dispatch = useDispatch();

  // data from store
  const schemas = useSelector((state) => state.schemas.value);

  const name = Object.keys(property).toString();
  const type = property[Object.keys(property)].type;

  // setter and getter (state)
  const [propertyName, setPropertyName] = useState(name);
  const [propertyType, setPropertyType] = useState(type);

  // handlers
  const handleChangeType = (event) => {
    setPropertyType(event.target.value);
  };

  const handleValidateName = () => {
    if (propertyName !== name) {
      dispatch(updateSchemaName([schemas, name, propertyName, schemaName]));
      dispatch(
        updateRelationTargetName([schemas, name, propertyName, schemaName])
      );
      dispatch(
        updateRelationSourceName([schemas, name, propertyName, schemaName])
      );
    }
  };

  const handleValidateType = () => {
    if (propertyType !== type) {
      dispatch(
        updateSchemaType([schemas, type, propertyType, schemaName, name])
      );
    }
  };

  const handleDeleteProperty = () => {
    dispatch(removePropertySchema([schemaName, propertyIndex]));
    console.log(propertyIndex);
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
            <IconButton aria-label="settings" onClick={handleDeleteProperty}>
              <DeleteIcon sx={{ color: "	#e10000", opacity: 0.7 }} />
            </IconButton>
          }
        />

        <CustomizeTextField
          type="text"
          id="propertyName"
          label="name"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
          onBlur={handleValidateName}
        />

        <CustomizeSelectTextField
          id="property-type"
          label="Type"
          value={propertyType}
          onChange={handleChangeType}
          onBlur={handleValidateType}
        />
      </Card>
    </div>
  );
};

export default UpdatePropertyForm;
