import { useDrag } from "react-dnd";
import { PencilIcon, TrashIcon } from "lucide-react";

const ItemType = "TASK";

function TaskCard({ task, onEdit, onDelete }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemType,
    item: { task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className="task-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="task-card-header">
        <h4>{task.taskName}</h4>
        <div className="task-card-actions">
          <button onClick={() => onEdit(task)} title="Editar">
            <PencilIcon size={15} />
          </button>
          <button onClick={() => onDelete(task)} title="Excluir">
            <TrashIcon size={15} />
          </button>
        </div>
      </div>
      <p>{task.description}</p>
      <span className={`priority-${task.priority?.toLowerCase()}`}>
        {task.priority}
      </span>
    </div>
  );
}

export default TaskCard;