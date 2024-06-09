// hooks
import { useState } from "react";
import { useContextProvider } from "../context/ContextProvider";
// components
import { CardBody, PageHeader, TodoItem } from "../components";
import { AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
// icons
import { IoMdAdd } from "react-icons/io";
import ghost from "../assets/animations/ghost.json";
import { TodoAddModal } from "../components/modals";
import { Button } from "../components";

const Todo = () => {
  const { setModalIsOpen, todoData, setTodoData } = useContextProvider();
  const [filterTodoKey, setFilterTodoKey] = useState("in progress");

  const handleDeleteTask = (Id) => {
    setTodoData(todoData.filter((task) => task.Id !== Id));
  };
  const handleCompleteTask = (Id) => {
    setTodoData(
      todoData.map((task) => {
        if (task.Id === Id) {
          task.isDone = !task.isDone;
        }
        return task;
      })
    );
  };
  const handleImportantTask = (Id) => {
    setTodoData(
      todoData.map((task) => {
        if (task.Id === Id) {
          task.isImportant = !task.isImportant;
        }
        return task;
      })
    );
  };

  const handleSelectTodoType = (e) => {
    setFilterTodoKey(e.target.value);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader title={"TODO"} subTitle={"mange your task"} />
        <Button
          variant={"primary"}
          // className="flex items-center gap-1 hover:bg-primary text-white bg-secondary rounded-md px-3 py-2"
          onClick={(_) => setModalIsOpen((p) => ({ ...p, todo: true }))}
        >
          <IoMdAdd /> Add New Task
        </Button>
      </div>
      <div className="w-full gap-6 hidden md:flex">
        <TodoCard title={"in progress"}>
          {!todoData.filter((todo) => !todo.isDone).length && (
            <Lottie animationData={ghost} className="h-2/3" />
          )}
          {todoData.map(
            (todo) =>
              !todo.isDone && (
                <TodoItem
                  key={todo.Id}
                  task={todo}
                  handleCompleteTask={handleCompleteTask}
                  handleDeleteTask={handleDeleteTask}
                  handleImportantTask={handleImportantTask}
                />
              )
          )}
        </TodoCard>
        <TodoCard title={"important"}>
          {!todoData.filter((todo) => !todo.isDone && todo.isImportant)
            .length && <Lottie animationData={ghost} className="h-2/3" />}
          {todoData.map(
            (todo) =>
              !!todo.isImportant &&
              !todo.isDone && (
                <TodoItem
                  key={todo.Id}
                  task={todo}
                  handleCompleteTask={handleCompleteTask}
                  handleDeleteTask={handleDeleteTask}
                  handleImportantTask={handleImportantTask}
                />
              )
          )}
        </TodoCard>
        <TodoCard title={"completed"}>
          {!todoData.filter((todo) => todo.isDone).length && (
            <Lottie animationData={ghost} className="h-2/3" />
          )}
          {todoData.map(
            (todo) =>
              !!todo.isDone && (
                <TodoItem
                  key={todo.Id}
                  task={todo}
                  handleCompleteTask={handleCompleteTask}
                  handleDeleteTask={handleDeleteTask}
                  handleImportantTask={handleImportantTask}
                />
              )
          )}
        </TodoCard>
      </div>
      {/* small devices */}
      <div className="md:hidden">
        <TodoCard
          title={
            <select
              className="bg-section-bg focus:outline-none cursor-pointer"
              onChange={handleSelectTodoType}
              value={filterTodoKey}
            >
              <option>in progress</option>
              <option>important</option>
              <option>completed</option>
            </select>
          }
        >
          {!todoData.filter(
            (todo) =>
              (filterTodoKey == "in progress" && !todo.isDone) ||
              (filterTodoKey == "important" &&
                !!todo.isImportant &&
                !todo.isDone) ||
              (filterTodoKey == "completed" && !!todo.isDone)
          ).length && <Lottie animationData={ghost} className="h-full" />}
          {todoData
            .filter(
              (todo) =>
                (filterTodoKey == "in progress" && !todo.isDone) ||
                (filterTodoKey == "important" &&
                  !!todo.isImportant &&
                  !todo.isDone) ||
                (filterTodoKey == "completed" && !!todo.isDone)
            )
            .map((todo) => (
              <TodoItem
                key={todo.Id}
                task={todo}
                handleCompleteTask={handleCompleteTask}
                handleDeleteTask={handleDeleteTask}
                handleImportantTask={handleImportantTask}
              />
            ))}
        </TodoCard>
      </div>
      <TodoAddModal />
    </>
  );
};

export default Todo;

const TodoCard = ({ children, title }) => (
  <div className="flex-1">
    <CardBody>
      <h2 className="text-center text-3xl font-bold text-primary mb-3 w-full truncate">
        {title}
      </h2>
      <div className="h-[calc(100vh-298px)]  overflow-x-hidden overflow-auto -me-5 pe-5">
        <AnimatePresence>{children}</AnimatePresence>
      </div>
    </CardBody>
  </div>
);
