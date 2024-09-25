import { Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Dashboard from "./views/Dashboard/Dashboard";
import Protected from "./components/Protected/Protected";
import NotFound from "./views/NotFound/NotFound";

function ProvidedApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ProvidedApp;
