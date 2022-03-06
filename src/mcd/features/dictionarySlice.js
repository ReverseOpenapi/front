import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    addData(state, action) {
      state.value.push(action.payload);
    },
    removedata(state, action) {
      state.value.splice(action.payload, 1);
    },
  },
});

export const { addData, removedata } = dictionarySlice.actions;
export default dictionarySlice.reducer;
