import { configureStore } from "@reduxjs/toolkit";
import CharactersSlice from "./reducers/CharactersSlice";

export default configureStore({
    reducer: {
        character: CharactersSlice,
    },
});