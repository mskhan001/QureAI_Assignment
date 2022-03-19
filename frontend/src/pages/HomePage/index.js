import { Typography, Button } from "antd";
import {
  CameraOutlined,
  UploadOutlined,
  SyncOutlined,
} from "@ant-design/icons";
const HomePage = () => {
  return (
    <>
      <Typography.Title>Welcome to qure.ai Image Predictor</Typography.Title>
      <Typography.Paragraph>
        Let's process an image, shall we ?
      </Typography.Paragraph>

      <Button icon={<CameraOutlined />}>Take a Photo From my Camera</Button>
      <Button icon={<UploadOutlined />}> Upload Image </Button>
      <Button icon={<SyncOutlined />}> Process my Image</Button>
    </>
  );
};

export default HomePage;
