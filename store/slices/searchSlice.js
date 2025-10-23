// store/slices/searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    searchStart: (state) => {
      state.loading = true;
      state.error = null;
      state.results = [];
    },
    searchSuccess: (state, action) => {
      state.loading = false;
      state.results = action.payload;
    },
    searchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.error = null;
    },
  },
});

export const {
  setQuery,
  searchStart,
  searchSuccess,
  searchFailure,
  clearResults,
} = searchSlice.actions;

export default searchSlice.reducer;
