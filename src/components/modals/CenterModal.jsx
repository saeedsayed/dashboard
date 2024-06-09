// components
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    padding: '0',
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "visible",
    backgroundColor: "transparent",
    border: "none",
    maxWidth:'100%'
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    maxWidth: "100%",
    zIndex: 49,
  },
};

const CenterModal = ({ children, isOpen, handleClose }) => {
  return (
    <>
      <AnimatePresence>
        {!!isOpen && (
          <Modal
            isOpen={isOpen}
            style={customStyles}
            onRequestClose={handleClose}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ x: -500, opacity: 0, transition: { duration: 0.3 } }}
              className="bg-main-bg p-6 w-[400px] max-w-full rounded-radius"
            >
              {children}
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default CenterModal;
