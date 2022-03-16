import BaseRoutes from "./routes";
import { Provider } from "react-redux";
import store from "../store";
const App = () => {
  return (
    <>
      <p>Base page</p>
      <Provider store={store}>
        <BaseRoutes />
      </Provider>
    </>
  );
};

export default App;
