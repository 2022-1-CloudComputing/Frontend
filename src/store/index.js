import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialFileState = {
  file: [],
};

const fileSlice = createSlice({
  name: "file",
  initialState: initialFileState,
  reducers: {
    addFile(state, action) {
      state.file = [...state.file, action.payload];
    },
    deleteFile(state, action) {
      state.file = state.file.filter((list) => list.fileId !== action.payload);
    },
    bookmarkFile(state, action) {
      const tempList = [...state.file];
      tempList.filter((list) => {
        if (list.name === action.payload) list.bookmark = !list.bookmark;
      });
      state.file = tempList;
    },
  },
});

const store = configureStore({
  reducer: {
    file: fileSlice.reducer,
  },
});

export const fileActions = fileSlice.actions;

export default store;
