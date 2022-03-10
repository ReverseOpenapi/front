import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      id: {
        type: "integer",
      },
    },
  ],
};

export const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    addProperty(state, action) {
      state.value.push(action.payload);
    },
    removeProperty(state, action) {
      state.value.splice(action.payload, 1);
    },
    initializePropertiesList(state, action) {
      state.value.splice(1);
    },
  },
});

export const { addProperty, removeProperty, initializePropertiesList } =
  propertySlice.actions;

export default propertySlice.reducer;
