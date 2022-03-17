import {
  CameraOutlined,
  LoadingOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Alert, Button, message, Result, Spin, Typography, Upload } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageRemoved, imageUploaded, postImage } from "./reducer";

const CaptureImagePage = () => {
  const dispatch = useDispatch();
  const { loading, isImageUploaded, isImageProcessed, fetchingError } =
    useSelector((state) => state.image);

  // stores the image uploaded
  const [fileList, setFileList] = useState([]);

  // allows only image files to be uploaded
  const handleBeforeUpload = (file) => {
    const isImage =
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg";
    console.log(file.type);
    if (!isImage)
      message.error(
        `${file.name} is not an Image. Please Upload an Image file`
      );
    return isImage || Upload.LIST_IGNORE;
  };

  // dispatches actions if image is uploaded or removed
  const handleImageUploadOrRemoval = (info) => {
    // retricts addition of 1 image only
    setFileList([...info.fileList.slice(-1)]);

    if (info.file.status === "done") dispatch(imageUploaded());
    if (info.file.status === "removed") dispatch(imageRemoved());
  };

  // https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it
  // bypass the inbuilt POST request action
  const handleCustomRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  // sends the image to server to be processed
  const handleProcessImage = () => {
    console.log("PROCESSING IMAGE");
    dispatch(postImage());
  };
  return (
    <>
      <Typography.Title>Welcome to qure.ai Image Predictor</Typography.Title>
      <Typography.Paragraph>
        Let's process an image, shall we ?
      </Typography.Paragraph>

      <Button icon={<CameraOutlined />}>Take a Photo From my Camera</Button>
      {
        <Upload
          fileList={fileList}
          beforeUpload={handleBeforeUpload}
          onChange={handleImageUploadOrRemoval}
          customRequest={handleCustomRequest}
          listType="picture-card"
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      }
      <br />

      {loading && (
        <Spin>
          <Alert
            message="Processing Image"
            description="Please wait while our engine process the image for you"
          />
        </Spin>
      )}

      <Button
        disabled={!isImageUploaded}
        icon={loading ? <LoadingOutlined /> : <SyncOutlined />}
        onClick={handleProcessImage}
      >
        {" "}
        Process my Image
      </Button>

      {isImageProcessed && (
        <Result status="success" title="We've processed your image !" />
      )}

      {fetchingError && (
        <Result
          status={500}
          title="Sorry, Something went wrong !!"
          subTitle="Please try again after sometime"
        />
      )}
    </>
  );
};

export default CaptureImagePage;
