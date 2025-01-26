import React from "react";
import styles from "./StatusColumn.scss";
import Card from "../Card/Card";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const StatusColumn = ({
  statusId,
  statusName = "Others",
  cards = [],
  onEditCard = () => {},
  onRemoveCard = () => {},
}) => {
  return (
    <Droppable droppableId={statusId.toString()} tyoe="card">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={styles.statusColumnContainer}
        >
          <h4>{statusName}</h4>
          {cards.map((card, index) => (
            <Draggable
              key={card.id}
              draggableId={card.id.toString()}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Card
                    key={index}
                    data={card}
                    onEditClick={() => onEditCard(card)}
                    onRemoveClick={() => onRemoveCard(card)}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default StatusColumn;
