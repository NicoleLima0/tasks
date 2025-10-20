// Função para buscar todas as tarefas do localStorage

export const getTasks = async () => {
  return new Promise((resolve) => {
    const tasksJSON = localStorage.getItem("tasks");
    if (tasksJSON) {
      resolve(JSON.parse(tasksJSON));
    } else {
      resolve([]);
    }
  });
};

// Função para criar uma nova tarefa e salvar no localStorage
export const createTask = async (taskData) => {
  return new Promise((resolve) => {
    const currentTasks = getTasks();

    const newTaskWithId = {
      ...taskData,
      id: Date.now(),
    };

    const updatedTasks = [...currentTasks, newTaskWithId];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    resolve(newTaskWithId);
  });
};

// Função para ATUALIZAR uma tarefa existente

export const updateTask = async (taskId, taskData) => {
  return new Promise((resolve) => {
    const currentTasks = getTasks();

    const updatedTasks = currentTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...taskData };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    resolve({ ...taskData, id: taskId });
  });
};

export const deleteTask = async (taskId, setTask) => {
  return new Promise((resolve) => {
    // Pega todas as tarefas atuais
    const currentTasks = getTasks();

    // Filtra a lista, mantendo apenas as tarefas cujo ID é DIFERENTE daquele que queremos deletar.    
    const remainingTasks = currentTasks.filter((task) => task.id !== taskId);

    // 3. Salva a nova lista (sem a tarefa deletada) no localStorage
    localStorage.setItem("tasks", JSON.stringify(remainingTasks));
    setTask(remainingTasks);

    resolve(true);
  });
};
