import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CirclePlusIcon } from "lucide-react";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import TaskModal from "../../components/taskModal";

function Home() {

    const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className="container">
        <div className="title">Gerenciador de tarefas</div>
        <div className="card">
          <DataTable tableStyle={{ minWidth: "50rem" }}>
            <Column field="task" header="Tarefa"></Column>
            <Column field="status" header="Status"></Column>
            <Column field="priority" header="Prioridade"></Column>
            <Column field="description" header="Descrição"></Column>
          </DataTable>
          <button
            onClick={() => setIsModalVisible(true)}
            className="add-task"
          >
            <CirclePlusIcon size={35} />
          </button>
          <TaskModal
            visible={isModalVisible} 
            onHide={() => setIsModalVisible(false)} 
          />
        </div>
      </div>
    </>
  );
}

export default Home;
