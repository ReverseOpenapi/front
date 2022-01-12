import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const entitySlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    addEntity(state, action) {
      state.value.push(action.payload);
    },
  },
});

export const { addEntity } = entitySlice.actions;

export default entitySlice.reducer;
