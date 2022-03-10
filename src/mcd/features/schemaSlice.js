import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const schemaSlice = createSlice({
  name: "schemas",
  initialState,
  reducers: {
    addSchema(state, action) {
      state.value.push(action.payload);
    },
    removeSchema(state, action) {
      state.value.splice(action.payload, 1);
    },
    addPropertyToSchema(state, action) {
      state.value.map(
        (schema) =>
          schema.name === action.payload[0] &&
          schema.properties.push(action.payload[1])
      );
    },
    removePropertySchema(state, action) {
      state.value.map(
        (schema) =>
          schema.name === action.payload[0] &&
          schema.properties.splice(action.payload[1], 1)
      );
    },
    updateSchemaName(state, action) {
      state.value.map(
        (schema) =>
          schema.name === action.payload[3] &&
          (schema.properties.find((v) => v.name === action.payload[1]).name =
            action.payload[2])
      );
    },
    updateSchemaType(state, action) {
      state.value.map(
        (schema) =>
          schema.name === action.payload[3] &&
          (schema.properties.find((v) => v.type === action.payload[1]).type =
            action.payload[2])
      );
    },
  },
});

export const {
  addSchema,
  removeSchema,
  addPropertyToSchema,
  removePropertySchema,
  updateSchemaName,
  updateSchemaType,
} = schemaSlice.actions;

export default schemaSlice.reducer;
