import { configureStore } from "@reduxjs/toolkit";
import dictionaryReducer from "../features/dictionarySlice";
import attributesReducer from "../features/attributeSlice";
import entitiesReducer from "../features/entitySlice";
import relationreducer from "../features/relationSlice";
import { loadState, saveState } from "./localStorage";

export const store = configureStore({
  reducer: {
    dictionary: dictionaryReducer,
    attributes: attributesReducer,
    entities: entitiesReducer,
    relations: relationreducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});
