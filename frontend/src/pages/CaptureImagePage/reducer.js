import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_CONSTANTS } from "../../constants";

export const postImage = createAsyncThunk(
  "image/postImage",
  async (image, thunkAPI) => {
    // csrf token required for POST CALLS
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";

    let formData = new FormData();
    formData.append("file", image);

    const response = await axios({
      method: "post",
      url: APP_CONSTANTS.API_LINKS.POST_IMAGE,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

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
      state.loading = true;
      state.fetchingError = false;
      state.isImageProcessed = false;
    },
    [postImage.fulfilled]: (state, action) => {
      state.imageResults = action.payload;
      state.loading = false;
      state.isImageProcessed = true;
      state.fetchingError = false;
    },
    [postImage.rejected]: (state, action) => {
      state.loading = false;
      state.fetchingError = true;
    },
  },
});

export const { reset, imageUploaded, imageRemoved } = slice.actions;
export default slice.reducer;
