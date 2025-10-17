import { PencilIcon, TrashIcon } from "lucide-react";


function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="task-card">
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

function KanbanBoard({ tasks, onEditTask, onDeleteTask }) {
  const pendingTasks = tasks.filter((task) => task.status === "Pendente");
  const inProgressTasks = tasks.filter(
    (task) => task.status === "Em Andamento"
  );
  const doneTasks = tasks.filter((task) => task.status === "Concluída");

  return (
    <div className="kanban-board">
      <div className="kanban-column">
        <h3>Pendente</h3>
        {pendingTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>

      <div className="kanban-column">
        <h3>Em Andamento</h3>
        {inProgressTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>

      <div className="kanban-column">
        <h3>Concluída</h3>
        {doneTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
