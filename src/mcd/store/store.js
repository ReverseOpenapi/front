import { configureStore } from "@reduxjs/toolkit";
import dictionaryReducer from "../features/dictionarySlice";
import propertyReducer from "../features/propertySlice";
import schemaReducer from "../features/schemaSlice";
import relationRreducer from "../features/relationSlice";
import { loadState, saveState } from "./localStorage";

export const store = configureStore({
  reducer: {
    dictionary: dictionaryReducer,
    relations: relationRreducer,
    properties: propertyReducer,
    schemas: schemaReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});
