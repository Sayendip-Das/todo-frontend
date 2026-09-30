import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import TodoPage from "./pages/TodoPage";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import Loader from "./components/Loader";
import { refreshAccessToken } from "./services/authApi";
import { useEffect, useRef, useState } from "react";
import { login, logout } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const hasCheckedAuth = useRef(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/todos" || isAuthenticated) {
      return;
    }

    if (hasCheckedAuth.current) return;

    hasCheckedAuth.current = true;

    const restoreAuthentication = async () => {
      try {
        const responseData = await refreshAccessToken();

        dispatch(
          login({
            accessToken: responseData.access_token,
          }),
        );
      } catch {
        dispatch(logout());
      } finally {
        setIsCheckingAuth(false);
      }
    };

    restoreAuthentication();
  }, [dispatch, location.pathname, isAuthenticated]);

  if (location.pathname === "/todos" && !isAuthenticated && isCheckingAuth) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route
        path="/todos"
        element={
          isAuthenticated ? <TodoPage /> : <Navigate to="/signin" replace />
        }
      />
      <Route path="/" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
};

export default App;
