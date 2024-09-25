import { Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";

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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default ProvidedApp;
