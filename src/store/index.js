import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialFileState = {
  file: [
    {
      name: '동트는 로맨스',
      created_at: '2022-05-10T15:40:36.961502+09:00',
    },
  ],
};

const fileSlice = createSlice({
  name: 'file',
  initialState: initialFileState,
  reducers: {
    addFile(state, action) {
      state.file = [...state.file, action.payload];
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
