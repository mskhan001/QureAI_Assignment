import { useDispatch, useSelector } from "react-redux";
import { postImage, reset } from "./reducer";

import axios from "axios";
import { useEffect } from "react";
const CaptureImagePage = () => {
  const dispatch = useDispatch();
  const isImageProcessed = useSelector((state) => state.image.isImageProcessed);
  const loading = useSelector((state) => state.image.loading);
  console.log("isImageProcessed", isImageProcessed);
  useEffect(() => {
    dispatch(postImage());
  }, []);

  const resetRedux = () => {
    dispatch(reset());
  };
  return (
    <>
      {loading && <p> loading</p>}
      <p>Welcome to QureAI capture Image page</p>
      <button
        onClick={() => {
          resetRedux();
        }}
      >
        Reset
      </button>
    </>
  );
};

export default CaptureImagePage;
