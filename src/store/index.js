import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialFileState = {
  file: [],
  totalFile: [],
};

const initialBookmarkState = {
  file_id: [],
};

const initialUserState = {
  id: "",
  pw: "",
};

const initialFolderState = {
  folder: [],
};

const fileSlice = createSlice({
  name: "file",
  initialState: initialFileState,
  reducers: {
    addFile(state, action) {
      state.file = [...state.file, action.payload];
    },
    addTotalFile(state, action) {
      state.totalFile = [...state.totalFile, action.payload];
    },
    deleteFile(state, action) {
      state.file = state.file.filter((list) => list.file_id !== action.payload);
    },
    fileClicked(state, action) {
      state.file.map((list) => {
        if (list.file_id === action.payload) {
          list.isClicked = !list.isClicked;
        }
      });
    },
    resetFile(state, action) {
      state.file = action.payload;
    },
    resetTotalFile(state, action) {
      state.totalFile = action.payload;
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

const folderSlice = createSlice({
  name: "folder",
  initialState: initialFolderState,
  reducers: {
    addFolder(state, action) {
      state.folder = [...state.folder, action.payload];
    },
    resetFolder(state, action) {
      state.folder = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    file: fileSlice.reducer,
    user: userSlice.reducer,
    bookmark: bookmarkSlice.reducer,
    folder: folderSlice.reducer,
  },
});

export const fileActions = fileSlice.actions;
export const userActions = userSlice.actions;
export const bookmarkActions = bookmarkSlice.actions;
export const folderActions = folderSlice.actions;

export default store;
