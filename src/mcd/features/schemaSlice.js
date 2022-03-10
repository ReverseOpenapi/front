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
          schema.schema.properties.push(action.payload[1])
      );
    },
    removePropertySchema(state, action) {
      state.value.map(
        (schema) =>
          schema.name === action.payload[0] &&
          schema.schema.properties.splice(action.payload[1], 1)
      );
    },
    updateSchemaName(state, action) {
      // state.value.map(
      //   (schema) =>
      //     schema.name === action.payload[3] &&
      //     schema.schema.properties.map((property) => {
      //       if (Object.keys(property).toString() === action.payload[1]) {
      //         let key = action.payload[1]
      //         property.id = property.action.payload[2];
      //         delete property.id;
      //       }
      //     })
      // );
    },
    updateSchemaType(state, action) {
      state.value.map(
        (schema) =>
          schema.name === action.payload[3] &&
          schema.schema.properties.map((property) => {
            if (property[Object.keys(property)].type === action.payload[1]) {
              property[Object.keys(property)].type = action.payload[2];
            }
          })
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
