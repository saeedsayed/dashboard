// hooks
import { useState } from "react";
import { useContextProvider } from "../../context/ContextProvider";
// icons
import { IoMdClose, IoMdAdd } from "react-icons/io";
import CenterModal from "./CenterModal";
import { Button, Input } from "../index";

// styles for modal component

const TodoAddModal = () => {
  const { modalIsOpen, setModalIsOpen, setTodoData, setSnackbar } =
    useContextProvider();
  const [formInputValue, setFormInputValue] = useState("");
  const [formErr, setFormErr] = useState(false);
  const closeModal = (_) => {
    setModalIsOpen((p) => ({ ...p, todo: false }));
    setFormErr(false);
  };

  const handleSubmitTodoForm = (e) => {
    e.preventDefault();
    if (formInputValue.length < 6) {
      setFormErr("Task name must be at lest 6 character long");
      return;
    }
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
    <CenterModal isOpen={modalIsOpen.todo} handleClose={closeModal}>
      <div className="flex justify-end">
        <Button
          variant={"danger"}
          onClick={closeModal}
          title="close"
          type="button"
        >
          <IoMdClose />
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold text-primary-text">Task Name</h1>
      </div>
      <form onSubmit={handleSubmitTodoForm}>
        <Input
          onChange={(e) => {
            setFormInputValue(e.target.value);
            e.target.value.length > 5 && setFormErr(false);
          }}
          autoFocus
          err={formErr}
          errMes={formErr}
          value={formInputValue}
        />
        <div className="flex justify-center items-center">
          <Button variant={"success"} className="px-8" title="add">
            <IoMdAdd />
          </Button>
        </div>
      </form>
    </CenterModal>
  );
};

export default TodoAddModal;
