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
  },
});

export const { addData } = dictionarySlice.actions;
export default dictionarySlice.reducer;
