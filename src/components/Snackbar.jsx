// hooks
import { useEffect } from "react";
import { useContextProvider } from "../context/ContextProvider";
// icons
import { IoMdClose } from "react-icons/io";
// component
import { AnimatePresence, motion } from "framer-motion";

const Snackbar = () => {
  const { snackbar, setSnackbar } = useContextProvider();

  useEffect(
    //close snackbar 3 seconds after opening it
    (_) => {
      const closeAfter = snackbar?.closeAfter || 5000;
      let timeoutId;
      if (snackbar.isOpen) {
        timeoutId = setTimeout((_) => {
          setSnackbar((p) => ({ ...p, isOpen: false }));
        }, closeAfter);
      }
      return (_) => {
        clearTimeout(timeoutId);
      };
    },
    [snackbar]
  );
  return (
    <>
      <AnimatePresence>
        {snackbar.isOpen && (
          <motion.div
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className={`flex items-center absolute top-5 ${
              snackbar.type == "success"
                ? "bg-green-600"
                : snackbar.type == "warning"
                ? "bg-yellow-600"
                : "bg-red-600"
            } text-primary-text py-3 ps-4
        rounded-radius left-1/2 z-50 `}
          >
            <p>{snackbar.message}</p>
            <button
              className="text-primary-text px-2 text-lg"
              onClick={(_) => setSnackbar((p) => ({ ...p, isOpen: false }))}
            >
              <IoMdClose />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Snackbar;
