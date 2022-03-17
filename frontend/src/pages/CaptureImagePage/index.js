import {
  CameraOutlined,
  LoadingOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Divider,
  message,
  Result,
  Row,
  Spin,
  Typography,
  Upload,
} from "antd";
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
      <Row align="middle" justify="space-around" style={{ marginTop: 60 }}>
        <Col align="space-around" style={{ margin: 20 }}>
          <Typography.Title align="center">Image Predictor</Typography.Title>
          <Divider orientation="right">qure.ai</Divider>
          <Typography.Paragraph>
            Let's process an image, shall we ?
          </Typography.Paragraph>
        </Col>
        <Col align="center" justify="space-around" style={{ margin: 20 }}>
          <Button icon={<CameraOutlined />} style={{ margin: 20 }}>
            Take a Photo From my Camera
          </Button>
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
          <br />

          <Button
            disabled={!isImageUploaded}
            icon={loading ? <LoadingOutlined /> : <SyncOutlined />}
            onClick={handleProcessImage}
            style={{ margin: 20 }}
          >
            {" "}
            Process my Image
          </Button>
        </Col>
      </Row>
      <Row align="middle" justify="space-around">
        {loading && (
          <Spin>
            <Alert
              message="Processing Image"
              description="Please wait while our engine process the image for you"
            />
          </Spin>
        )}

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
      </Row>
    </>
  );
};

export default CaptureImagePage;
