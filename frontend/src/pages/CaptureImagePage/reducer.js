import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postImage = createAsyncThunk(
  "image/postImage", //action type
  async (thunkAPI) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts").then(
      (data) => data.json()
    );
    return res;
  }
);

const INTIAL_STATE = {
  isImageProcessed: false,
  loading: false,
  fetchingError: false,
  imageResults: [],
};

const slice = createSlice({
  name: "image",
  initialState: INTIAL_STATE,
  reducers: {
    reset: (state, action) => INTIAL_STATE,
  },
  extraReducers: {
    [postImage.pending]: (state, action) => {
      state.loading = true;
    },
    [postImage.fulfilled]: (state, action) => {
      state.loading = false;
      state.isImageProcessed = true;
      state.imageResults = action.payload;
    },
    [postImage.rejected]: (state, action) => {
      state.loading = false;
      state.fetchingError = true;
    },
  },
});

export const { reset } = slice.actions;
export default slice.reducer;
