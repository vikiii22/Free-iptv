import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { ICardsProps } from "../../Cards/cards.interface";

interface ExtendedCardsProps extends ICardsProps {
  isSelected?: boolean;
}

const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: 10,
        borderRadius: 15,
        overflow: "hidden",
    },
    cardBackground: {
        padding: 15,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#fff",
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    channelName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    channelGroup: {
        fontSize: 14,
        color: "white",
        opacity: 0.8,
    },
});

export default function CardChannel(props: ExtendedCardsProps) {
    const { name, logo, group, favorite, onPressChannel, onToggleFavorite, isSelected } = props;

    return (
        <TouchableOpacity onPress={onPressChannel} style={styles.cardContainer}>
            <LinearGradient
                colors={isSelected ? ["#6EB5FF", "#567DF4"] : ["#212B4E", "#212B4E"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardBackground}
            >
                <View style={styles.content}>
                    <Image source={{ uri: logo }} style={styles.logo} />
                    <View style={styles.textContainer}>
                        <Text style={styles.channelName}>{name}</Text>
                        <Text style={styles.channelGroup}>{group}</Text>
                    </View>

                    <TouchableOpacity onPress={onToggleFavorite}>
                        <MaterialIcons
                            name={favorite ? "favorite" : "favorite-border"}
                            size={24}
                            color={favorite ? "white" : "#ccc"}
                        />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}
