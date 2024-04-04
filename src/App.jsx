import React from "react";
import { Route, Routes } from "react-router-dom";
// components
import { Sidebar, Navbar } from "./components/index";
// pages
import {
  Area,
  Bar,
  Calendar,
  ColorMapping,
  ColorPicker,
  Customers,
  Ecommerce,
  TextEditor,
  Employees,
  Financial,
  Todo,
  Line,
  Orders,
  Pie,
  Pyramid,
  Stacked,
} from "./pages/index";

const App = () => {
  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden bg-main-bg text-primary-text">
        <Sidebar />
        <div className="flex-1 p-4 w-96 flex flex-col">
          <Navbar />
          {/* <div className="overflow-auto h-[calc(100vh-48px)]"> */}
          <Routes>
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
            <Route path="/color-picker" element={<ColorPicker />} />
            {/* charts */}
            <Route path="/line" element={<Line />} />
            <Route path="/area" element={<Area />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/color-mapping" element={<ColorMapping />} />
            <Route path="/pyramid" element={<Pyramid />} />
            <Route path="/stacked" element={<Stacked />} />
          </Routes>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default App;
