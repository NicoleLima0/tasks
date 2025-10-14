import { Dialog } from "primereact/dialog";
import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

function TaskModal({ visible, onHide, onSave, taskToEdit }) {
  const [taskName, setTaskName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      // Se estamos em modo de edição, preenchemos os campos
      setTaskName(taskToEdit.taskName);
      setSelectedStatus(taskToEdit.status);
      setSelectedPriority(taskToEdit.priority);
      setDescription(taskToEdit.description);
    } else {
      // Se não, limpamos os campos (modo de adição)
      setTaskName("");
      setSelectedStatus(null);
      setSelectedPriority(null);
      setDescription("");
    }
  }, [taskToEdit, visible]);

  const handleSave = () => {
    // 4. Monta o objeto de dados sem o ID. O ID será gerenciado pelo serviço.
    const taskData = {
      taskName: taskName,
      status: selectedStatus,
      priority: selectedPriority,
      description: description,
    };
    onSave(taskData);
  };

  const statuses = [
    { label: "Pendente", value: "Pendente" },
    { label: "Em Andamento", value: "Em Andamento" },
    { label: "Concluída", value: "Concluída" },
  ];

  const priorities = [
    { label: "Alta", value: "Alta" },
    { label: "Média", value: "Média" },
    { label: "Baixa", value: "Baixa" },
  ];


  const modalFooter = (
    <div className="addtask">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={onHide}
        className="p-button-text"
        
      />
      <Button
        label="Salvar Tarefa"
        icon="pi pi-check"
        onClick={handleSave}
        autoFocus
      />
    </div>
  );

  return (
    <Dialog
      header={taskToEdit ? "Editar Tarefa" : "Adicionar Nova Tarefa"}
      visible={visible}
      style={{ width: "90vw", maxWidth: "600px" }}
      modal
      onHide={onHide}
      footer={modalFooter}
      draggable={false}
      className="task-modal"
    >
      <div className="p-fluid grid form-grid">
        <div className="field col-12">
          <label htmlFor="task-name">Nome da Tarefa</label>
          <InputText
            id="task-name"
            autoFocus
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="priority">Prioridade</label>
          <Dropdown
            id="priority"
            options={priorities}
            placeholder="Selecione uma prioridade"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.value)}
            required
          />
          <div className="field col-12 md:col-6">
            <label htmlFor="status">Status</label>
            <Dropdown
              id="status"
              options={statuses}
              placeholder="Selecione um status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.value)}
              required
            />
          </div>
        </div>
        <div className="field col-12">
          <label htmlFor="description">Descrição</label>
          <InputTextarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default TaskModal;
