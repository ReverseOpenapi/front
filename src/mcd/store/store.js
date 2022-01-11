import { configureStore } from "@reduxjs/toolkit";
import dictionaryReducer from "../features/dictionarySlice";
import attributesReducer from "../features/attributeSlice";
import entitiesReducer from "../features/entitySlice";

export const store = configureStore({
  reducer: {
    dictionary: dictionaryReducer,
    attributes: attributesReducer,
    entities: entitiesReducer,
  },
});
