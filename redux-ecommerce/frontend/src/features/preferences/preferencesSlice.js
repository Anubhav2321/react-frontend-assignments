import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  viewMode: 'grid', // 'grid' | 'list'
  itemsPerPage: 8,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = Number(action.payload) || 8;
    },
  },
});

export const { toggleTheme, setViewMode, setItemsPerPage } = preferencesSlice.actions;

export const selectTheme = (state) => state.preferences.theme;
export const selectViewMode = (state) => state.preferences.viewMode;
export const selectItemsPerPage = (state) => state.preferences.itemsPerPage;

export default preferencesSlice.reducer;

