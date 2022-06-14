import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import Task from "../models/Task"
import TaskService from "../services/TaskService"

interface IProps {
    task: Task;
    onActionButtonClicked: (id: number) => void;
}

const TaskRow: React.FC<IProps> = ({
    task,
    onActionButtonClicked
}) => {

    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                    isChecked={task.IsDone}
                    fillColor="#21A7F9"
                    unfillColor="#fff"
                    iconStyle={styles.icon}
                    onPress={() => TaskService.changeDoneStatus(task.Id)}
                />

            </View>
            <View style={styles.textContainer}>
                <Text>{task.Description}</Text>
            </View>
            <TouchableOpacity
                onPress={() => onActionButtonClicked(task.Id)}
                style={styles.imageContainer}
            >
                <Image style={{ marginRight: 10 }} source={require('../assets/images/icons/dots.png')} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginVertical: 10,
    },
    checkboxContainer: {
        justifyContent: "center"
    },
    textContainer: {
        justifyContent: "center"
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    icon: {
        width: 25,
        height: 25,
        borderRadius: 5
    }
})

export default TaskRow