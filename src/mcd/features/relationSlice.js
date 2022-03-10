import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const relationSlice = createSlice({
  name: "relation",
  initialState,
  reducers: {
    addRelation(state, action) {
      state.value.push(action.payload);
    },
    removeRelation(state, action) {
      state.value.splice(action.payload, 1);
    },
    updateRelationTargetName(state, action) {
      state.value.map((relation) =>
        relation.target.table === action.payload[3]
          ? (relation.target.port = action.payload[2])
          : ""
      );
    },
    updateRelationSourceName(state, action) {
      state.value.map((relation) =>
        relation.source.table === action.payload[3]
          ? (relation.source.port = action.payload[2])
          : ""
      );
    },
  },
});

export const {
  addRelation,
  removeRelation,
  updateRelationTargetName,
  updateRelationSourceName,
} = relationSlice.actions;

export default relationSlice.reducer;
