import { Children, useState } from "react";
import { View, StyleSheet, Animated, TouchableOpacity, Dimensions } from "react-native";

interface IProps {
    title: string;
}

const BottomSheet: React.FC<IProps> = ({
    title
}) => {
    const SCREEN_HEIGHT = Dimensions.get("screen").height;

    const [isVisible, setIsVisible] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0));

    const backdrop = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 0.01],
                    outputRange: [SCREEN_HEIGHT, 0],
                    extrapolate: "clamp",
                }),
            },
        ],
        opacity: animation.interpolate({
            inputRange: [0.01, 0.5],
            outputRange: [0, 1],
            extrapolate: "clamp",
        }),
    };

    const slideUp = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0.01, 1],
                    outputRange: [SCREEN_HEIGHT, 0],
                    extrapolate: "clamp",
                }),
            },
        ],
    };

    const openBottomSheet = () => {
        setIsVisible(true);
        handleOpen();
    }

    const handleOpen = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }

    const closeBottomSheet = () => {
        setIsVisible(false);
        handleClose();
    }

    const handleClose = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    return (
        <>
            {isVisible &&
                <View style={styles.sheet}>
                    <Animated.View style={[StyleSheet.absoluteFill, styles.cover]}>
                        <TouchableOpacity onPress={() => closeBottomSheet()}>
                            <View style={{ height: "100%" }}></View>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View
                        style={[styles.container, backdrop, slideUp]}
                    >
                        {Children}
                    </Animated.View>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    sheet: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        justifyContent: "flex-end"
    },
    container: {
        width: "100%",
        position: "relative",
        top: 0,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#C7CDD3",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        maxHeight: "75%"
    },
    cover: {
        backgroundColor: "rgba(0,0,0,.5)"
    },
})

export default BottomSheet;