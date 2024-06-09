// components
import { Route, Routes } from "react-router-dom";
import { Snackbar, FullScreenLoading } from "./components/index";
// pages
import {
  Area,
  Bar,
  Calendar,
  Customers,
  Ecommerce,
  TextEditor,
  Employees,
  Todo,
  Line,
  Orders,
  Pie,
  Login,
  Register,
  ResetPassword,
  UserProfile,
  Settings,
  SecuritySetting,
} from "./pages/index";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";
import { useAuth } from "./context/AuthContext";
import ProfileSetting from "./pages/settings/ProfileSetting";

const App = () => {
  const { authLoading } = useAuth();
  return (
    <>
      {authLoading && <FullScreenLoading />}
      <div className="flex relative h-screen w-screen overflow-hidden bg-main-bg text-primary-text">
        <Routes>
          {/* Login&Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {/* userProfile */}
              <Route path="/user-profile" element={<UserProfile />} />
              {/* settings */}
              <Route path="/settings" element={<Settings />}>
                <Route index element={<ProfileSetting />} />
                <Route path="security" element={<SecuritySetting />} />
              </Route>
              {/* Dashboard */}
              <Route path="/" element={<Ecommerce />} />
              <Route path="/ecommerce" element={<Ecommerce />} />
              {/* pages */}
              <Route path="/orders" element={<Orders />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/customers" element={<Customers />} />
              {/* app */}
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/editor" element={<TextEditor />} />
              {/* charts */}
              <Route path="/line" element={<Line />} />
              <Route path="/area" element={<Area />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
            </Route>
          </Route>
        </Routes>
        {/* snackbar */}
        <Snackbar />
      </div>
    </>
  );
};

export default App;
