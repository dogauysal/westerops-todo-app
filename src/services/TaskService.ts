
import AsyncStorage from '@react-native-async-storage/async-storage'
import Task from "../models/Task";


const addNewTask = async (task: Task) => {
    let taskList: Task[] = []

    taskList = await getAllTasks();

    task.Id = new Date().getMilliseconds();


    if (task.IsPinnedOnTop) {
        taskList.forEach(t => t.IsPinnedOnTop = false);
    }

    taskList.push(task);


    const _tasksJson = JSON.stringify(taskList);

    await AsyncStorage.setItem("TASKS", _tasksJson);

}

const getAllTasks = async () => {
    let taskList: Task[] = []

    const _tasksJson = await AsyncStorage.getItem("TASKS");

    if (_tasksJson) {
        taskList = JSON.parse(_tasksJson)
    }

    return taskList;
}

const deleteTask = async (id: number) => {
    let taskList: Task[] = []

    taskList = await getAllTasks()

    taskList = taskList.filter(t => t.Id != id);

    const _tasksJson = JSON.stringify(taskList);

    await AsyncStorage.setItem("TASKS", _tasksJson);
}

const pinTaskOnTop = async (id: number) => {
    let tasks = await getAllTasks();

    tasks.forEach(t => t.IsPinnedOnTop = false);

    let task = tasks.find(t => t.Id === id);

    if (task) {
        task.IsPinnedOnTop = true;
    }

    const _tasksJson = JSON.stringify(tasks);

    await AsyncStorage.setItem("TASKS", _tasksJson);

    return task;
}

const changeDoneStatus = async (id: number) => {
    let tasks = await getAllTasks();

    let task = tasks.find(t => t.Id === id);

    if (task) {
        task.IsDone = !task.IsDone
    }

    const _tasksJson = JSON.stringify(tasks);

    await AsyncStorage.setItem("TASKS", _tasksJson);

}

const deleteAllTasks = async () => {
    await AsyncStorage.removeItem("TASKS")
}

export default { addNewTask, getAllTasks, deleteTask, pinTaskOnTop, changeDoneStatus, deleteAllTasks };