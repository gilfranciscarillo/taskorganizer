import React from "react";
import Modal from "react-modal";
import styles from "./Modal.scss";
import classNames from "classnames";

Modal.setAppElement("#root");

const MainModal = ({
  show,
  title = "",
  children,
  onSubmit = () => {},
  onClose = () => {},
}) => {
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      width: "800px",
      margin: "auto",
    },
  };

  return (
    <>
      <Modal
        isOpen={show}
        style={modalStyles}
        onAfterOpen={() => {}}
        onRequestClose={onClose}
      >
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <h2>{title}</h2>
          </div>
          <div className={styles.modalContent}>{children}</div>
          <div className={styles.modalFooter}>
            <button
              className={classNames(
                styles.modalMainButtons,
                styles.buttonSecondary
              )}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={classNames(
                styles.modalMainButtons,
                styles.buttonPrimary
              )}
              onClick={onSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MainModal;
