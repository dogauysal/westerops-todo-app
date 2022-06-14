import React, { createRef, useEffect, useRef, useState } from "react";
import { Button, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BottomSheet from "./shared/BottomSheet";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Task from "../models/Task";
import TaskService from "../services/TaskService";
import TaskRow from "./TaskRow";

const TodoList = () => {

    const actionButtonRef = useRef<BottomSheet>();
    const addTaskFormRef = useRef<BottomSheet>();

    const [newTask, setNewTask] = useState<Task>(new Task());
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [pinnedTask, setPinnedTask] = useState<Task>();
    const [selectedRowId, setSelectedRowId] = useState(0);


    useEffect(() => {

        TaskService.getAllTasks()
            .then((tasks) => {
                const pinnedTask = tasks.find(t => t.IsPinnedOnTop === true);

                if (pinnedTask) {
                    setPinnedTask(pinnedTask);
                }

                setTaskList(tasks)

            })
    }, [])

    useEffect(() => {
        fetchAllList()
    }, [pinnedTask])

    useEffect(() => {

    }, [])

    const fetchAllList = async () => {
        await TaskService.getAllTasks().then((tasks) => setTaskList(tasks))
    }

    const saveNewTask = async () => {
        await TaskService.addNewTask(newTask);

        setTaskList([...taskList, newTask])

        setNewTask(new Task());

        if (newTask.IsPinnedOnTop) {
            setPinnedTask(newTask);
        }

        addTaskFormRef.current.closeBottomSheet();
    }

    const cancelNewTask = () => {
        setNewTask(new Task());
        addTaskFormRef.current.closeBottomSheet();
    }

    const onDescriptionKeyPressed = (text: string) => {

        let _newTask = { ...newTask };

        _newTask.Description = text;

        setNewTask(_newTask);
    }

    const onPinTopChange = (value: boolean) => {
        let _newTask = { ...newTask };

        _newTask.IsPinnedOnTop = value;

        setNewTask(_newTask);
    }

    const onActionButtonClicked = (id: number) => {
        setSelectedRowId(id);
        actionButtonRef.current.openBottomSheet()
    }

    const onPinTopAction = async (id: number) => {
        let pinnedTask = await TaskService.pinTaskOnTop(id);

        setPinnedTask(pinnedTask)

        actionButtonRef.current.closeBottomSheet()
    }

    const onDeleteAction = async (id: number) => {
        await TaskService.deleteTask(id);

        let updatedList = taskList.filter(t => t.Id != id);

        if (pinnedTask?.Id === id) {
            setPinnedTask(undefined)
        }

        setTaskList(updatedList)

        actionButtonRef.current.closeBottomSheet()
    }

    const onUpdateAction = async (id: number) => {


        await TaskService.changeDoneStatus(id);

        let index = taskList.findIndex(t => t.Id === id);

        let list = [...taskList];
        list[index].IsDone = !list[index].IsDone;

        setTaskList([])
        setTaskList(list)

        if (list[index].IsPinnedOnTop) {
            setPinnedTask(undefined)
            setPinnedTask(list[index])
        }

        actionButtonRef.current.closeBottomSheet()
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.headerSection}>
                    <Text style={styles.label}>To Do List</Text>
                </View>
                <View style={styles.pinSection}>
                    <View style={styles.pinContainer}>
                        <Image style={styles.pinImage} source={require('../assets/images/icons/pin_icon.png')} />
                        <Text style={styles.pinText}>Pin on the top</Text>
                    </View>
                    <View style={styles.pinnedTaskContainer}>
                        {pinnedTask ?
                            <TaskRow
                                key={`pinned_${pinnedTask.Id}`}
                                task={pinnedTask}
                                onActionButtonClicked={onActionButtonClicked}
                            /> : <></>
                        }
                    </View>
                </View>
                <View style={styles.listSection}>
                    <View
                        style={styles.listContainer}
                    >
                        <ScrollView>
                            {taskList.filter(t => t.IsPinnedOnTop != true).map((task) => (
                                <TaskRow
                                    key={task.Id}
                                    task={task}
                                    onActionButtonClicked={onActionButtonClicked}
                                />
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => addTaskFormRef.current.openBottomSheet()}
                            style={styles.button}
                        >
                            <View style={styles.buttonSubContainer}>
                                <View style={styles.taskIcon}>
                                    <Image source={require('../assets/images/icons/task_icon.png')} />
                                </View>
                                <View style={styles.text}>
                                    <Text style={styles.buttonLabel}>Add a Task</Text>
                                </View>
                                <View style={styles.arrowIcon}>
                                    <Image style={styles.arrowIconImage} source={require('../assets/images/icons/arrow_icon.png')} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <BottomSheet
                ref={actionButtonRef}
                heigth="30%"
            >
                <View style={styles.actionButtonBottomSheetContainer}>
                    <TouchableOpacity
                        style={styles.actionButtonContainer}
                        onPress={() => onPinTopAction(selectedRowId)}
                    >
                        <View style={styles.actionButtonInnerContainer}>
                            <Image source={require('../assets/images/icons/pin.png')} />
                            <Text style={styles.actionButtonText}>Pin on the top</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButtonContainer}
                        onPress={() => onUpdateAction(selectedRowId)}
                    >
                        <View style={styles.actionButtonInnerContainer}>
                            <Image source={require('../assets/images/icons/refresh.png')} />
                            <Text style={styles.actionButtonText}>Update</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButtonContainer}
                        onPress={() => onDeleteAction(selectedRowId)}
                    >
                        <View style={styles.actionButtonInnerContainer}>
                            <Image source={require('../assets/images/icons/delete.png')} />
                            <Text style={styles.actionButtonText}>Delete</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
            <BottomSheet ref={addTaskFormRef} heigth="90%">
                <View style={styles.addTaskRefContainer}>
                    <View style={styles.addTaskHeader}>
                        <View style={{ justifyContent: "center" }}>
                            <Image source={require('../assets/images/icons/task_icon_orange.png')} />
                        </View>
                        <View style={{ justifyContent: "center" }}>
                            <Text style={styles.addTaskTitle}>Add a Task</Text>
                        </View>
                    </View>
                    <View style={styles.taskDescContainer}>
                        <TextInput
                            style={styles.taskDescInput}
                            placeholder="Task description"
                            value={newTask.Description}
                            onChangeText={onDescriptionKeyPressed}
                        />
                    </View>
                    <View style={styles.pinOnTopSection}>
                        <Image style={{ marginRight: 10 }} source={require('../assets/images/icons/pin_icon.png')} />
                        <Text style={{ fontSize: 16 }}>Pin on the top</Text>
                        <BouncyCheckbox
                            style={styles.checkbox}
                            fillColor="#FF7964"
                            unfillColor="#fff"
                            isChecked={newTask?.IsPinnedOnTop}
                            onPress={(value) => onPinTopChange(value)} />
                    </View>
                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                        <View style={[styles.saveButtonContainer, !newTask?.Description ? { backgroundColor: "#21A7F999" } : {}]}>
                            <TouchableOpacity style={[{ alignItems: "center" }]} disabled={!newTask?.Description} onPress={() => saveNewTask()} >
                                <View style={styles.text}>
                                    <Text style={styles.buttonLabel}>Save</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cancelButtonContainer}>
                            <TouchableOpacity onPress={() => cancelNewTask()}>
                                <View style={styles.text}>
                                    <Text style={{ color: "#21A7F9", fontSize: 18 }}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BottomSheet>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        marginBottom: 50,
        backgroundColor: "#fff",
    },
    headerSection: {
        flex: 2,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        width: 160,
        borderBottomColor: "#FF7964",
        borderBottomWidth: 4
    },
    label: {
        fontSize: 18,
        fontWeight: "600",
        lineHeight: 22,
        color: "#194591",
        fontStyle: "normal"
    },
    pinSection: {
        flex: 3,
        borderTopWidth: 1.5,
        borderTopColor: "#E5E5E5",
    },
    pinContainer: {
        flex: 1,
        flexDirection: "row",
        paddingTop: 25
    },
    pinnedTaskContainer: {
        flex: 1,
        marginHorizontal: 16
    },
    pinImage: {
        marginLeft: 17,
        marginRight: 10
    },
    pinText: {
        fontSize: 18,
        lineHeight: 20,
        color: "#FF7964"
    },
    listSection: {
        flex: 15
    },
    listContainer: {
        flex: 5,
        borderTopWidth: 1.5,
        borderTopColor: "#E5E5E5",
        marginHorizontal: 16
    },
    button: {
        flex: 1,
        justifyContent: "flex-end",
    },
    buttonContainer: {
        backgroundColor: "#21A7F9",
        height: 50,
        justifyContent: "center",
        margin: 16,
        borderRadius: 5
    },
    buttonSubContainer: {
        flex: 1,
        flexDirection: "row"
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
    taskIcon: {
        alignSelf: "center",
        marginHorizontal: 25
    },
    text: {
        alignSelf: "center"
    },
    arrowIcon: {
        alignSelf: "center",
        flex: 1
    },
    arrowIconImage: {
        alignSelf: "flex-end",
        marginRight: 20
    },
    addTaskRefContainer: {
        height: "100%",
    },
    addTaskHeader: {
        margin: 20,
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        width: "100%",
        paddingBottom: 20
    },
    addTaskTitle: {
        marginLeft: 10,
        color: "#FF7964",
        fontSize: 18,
        justifyContent: "center"
    },
    taskDescContainer: {
    },
    taskDescInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#999C9F",
        marginHorizontal: 32,
        paddingLeft: 5
    },
    pinOnTopSection: {
        marginTop: 30,
        marginHorizontal: 32,
        flexDirection: "row",
    },
    checkbox: {
        flex: 1,
        justifyContent: "flex-end"
    },
    saveButtonContainer: {
        backgroundColor: "#21A7F9",
        height: 50,
        justifyContent: "center",
        margin: 16,
        borderRadius: 5
    },
    cancelButtonContainer: {
        height: 50,
        justifyContent: "center",
        marginHorizontal: 16,
    },
    actionButtonBottomSheetContainer: {
        flexDirection: "column",
    },
    actionButtonContainer: {
        alignItems: "center",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        width: "100%"
    },
    actionButtonInnerContainer: {
        flexDirection: "row",
        alignItems: "center",

    },
    actionButtonText: {
        fontSize: 18,
        marginLeft: 15
    }
})

export default TodoList;