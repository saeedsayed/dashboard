// hooks
import { useState } from "react";
import { useContextProvider } from "../../context/ContextProvider";
// components
import Input from "../Input";
// icons
import { IoMdAdd, IoMdClose } from "react-icons/io";
import CenterModal from "./CenterModal";
import Button from "../Button";

const CalendarFormModal = () => {
  const { modalIsOpen, setModalIsOpen } = useContextProvider();
  const [formInputValue, setFormInputValue] = useState("");
  const [formErr, setFormErr] = useState(false);

  const closeModal = (_) => {
    setModalIsOpen((p) => {
      return { ...p, calendar: { isOpen: false, selectInfo: "" } };
    });
    setFormErr(false);
  };

  const handleRemoveEvent = (_) => {
    const { selectInfo } = modalIsOpen.calendar;
    selectInfo.event.remove();
    closeModal();
  };

  const handleSubmitCalendarForm = (e) => {
    e.preventDefault();
    if (formInputValue.length < 6) {
      setFormErr("Event must be at least 6 characters long");
      return;
    }
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
    <CenterModal isOpen={modalIsOpen.calendar.isOpen} handleClose={closeModal}>
      {modalIsOpen.calendar.mode == "addEvent" ? (
        <form onSubmit={handleSubmitCalendarForm}>
          <div className="flex justify-end">
            <Button
             variant={'danger'}
              onClick={closeModal}
              title="close"
              type="button"
            >
              <IoMdClose />
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold text-primary-text">Event Name</h1>
          </div>
          <Input
            onChange={(e) => {
              setFormInputValue(e.target.value);
              e.target.value.length > 5 && setFormErr(false);
            }}
            autoFocus
            value={formInputValue}
            err={formErr}
            errMes={formErr}
          />
          <div className="flex justify-center items-center">
            <Button
              variant={"success"}
              className={"px-8"}
              title="add"
            >
              <IoMdAdd />
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <h3 className="text-center font-bold text-3xl mb-4 text-primary-text">
            Remove event
          </h3>
          <div className="flex justify-evenly items-center">
            <Button
             variant={"danger"}
              onClick={handleRemoveEvent}
            >
              delete event
            </Button>
            <Button
              variant={"secondary"}
              onClick={closeModal}
            >
              No Thanks
            </Button>
          </div>
        </div>
      )}
    </CenterModal>
  );
};

export default CalendarFormModal;
