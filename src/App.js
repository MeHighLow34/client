import {
  Landing,
  Dashboard,
  AuthenticatePage,
  Error,
  ProtectedRoute,
} from "./pages";

import { SharedLayout, CreatePost, MyPosts } from "./pages/dashboard/index";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="/profile"
            element={<h1>Adjusting Profile Settings</h1>}
          />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/myPosts" element={<MyPosts />} />
        </Route>
        <Route path="/authentication" element={<AuthenticatePage />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
