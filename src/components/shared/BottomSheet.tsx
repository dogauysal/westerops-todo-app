import React, { Children, forwardRef, useImperativeHandle, useState } from "react";
import { View, StyleSheet, Animated, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";

interface IProps {
    children: React.ReactNode;
    heigth: string;
}

const BottomSheet = forwardRef((props: IProps, ref) => {

    useImperativeHandle(ref, () => ({
        openBottomSheet: () => {
            setIsVisible(true);
            handleOpen();
        },
        closeBottomSheet: () => {
            setIsVisible(false);
            handleClose();
        }
    }))

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
                <View style={[styles.sheet, styles.cover]}>
                    <Animated.View style={[StyleSheet.absoluteFill]}>
                        <TouchableOpacity onPress={() => closeBottomSheet()}>
                            <View style={{ height: "100%" }}></View>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View
                        style={[styles.container, backdrop, slideUp, {
                            height: props.heigth
                        }]}
                    >
                        <KeyboardAvoidingView >
                            {props.children}
                        </KeyboardAvoidingView>
                    </Animated.View>
                </View>
            }
        </>
    )
})

const styles = StyleSheet.create({
    sheet: {
        flex: 1,
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
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    cover: {
        backgroundColor: "rgba(0,0,0,.5)",
    },
})

export default BottomSheet;