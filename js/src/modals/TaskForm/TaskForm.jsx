import React, { useEffect } from "react";
import styles from "./TaskForm.scss";
import MainModal from "./../../components/Modal/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import config from "./../../config";

const TaskForm = ({
  show,
  statuses,
  data = undefined,
  onSubmit = undefined,
  onClose = undefined,
}) => {
  const defaultFormValues = {
    task_name: "",
    task_description: "",
    status_id: "",
  };

  const handleClose = () => {
    reset(defaultFormValues);
    if (onClose) {
      onClose();
    }
  };

  const handleSave = async (values) => {
    try {
      const response = data?.id
        ? await axios.patch(`${config.apiUrl}/api/task/${data.id}`, values)
        : await axios.post(`${config.apiUrl}/api/task`, values);

      if (onSubmit) {
        onSubmit(response.data, data);
      }

      handleClose();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {...defaultFormValues},
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data])

  return (
    <MainModal
      show={show}
      title={`${data ? "Edit" : "Add"} Task`}
      onSubmit={handleSubmit(handleSave)}
      onClose={handleClose}
    >
      <div className={styles.form}>
        <div className={styles.formField}>
          <div className={styles.formFieldLabel}>Subject:</div>
          <div className={styles.formFieldInput}>
            <input
              {...register("task_name", { required: "Name/Title is required" })}
            />
          </div>
        </div>
        <div className={styles.formField}>
          <div className={styles.formFieldLabel}>Description:</div>
          <div className={styles.formFieldInput}>
            <textarea
              {...register("task_description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters long",
                },
              })}
              rows="4"
              cols="50"
            ></textarea>
          </div>
        </div>
        <div className={styles.formField}>
          <div className={styles.formFieldLabel}>Status</div>
          <select
            {...register("status_id", { required: "Status is required" })}
          >
            <option value="">Select an option</option>
            {statuses.map((status, index) => (
              <option key={index} value={status.id}>
                {status.status_name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </MainModal>
  );
};

export default TaskForm;
