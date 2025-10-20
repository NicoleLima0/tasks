import { PencilIcon, TrashIcon } from "lucide-react";
import KanbanColumn from "./kanbanColumn";

function KanbanBoard({ tasks, onEditTask, onDeleteTask, handleDropTask }) {
  const pendingTasks = tasks.filter((task) => task.status === "Pendente");
  const inProgressTasks = tasks.filter(
    (task) => task.status === "Em Andamento"
  );
  const doneTasks = tasks.filter((task) => task.status === "Concluída");

  return (
    <div className="kanban-board">
      <KanbanColumn
        title="Pendente"
        status="Pendente"
        tasks={pendingTasks}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
        onDropTask={handleDropTask} // Passa a função de drop
      />
      <KanbanColumn
        title="Em Andamento"
        status="Em Andamento"
        tasks={inProgressTasks}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
        onDropTask={handleDropTask} // Passa a função de drop
      />
      <KanbanColumn
        title="Concluída"
        status="Concluída"
        tasks={doneTasks}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
        onDropTask={handleDropTask} // Passa a função de drop
      />
    </div>
  );
}

export default KanbanBoard;
