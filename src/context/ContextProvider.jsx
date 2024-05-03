// hooks
import { createContext, useContext, useEffect, useState } from "react";
// data
import { EditorData, TODO_DATA } from "../data/dummy";

const context = createContext();

const initialNavBox = {
  search: false,
  chat: false,
  notifications: false,
  cart: false,
  profile: false,
};

const initialModal = {
  todo: false,
  calendar: {
    isOpen: false,
    selectInfo: "",
    mode: "",
  },
};

const ContextProvider = ({ children }) => {
  const [darkThem, setDarkThem] = useState(false);
  const [openSidebar, setOpenSideBar] = useState(false);
  const [openNavBox, setOpenNavBox] = useState(initialNavBox);
  const [modalIsOpen, setModalIsOpen] = useState(initialModal);
  const [textEditorContent, setTextEditorContent] = useState(EditorData);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [todoData, setTodoData] = useState(TODO_DATA);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handelSidebar = (_) => {
    setOpenSideBar(!openSidebar);
  };

  const handelNavBox = (boxName) => {
    setOpenNavBox({ ...initialNavBox, [boxName]: !openNavBox[boxName] });
  };

  // dark&light them func
  const handelThem = () => {
    setDarkThem(!darkThem);
    localStorage.setItem("darkThem", !darkThem);
  };

  useEffect(() => {
    darkThem
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkThem]);

  // fullscreen func
  const handleFullscreen = (_) => {
    setIsFullScreen((p) => !p);
  };
  useEffect(
    (_) => {
      const myDocument = document.documentElement;
      const requestFullScreen =
        myDocument.requestFullScreen ||
        myDocument.webkitRequestFullScreen ||
        myDocument.mozRequestFullScreen ||
        myDocument.msRequestFullScreen;
      const exitFullscreen =
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;
      if (isFullScreen && requestFullScreen) {
        requestFullScreen.call(myDocument);
      } else if (document.fullscreenElement) {
        exitFullscreen.call(document);
      }
    },
    [isFullScreen]
  );

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
        isFullScreen,
        handleFullscreen,
        modalIsOpen,
        setModalIsOpen,
        todoData,
        setTodoData,
        snackbar,
        setSnackbar,
      }}
    >
      {children}
    </context.Provider>
  );
};

export { ContextProvider };

export const useContextProvider = (_) => useContext(context); //costume context hook
