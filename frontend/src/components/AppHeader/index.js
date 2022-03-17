import { Layout } from "antd";
import logo from "../../assets/logo.svg";
const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header
      style={{
        backgroundColor: "#0d1d2a",
      }}
    >
      <div className="logo">
        <img src={logo} />
      </div>
    </Header>
  );
};

export default AppHeader;
