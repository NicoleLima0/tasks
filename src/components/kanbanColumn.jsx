import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const ItemType = "TASK";

function KanbanColumn({
  title,
  status,
  tasks,
  onEditTask,
  onDeleteTask,
  onDropTask,
}) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemType,

    drop: (item) => {
      onDropTask(item.task, status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={dropRef}
      className="kanban-column"
      style={{ backgroundColor: isOver ? "#f0f0f0" : "#fff" }}
    >
      <h3>{title}</h3>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default KanbanColumn;
