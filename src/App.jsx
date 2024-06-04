import { Route, Routes } from "react-router-dom";
// components
import {
  Sidebar,
  Navbar,
  TodoForm,
  Snackbar,
  CalendarForm,
} from "./components/index";
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
} from "./pages/index";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";

const App = () => {
  return (
    <>
      <div className="flex relative h-screen w-screen overflow-hidden bg-main-bg text-primary-text">
        {/* <Sidebar />
        <div className="flex-1 p-4 w-96 flex flex-col">
          <Navbar />
          <div className="overflow-auto h-[calc(100vh-48px)] -me-4 pr-4"> */}
        <Routes>
          {/* Login&Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
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
        {/* </div>
        </div> */}
        {/* todo form modal */}
        <TodoForm />
        {/* calendar form modal */}
        <CalendarForm />
        {/* snackbar */}
        <Snackbar />
      </div>
    </>
  );
};

export default App;
