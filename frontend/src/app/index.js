import "antd/dist/antd.css";
import { Provider } from "react-redux";
import AppHeader from "../components/AppHeader";
import store from "../store";
import BaseRoutes from "./routes";
const App = () => {
  return (
    <Provider store={store}>
      <AppHeader />
      <BaseRoutes />
    </Provider>
  );
};

export default App;
