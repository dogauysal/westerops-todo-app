import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const TodoList = () => {

    return (
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <Text style={styles.label}>To Do List</Text>
            </View>
            <View style={styles.pinSection}>
                <View style={styles.pinContainer}>
                    <Image style={styles.pinImage} source={require('../assets/images/icons/pin_icon.png')} />
                    <Text style={styles.pinText}>Pin on the Top</Text>
                </View>
            </View>
            <View style={styles.listSection}>
                <View
                    style={styles.listContainer}
                >
                    <ScrollView>

                    </ScrollView>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => console.log("")}
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
    }
})

export default TodoList;