import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const attributeSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {
    addAttribute(state, action) {
      state.value.push(action.payload);
    },
  },
});

export const { addAttribute } = attributeSlice.actions;

export default attributeSlice.reducer;
