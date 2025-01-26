import React, { useState, useEffect } from "react";
import styles from "./Dashboard.scss";
import StatusColumn from "./../../components/StatusColumn/StatusColumn";
import config from "./../../config";
import TaskForm from "../../modals/TaskForm/TaskForm";
import classNames from "classnames";
import axios from "axios";
import { cloneDeep } from "lodash";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const Dashboard = () => {
  const [statusList, setStatusList] = useState(undefined);
  const [tasks, setTasks] = useState(undefined);
  const [edited, setEdited] = useState(undefined);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const fetchTaskAndStatuses = async () => {
    const [getAllStatus, getAllTasks] = await Promise.all([
      fetch(`${config.apiUrl}/api/taskstatus`),
      fetch(`${config.apiUrl}/api/task`),
    ]).catch((error) => {
      throw new Error("Error fetching task statuses");
    });

    const allStatus = await getAllStatus.json();
    const allTasks = await getAllTasks.json();
    const groupTasks = allStatus.map((status) => {
      return { id: status.id, tasks: [] };
    });

    groupTasks.map((group) => {
      group.tasks = allTasks.filter((task) => task.status_id === group.id);
    });

    setStatusList(allStatus);
    setTasks(groupTasks);
  };

  useEffect(() => {
    fetchTaskAndStatuses();
  }, []);

  const handleCloseTaskForm = () => {
    setTaskFormOpen(false);
    setEdited(undefined);
  };

  const handleUpdateTasksGroupAndReturn = (
    data,
    addOrEdit = true,
    returnGroup = true
  ) => {
    const statusId = data.status_id;
    const newTasks = cloneDeep(tasks);
    const tasksGroupIndex = newTasks.findIndex(
      (status) => status.id === statusId
    );
    let tasksGroup = newTasks[tasksGroupIndex].tasks;

    if (addOrEdit) {
      const itemIndex = tasksGroup.findIndex((task) => task.id === data.id);

      if (itemIndex !== -1) {
        tasksGroup[itemIndex] = data;
      } else {
        tasksGroup.push(data);
      }
    } else {
      //Only option is remove
      tasksGroup = tasksGroup.filter((task) => task.id !== data.id);
    }

    if (!returnGroup) {
      newTasks[tasksGroupIndex].tasks = tasksGroup;
      setTasks(newTasks);

      return;
    }

    return tasksGroup;
  };

  const handleUpdateTask = (newData, oldData) => {
    const newTasks = cloneDeep(tasks);
    const destIndex = newTasks.findIndex(
      (task) => task.id === newData.status_id
    );

    newTasks[destIndex].tasks = handleUpdateTasksGroupAndReturn(newData);

    if (oldData && newData.status_id !== oldData.status_id) {
      const srcIndex = newTasks.findIndex(
        (task) => task.id === oldData.status_id
      );

      newTasks[srcIndex].tasks = handleUpdateTasksGroupAndReturn(
        oldData,
        false
      );
    }

    setTasks(newTasks);
  };

  const handleDeleteTask = async (data) => {
    try {
      const response = await axios.delete(
        `${config.apiUrl}/api/task/${data.id}`
      );

      if (response?.data?.id) {
        handleUpdateTasksGroupAndReturn(data, false, false);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleEditTask = (data) => {
    setEdited(data);
    setTaskFormOpen(true);
  };

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    // If the card is dropped in the same place, do nothing
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const sourceColumnIndex = parseInt(source.droppableId, 10);
    const destinationColumnIndex = parseInt(destination.droppableId, 10);

    const newTasks = cloneDeep(tasks);

    const [movedCard] = newTasks[sourceColumnIndex].tasks.splice(
      source.index,
      1
    );
    movedCard.status_id = parseInt(destination.droppableId);
    newTasks[destinationColumnIndex].tasks.splice(
      destination.index,
      0,
      movedCard
    );

    setTasks(newTasks);

    const task = {
      id: movedCard.id,
      status_id: movedCard.status_id,
    };
    updateTaskOnMove(task);
  };

  const updateTaskOnMove = async (data) => {
    try {
      const response = await axios.patch(
        `${config.apiUrl}/api/task/${data.id}`,
        data
      );
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.tasksContainer}>
          <div className={styles.title}>
            Hi, Welcome to your tasks organizer
          </div>
          <div>
            <button
              className={classNames(
                styles.actionButtons,
                styles.buttonSecondary
              )}
              onClick={() => setTaskFormOpen(true)}
            >
              Add Task
            </button>
          </div>
          <Droppable
            droppableId="all-status-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className={styles.statusColumns}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {(tasks || []).map((taskGroup, index) => {
                  const [status] = statusList.filter(
                    (stat) => stat.id === taskGroup.id
                  );

                  return (
                    <StatusColumn
                      key={index}
                      statusId={status.id}
                      statusName={status.status_name}
                      cards={taskGroup.tasks}
                      onEditCard={handleEditTask}
                      onRemoveCard={handleDeleteTask}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <TaskForm
        show={taskFormOpen}
        statuses={statusList || []}
        data={edited}
        onSubmit={handleUpdateTask}
        onClose={handleCloseTaskForm}
      />
    </>
  );
};

export default Dashboard;
