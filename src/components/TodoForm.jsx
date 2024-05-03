// hooks
import { useState } from "react";
import { useContextProvider } from "../context/ContextProvider";
// components
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
// icons
import { IoMdClose, IoMdAdd } from "react-icons/io";

// styles for modal component
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "visible",
    backgroundColor: "transparent",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

const TodoForm = () => {
  const { modalIsOpen, setModalIsOpen, setTodoData, setSnackbar } =
    useContextProvider();
  const [formInputValue, setFormInputValue] = useState("");
  const closeModal = (_) => {
    setModalIsOpen((p) => ({ ...p, todo: false }));
  };

  const handleSubmitTodoForm = (e) => {
    e.preventDefault();
    setTodoData((p) => {
      return [
        ...p,
        {
          Id: crypto.randomUUID(),
          Title: formInputValue,
          isDone: false,
          isImportant: false,
        },
      ];
    });
    setFormInputValue("");
    closeModal();
    setSnackbar({
      isOpen: true,
      message: "The task has been added to 'In Progress' ✔",
      type: "success",
    });
  };

  return (
    <>
      <AnimatePresence>
        {!!modalIsOpen.todo && (
          <Modal
            isOpen={modalIsOpen.todo}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <motion.form
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ x: -500, opacity: 0, transition: { duration: 0.3 } }}
              onSubmit={handleSubmitTodoForm}
              className="bg-main-bg p-6 w-[400px] rounded-radius"
            >
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded-md"
                  onClick={closeModal}
                  title="close"
                  type="button"
                >
                  <IoMdClose />
                </button>
              </div>
              <div className="flex justify-center items-center">
                <h1 className="text-2xl font-bold text-primary-text">
                  Task Name
                </h1>
              </div>
              <div className="flex justify-center items-center my-4">
                <input
                  type="text"
                  autoFocus
                  className="border-2 bg-section-bg border-secondary focus:outline-none text-primary-text rounded-md py-1 px-2 w-full"
                  required
                  onChange={(e) => setFormInputValue(e.target.value)}
                  value={formInputValue}
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="bg-secondary text-primary-text py-1 px-2 rounded-md"
                  title="add"
                >
                  <IoMdAdd />
                </button>
              </div>
            </motion.form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default TodoForm;
