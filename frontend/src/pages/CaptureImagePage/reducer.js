import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postImage = createAsyncThunk(
  "image/postImage",
  async (thunkAPI) => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return res.data;
  }
);

// export const postImage = async () => {
//   const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
//   console.log(res);
//   return res.data;
// };
const INTIAL_STATE = {
  loading: false,
  isImageUploaded: false,
  isImageProcessed: false,
  fetchingError: false,
  imageResults: [],
};

const slice = createSlice({
  name: "image",
  initialState: INTIAL_STATE,
  reducers: {
    reset: (state, action) => INTIAL_STATE,
    imageUploaded: (state, action) => {
      state.isImageUploaded = true;
    },
    imageRemoved: (state, action) => {
      state.isImageUploaded = false;
    },
  },
  extraReducers: {
    [postImage.pending]: (state, action) => {
      console.log("PENDING");
      state.loading = true;
    },
    [postImage.fulfilled]: (state, action) => {
      console.log("FULFILLED");
      state.loading = false;
      state.isImageProcessed = true;
      state.imageResults = action.payload;
    },
    [postImage.rejected]: (state, action) => {
      console.log("REJECTED");
      state.loading = false;
      state.fetchingError = true;
    },
  },
});

export const { reset, imageUploaded, imageRemoved } = slice.actions;
export default slice.reducer;
