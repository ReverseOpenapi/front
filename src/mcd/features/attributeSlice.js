import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [{ name: "id", type: "integer", size: 255, key: true, nulled: false }],
};

export const attributeSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {
    addAttribute(state, action) {
      state.value.push(action.payload);
    },
    removeAttribute(state, action) {
      state.value.splice(action.payload, 1);
    },
    initializeAttributesList(state, action) {
      state.value.splice(1);
    },
  },
});

export const { addAttribute, removeAttribute, initializeAttributesList } =
  attributeSlice.actions;

export default attributeSlice.reducer;
