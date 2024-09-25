import { Routes } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

function ProvidedApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function App() {
  return (
    <Routes>
    </Routes>
  );
}

export default ProvidedApp;
