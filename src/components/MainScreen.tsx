import { StyleSheet, View, Image, KeyboardAvoidingView, Text } from "react-native"
import TodoList from "./TodoList";

const MainScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/logo/westerops.png')} />
            </View>
            <View style={styles.todolistContainer}>
                <TodoList />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        width: "100%"
    },
    imageContainer: {
        flex: 1,
        alignSelf: "center"
    },
    todolistContainer: {
        flex: 14,
        paddingHorizontal: 20
    }
})

export default MainScreen;