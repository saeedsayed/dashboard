// hooks
import { useState } from "react";
import { useContextProvider } from "../context/ContextProvider";
// components
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
// icons
import { IoMdAdd, IoMdClose } from "react-icons/io";

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

const CalendarForm = () => {
  const { modalIsOpen, setModalIsOpen, setSnackbar } = useContextProvider();
  const [formInputValue, setFormInputValue] = useState("");

  const closeModal = (_) => {
    setModalIsOpen((p) => {
      return { ...p, calendar: { isOpen: false, selectInfo: "" } };
    });
  };

  const handleRemoveEvent = (_) => {
    const { selectInfo } = modalIsOpen.calendar;
    selectInfo.event.remove();
    closeModal();
  };

  const handleSubmitCalendarForm = (e) => {
    e.preventDefault();
    const { selectInfo } = modalIsOpen.calendar;
    let calendarApi = selectInfo.view.calendar;
    calendarApi.addEvent({
      id: crypto.randomUUID(),
      title: formInputValue,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
    setFormInputValue("");
    closeModal();
  };

  return (
    <>
      <AnimatePresence>
        {!!modalIsOpen.calendar.isOpen && (
          <Modal
            isOpen={modalIsOpen.calendar.isOpen}
            style={customStyles}
            onRequestClose={closeModal}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ x: -500, opacity: 0, transition: { duration: 0.3 } }}
              className="bg-main-bg p-6 w-[400px] rounded-radius"
            >
              {modalIsOpen.calendar.mode == "addEvent" ? (
                <form onSubmit={handleSubmitCalendarForm}>
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
                      Event Name
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
                </form>
              ) : (
                <div>
                  <h3 className="text-center font-bold text-3xl mb-4 text-primary-text">
                    Remove event
                  </h3>
                  <div className="flex justify-evenly items-center">
                    <button
                      className="bg-red-500 text-primary-text py-1 px-2 rounded-md"
                      onClick={handleRemoveEvent}
                    >
                      delete event
                    </button>
                    <button
                      className="bg-secondary text-primary-text py-1 px-2 rounded-md"
                      onClick={closeModal}
                    >
                      No Thanks
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default CalendarForm;
