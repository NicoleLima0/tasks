import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CirclePlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import TaskModal from "../../components/taskModal";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/taskService";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { SelectButton } from "primereact/selectbutton";
import KanbanBoard from "../../components/kanbanBoard";

function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [viewMode, setViewMode] = useState("Tabela");

  const viewOptions = ["Tabela", "Kanban"];

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const handleSaveTask = async (taskData) => {
    try {
      if (taskToEdit) {
        const updatedTask = await updateTask(taskToEdit.id, taskData);
        setTasks(
          tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
      } else {
        const savedTask = await createTask(taskData);
        setTasks([...tasks, savedTask]);
      }
    } catch (error) {
      console.error("Falha ao salvar a tarefa.", error);
    } finally {
      setIsModalVisible(false);
      setTaskToEdit(null);
    }
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalVisible(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId, setTasks);
    } catch (error) {
      console.error("Falha ao deletar a tarefa.", error);
    }
  };

  const confirmDelete = (task) => {
    confirmDialog({
      message: `Tem certeza que deseja excluir a tarefa "${task.taskName}"?`,
      header: "Confirmação de Exclusão",
      acceptLabel: "Sim, excluir",
      rejectLabel: "Cancelar",
      accept: () => handleDeleteTask(task.id),
    });
  };

  const actionsBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => handleOpenEditModal(rowData)}
          className="p-button p-button-icon-only p-button-rounded p-button-text p-button-info"
          title="Editar"
        >
          <PencilIcon size={15} />
        </button>
        <button
          onClick={() => confirmDelete(rowData)}
          className="p-confirm-dialog"
          title="Excluir"
        >
          <TrashIcon size={15} />
        </button>
      </div>
    );
  };

  return (
    <>
      <ConfirmDialog className="task-modal" />
      <div className="container">
        <div className="title">Gerenciador de tarefas</div>
        <div className="view-options">
          <SelectButton
            value={viewMode}
            options={viewOptions}
            onChange={(e) => setViewMode(e.value)}
          />
        </div>
        <div className="card">
          {viewMode === "Tabela" ? (
            <DataTable
              loading={loading}
              value={tasks}
              tableStyle={{ minWidth: "50rem" }}
              emptyMessage="Nenhuma tarefa encontrada."
            >
              <Column field="taskName" header="Tarefa"></Column>
              <Column field="status" header="Status"></Column>
              <Column field="priority" header="Prioridade"></Column>
              <Column field="description" header="Descrição"></Column>
              <Column
                body={actionsBodyTemplate}
                style={{ width: "5rem", textAlign: "center" }}
              />
            </DataTable>
          ) : (
            <KanbanBoard
              tasks={tasks}
              onEditTask={handleOpenEditModal}
              onDeleteTask={confirmDelete}
            />
          )}
          <TaskModal
            visible={isModalVisible}
            onHide={() => setIsModalVisible(false)}
            onSave={handleSaveTask}
            taskToEdit={taskToEdit}
          />
          <footer>
            <button
              onClick={() => setIsModalVisible(true)}
              className="add-task"
            >
              <CirclePlusIcon size={35} />
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Home;
