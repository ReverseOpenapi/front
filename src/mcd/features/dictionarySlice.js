import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    addProperty(state, action) {
      state.value.push(action.payload);
    },
    removeProperty(state, action) {
      state.value.splice(action.payload, 1);
    },
  },
});

export const { addProperty, removeProperty } = dictionarySlice.actions;
export default dictionarySlice.reducer;
