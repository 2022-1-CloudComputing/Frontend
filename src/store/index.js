import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialFileState = {
  file: [],
};

const initialUserState = {
  id: "",
  pw: "",
};

const fileSlice = createSlice({
  name: "file",
  initialState: initialFileState,
  reducers: {
    addFile(state, action) {
      state.file = [...state.file, action.payload];
    },
    deleteFile(state, action) {
      state.file = state.file.filter((list) => list.file_id !== action.payload);
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

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserInfo(state, action) {
      state.id = action.payload.id;
      state.pw = action.payload.pw;
    },
  },
});

const store = configureStore({
  reducer: {
    file: fileSlice.reducer,
    user: userSlice.reducer,
  },
});

export const fileActions = fileSlice.actions;
export const userActions = userSlice.actions;

export default store;
