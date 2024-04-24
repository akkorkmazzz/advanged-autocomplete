import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: "",
}

export const fetchCharacters = createAsyncThunk(
    "fetchCharacters",
    async (page) => {
        const response = await axios.get(
            `https://rickandmortyapi.com/api/character/?page=${page}`
        )
        return response.data;
    }
)

const CharactersSlice = createSlice({
    name: "character",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchCharacters.rejected, (state, action) => {
            state.loading = false;
            state.error = "Error fetching characters data"
        })
    }
})

export default CharactersSlice.reducer;