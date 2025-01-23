import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard, UserAuth } from "./pages";
import { PATH } from "./consts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.INTERFACE} element={<Navigate to={PATH.SIGNIN} />} />
        <Route path={PATH.DASHBOARD} element={<Dashboard />} />
        <Route path={PATH.SIGNIN} element={<UserAuth isSignIn={true} />} />
        <Route path={PATH.SIGNUP} element={<UserAuth isSignIn={false} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
