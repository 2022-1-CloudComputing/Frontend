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
      state.file.sort((a, b) => {
        const x = a.title.toLowerCase();
        const y = b.title.toLowerCase();

        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      });
    },
    ascendingFile(state) {
      state.file.sort((a, b) => {
        const x = a.title.toLowerCase();
        const y = b.title.toLowerCase();

        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      });
    },
    descendingFile(state) {
      state.file.sort((a, b) => {
        const x = a.title.toLowerCase();
        const y = b.title.toLowerCase();

        if (x < y) return 1;
        if (x > y) return -1;
        return 0;
      });
    },
    ascendingDateFile(state) {
      state.file.sort((a, b) => {
        const x = a.created_at.toLowerCase();
        const y = b.created_at.toLowerCase();

        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      });
    },
    descendingDateFile(state) {
      state.file.sort((a, b) => {
        const x = a.created_at.toLowerCase();
        const y = b.created_at.toLowerCase();

        if (x < y) return 1;
        if (x > y) return -1;
        return 0;
      });
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
    addTag(state, action) {
      console.log(action.payload.file_id);
      state.file.map((list) => {
        if (list.file_id === action.payload.file_id) {
          list.tag = action.payload.tag;
        }
      });
      console.log(state.file);
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
      state.folder.sort((a, b) => {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();

        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      });
    },
    resetFolder(state, action) {
      state.folder = action.payload;
    },
    ascendingFolder(state) {
      state.folder.sort((a, b) => {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();

        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      });
    },
    descendingFolder(state) {
      state.folder.sort((a, b) => {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();

        if (x < y) return 1;
        if (x > y) return -1;
        return 0;
      });
    },
    ascendingDateFolder(state) {
      state.folder.sort((a, b) => {
        const x = a.created_at.toLowerCase();
        const y = b.created_at.toLowerCase();

        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      });
    },
    descendingDateFolder(state) {
      state.folder.sort((a, b) => {
        const x = a.created_at.toLowerCase();
        const y = b.created_at.toLowerCase();

        if (x < y) return 1;
        if (x > y) return -1;
        return 0;
      });
    },
    renameFolder(state, action) {
      state.folder.map((list) => {
        if (list.folder_id === action.payload.folder_id) {
          list.name = action.payload.name;
        }
      });
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
