import { Routes, Route } from "react-router-dom";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Dashboard from "./views/Dashboard/Dashboard";
import Protected from "./components/Protected/Protected";
import Profile from "./views/Profile/Profile";
import Accounts from "./views/Accounts/Accounts";
import CreateAccount from "./views/CreateAccount/CreateAccount";
import Transactions from "./views/Transactions/Transactions";
import NotFound from "./views/NotFound/NotFound";

function ProvidedApp() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
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
      <Route
        path="/profile"
        element={
          <Protected>
            <Profile />
          </Protected>
        }
      />
      <Route
        path="/accounts"
        element={
          <Protected>
            <Accounts />
          </Protected>
        }
      />
      <Route
        path="/create-account"
        element={
          <Protected>
            <CreateAccount />
          </Protected>
        }
      />
      <Route
        path="/transactions"
        element={
          <Protected>
            <Transactions />
          </Protected>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ProvidedApp;
