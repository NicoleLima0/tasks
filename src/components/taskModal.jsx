import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

function TaskModal({ visible, onHide }) {
  const statuses = [
    { label: "Pendente", value: "pending" },
    { label: "Em Andamento", value: "in_progress" },
    { label: "Concluída", value: "completed" },
  ];

  const priorities = [
    { label: "Alta", value: "high" },
    { label: "Média", value: "medium" },
    { label: "Baixa", value: "low" },
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
        onClick={onHide}
        autoFocus
      />
    </div>
  );

  return (
    <Dialog
      header="Adicionar Nova Tarefa"
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
          <InputText id="task-name" autoFocus />
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="status">Status</label>
          <Dropdown
            id="status"
            options={statuses}
            placeholder="Selecione um status"
          />
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="priority">Prioridade</label>
          <Dropdown
            id="priority"
            options={priorities}
            placeholder="Selecione uma prioridade"
          />
        </div>
        <div className="field col-12">
          <label htmlFor="description">Descrição</label>
          <InputTextarea id="description" rows={4} />
        </div>
      </div>
    </Dialog>
  );
}

export default TaskModal;
