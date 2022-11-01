import {
  Landing,
  Dashboard,
  AuthenticatePage,
  Error,
  ProtectedRoute,
} from "./pages";

import {
  SharedLayout,
  CreatePost,
  MyPosts,
  Profile,
  ProfileInfo,
} from "./pages/dashboard/index";
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/myPosts" element={<MyPosts />} />
          <Route path="/profiles/profileInfo/:id" element={<ProfileInfo />} />
        </Route>
        <Route path="/authentication" element={<AuthenticatePage />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
