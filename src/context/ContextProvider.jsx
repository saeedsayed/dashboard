import { createContext, useContext, useEffect, useState } from "react";

const context = createContext();

const initialNavBox = {
  search: false,
  chat: false,
  notifications: false,
  cart: false,
  profile: false,
};

const ContextProvider = ({ children }) => {
  const [darkThem, setDarkThem] = useState(false);
  const [openSidebar, setOpenSideBar] = useState(false);
  const [openNavBox, setOpenNavBox] = useState(initialNavBox);
  const [textEditorContent, setTextEditorContent] = useState('')

  const handelSidebar = (_) => {
    setOpenSideBar(!openSidebar);
  };
  const handelNavBox = (boxName) => {
    setOpenNavBox({ ...initialNavBox, [boxName]: !openNavBox[boxName] });
  };

  const handelThem = () => {
    setDarkThem(!darkThem);
    localStorage.setItem("darkThem", !darkThem);
  };

  useEffect(() => {
    darkThem
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkThem]);

  useEffect((_) => {
    localStorage.getItem("darkThem") &&
      setDarkThem(JSON.parse(localStorage.getItem("darkThem")));
  }, []);

  return (
    <context.Provider
      value={{
        darkThem,
        handelThem,
        openSidebar,
        handelSidebar,
        openNavBox,
        handelNavBox,
        textEditorContent,
        setTextEditorContent,
      }}
    >
      {children}
    </context.Provider>
  );
};

export { ContextProvider };

export const useContextProvider = (_) => useContext(context);
