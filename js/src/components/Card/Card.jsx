import React from "react";
import styles from "./Card.scss";
import { MdDeleteForever, MdOutlineModeEditOutline } from "react-icons/md";
import classNames from "classnames";
import { formatDate } from "./../../global";

const Card = ({ data, onEditClick = undefined, onRemoveClick = undefined }) => {
  return (
    <div className={styles.cardContainer}>
      <h4>{data.task_name}</h4>
      <div className={styles.description}>{data.task_description}</div>
      <div className={styles.dateValues}>
        <div>
          <em>Created at {formatDate(data.created_at.date)}</em>
        </div>
        <div>
          <em>last updated at {formatDate(data.updated_at.date)}</em>
        </div>
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.actionButton} onClick={onEditClick}>
          <MdOutlineModeEditOutline
            className={classNames(styles.actionButtonIcon, styles.edit)}
          />
        </button>
        <button className={styles.actionButton} onClick={onRemoveClick}>
          <MdDeleteForever
            className={classNames(styles.actionButtonIcon, styles.delete)}
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
