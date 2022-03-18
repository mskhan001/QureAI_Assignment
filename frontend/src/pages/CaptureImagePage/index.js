import {
  CameraOutlined,
  LoadingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Divider,
  Result,
  Row,
  Spin,
  Table,
  Typography,
} from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageUploaded, postImage, reset } from "./reducer";

const CaptureImagePage = () => {
  const dispatch = useDispatch();
  const {
    loading,
    isImageUploaded,
    isImageProcessed,
    fetchingError,
    imageResults,
  } = useSelector((state) => state.image);

  // stores the image uploaded
  const [fileList, setFileList] = useState({});

  // sends the image to server to be processed
  const handleProcessImage = () => {
    dispatch(postImage(fileList));
  };

  const handleInputChange = (event) => {
    setFileList(event.target.files[0]);
    dispatch(imageUploaded());
  };

  // columns for the Result Table
  const columns = [
    {
      title: "Prediction",
      dataIndex: "prediction",
      key: "prediction",
    },
    {
      title: "Probability (%)",
      dataIndex: "probability",
      key: "probability",
    },
  ];

  return (
    <>
      <Row align="middle" justify="space-around">
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
          <br />
          <div style={{ marginLeft: 50 }}>
            <input
              type="file"
              name="upload_file"
              onChange={handleInputChange}
              accept="image/*"
              align="middle"
            />
            <br />
          </div>

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
          <Result
            status="success"
            title="We've processed your image!"
            subTitle="Results"
            extra={
              <Table
                dataSource={imageResults}
                columns={columns}
                pagination={false}
              />
            }
          />
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
