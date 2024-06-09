// components
import { motion } from "framer-motion";
// icons
import { MdOutlineDoneOutline } from "react-icons/md";
import { FaCheck, FaRegStar, FaRegTrashAlt, FaStar } from "react-icons/fa";

const TodoItem = ({
  task,
  handleCompleteTask,
  handleDeleteTask,
  handleImportantTask,
}) => {
  const { Id, Title, isDone, isImportant } = task;
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      className="flex justify-between border-secondary p-2 rounded-lg border mb-2"
    >
      <div>{Title}</div>
      <div className="flex gap-3">
        <button
          onClick={(_) => handleCompleteTask(Id)}
        >
          {isDone ? <FaCheck className="text-green-400"/> : <MdOutlineDoneOutline className="text-secondary"/>}
        </button>
        {!isDone && (
          <button
            className="text-orange-500"
            onClick={(_) => handleImportantTask(Id)}
          >
            {isImportant ? <FaStar /> : <FaRegStar />}
          </button>
        )}
        <button className="text-red-600" onClick={(_) => handleDeleteTask(Id)}>
          <FaRegTrashAlt />
        </button>
      </div>
    </motion.div>
  );
};

export default TodoItem;
