import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";

const SideModal = ({ isOpen, handleClose, dir, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={handleClose}
          style={{
            content: {
              position:'absolute',
              top: "0",
              left: dir == "left" ? "0" : "unset",
              right: dir == "right" ? "0" : "unset",
            },
            overlay: {
              backgroundColor: "transparent",
              zIndex: 1000,
            },
          }}
          className={"w-fit shadow"}
        >
          <motion.div
            initial={{
              opacity: 0,
              x: dir == "left" ? -100 : 100,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              x: dir == "left" ? -100 : 100,
              transition: {
                duration: 0.3,
              },
            }}
          >
            {children}
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default SideModal;
