import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  Navigate,
} from "react-router-dom";

import Main from "./pages/Main/Main";

import ExpertAIAvatarPage from "./pages/ExpertAIAvatarPage/ExpertAIAvatarPage";
import ExpertDashboardPage from "./pages/ExpertDashboardPage/ExpertDashboardPage";
import ExpertSignUp from "./pages/ExpertSignup/ExpertSignup";
import Logout from "./Logout";
import { LoginProvider, useLogin } from "./LoginContext";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  const { isLoggedIn, accountType } = useLogin(); // Now using accountType

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/expert-login":
        title = "";
        metaDescription = "";
        break;
      case "/expertclient":
        title = "";
        metaDescription = "";
        break;
      case "/main":
        title = "";
        metaDescription = "";
        break;
      case "/admin-community-page":
        title = "";
        metaDescription = "";
        break;
      case "/course-page":
        title = "";
        metaDescription = "";
        break;
      case "/expert-ai-avatar-page":
        title = "";
        metaDescription = "";
        break;
      case "/expert-dashboard-page":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  // Custom function to check if the user is an expert

  return (
    <Routes>
      <Route path="/" element={<Main />} />

      <Route path="/client-signup" element={<ExpertSignUp />} />
      <Route path="/expert-signup" element={<ExpertSignUp />} />

      <Route path="/logout" element={<Logout />} />

      {/* Protected Routes */}
      <Route
        path="/client-dashboard-page"
        element={!isLoggedIn ? <Main /> : <Navigate to="/expert-signup" />}
      />
      <Route
        path="/expert-dashboard-page"
        element={!isLoggedIn ? <Main /> :<ExpertDashboardPage />}
      />

<Route
        path="/expert-ai-avatar-page"
        element={!isLoggedIn ? <Main /> :<ExpertAIAvatarPage />  }
      />

      {/* <Route
        path="/client-dashboard-page"
        element={<Navigate to="/expert-signup" />}
      />
      <Route path="/expert-dashboard-page" element={<ExpertDashboardPage />} />

      <Route path="/expert-ai-avatar-page" element={<ExpertAIAvatarPage />} /> */}
    </Routes>
  );
}

export default function WrappedApp() {
  return (
    <LoginProvider>
      <App />
    </LoginProvider>
  );
}
