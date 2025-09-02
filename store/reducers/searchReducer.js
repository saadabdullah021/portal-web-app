import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedLocation: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('selectedLocation', JSON.stringify(action.payload));
        } catch {}
      }
    },
  },
});

export const { setSelectedLocation } = searchSlice.actions;
export default searchSlice.reducer;

