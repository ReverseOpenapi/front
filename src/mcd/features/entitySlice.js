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
    removeEntity(state, action) {
      state.value.splice(action.payload, 1);
    },
    addAttributeToEntity(state, action) {
      state.value.map(
        (entity) =>
          entity.name === action.payload[0] &&
          entity.attributes.push(action.payload[1])
      );
    },
    removeAttributeToEntity(state, action) {
      state.value.map(
        (entity) =>
          entity.name === action.payload[0] &&
          entity.attributes.splice(action.payload[1], 1)
      );
    },
    updateEntityName(state, action) {
      state.value.map((entity) =>
        entity.name === action.payload[3]
          ? (entity.attributes.find((v) => v.name === action.payload[1]).name =
              action.payload[2])
          : ""
      );
    },
    updateEntityType(state, action) {
      state.value.map((entity) =>
        entity.name === action.payload[3]
          ? (entity.attributes.find((v) => v.type === action.payload[1]).type =
              action.payload[2])
          : ""
      );
    },
    updateEntitySize(state, action) {
      state.value.map((entity) =>
        entity.name === action.payload[3]
          ? (entity.attributes.find((v) => v.size === action.payload[1]).size =
              action.payload[2])
          : ""
      );
    },
    updateEntityKey(state, action) {
      state.value.map((entity) =>
        entity.name === action.payload[3]
          ? (entity.attributes.find((v) => v.key === action.payload[1]).key =
              action.payload[2])
          : ""
      );
    },
    updateEntityNulled(state, action) {
      state.value.map((entity) =>
        entity.name === action.payload[3]
          ? (entity.attributes.find(
              (v) => v.nulled === action.payload[1]
            ).nulled = action.payload[2])
          : ""
      );
    },
  },
});

export const {
  addEntity,
  removeEntity,
  addAttributeToEntity,
  removeAttributeToEntity,
  updateEntityName,
  updateEntityType,
  updateEntitySize,
  updateEntityKey,
  updateEntityNulled,
} = entitySlice.actions;

export default entitySlice.reducer;
