import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialFileState = {
  file: [],
};

const initialBookmarkState = {
  file_id: [],
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
  },
});

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: initialBookmarkState,
  reducers: {
    addBookmark(state, action) {
      state.file_id = [...state.file_id, action.payload];
    },
    setBookmark(state, action) {
      state.file_id = action.payload;
    },
    deleteBookmark(state, action) {
      state.file_id = state.file_id.filter(
        (fileId) => fileId !== action.payload
      );
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
    bookmark: bookmarkSlice.reducer,
  },
});

export const fileActions = fileSlice.actions;
export const userActions = userSlice.actions;
export const bookmarkActions = bookmarkSlice.actions;

export default store;
