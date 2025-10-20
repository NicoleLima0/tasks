import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CirclePlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

function Home() {
  const toast = useRef(null);
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

  const handleDropTask = (task, newStatus) => {
    const oldStatus = task.status;
    if (oldStatus === newStatus) {
      return;
    }

    if (oldStatus === "Pendente" && newStatus === "Concluída") {
      toast.current.show({
        severity: "warn",
        summary: "Alerta",
        detail:
          "Ação inválida: Tarefas Pendente não podem ir direto para Concluída.",
      });

      return;
    }
    if (oldStatus === "Concluída" && newStatus === "Pendente") {
      toast.current.show({
        severity: "warn",
        summary: "Alerta",
        detail:
          "Ação inválida: Tarefas Concluída não podem voltar para Pendente.",
      });

      return;
    }

    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog className="task-modal" />
      <TaskModal
        visible={isModalVisible}
        onHide={() => {
          setIsModalVisible(false);
          setTaskToEdit(null);
        }}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />
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
            <DndProvider backend={HTML5Backend}>
              <KanbanBoard
                handleDropTask={handleDropTask}
                tasks={tasks}
                onEditTask={handleOpenEditModal}
                onDeleteTask={confirmDelete}
              />
            </DndProvider>
          )}
          <div className="footer-btns">
            <Button
              onClick={() => setIsModalVisible(true)}
              className="add-task"
            >
              Criar tarefa <CirclePlusIcon size={25} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
