import React, {ReactElement, useEffect, useState} from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";


// Typing des props
type SmallBlockProps = {
    title: string,
}

// COMPOSANT BOUTON APPELANT LE FILTRE (MODAL SCREEN)
const FilterButton = (props: SmallBlockProps) : ReactElement => {

    const navigation = useNavigation();

    return(
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Filter" as never)}
        >
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: '#76d4bc',
        borderRadius: 10,
        paddingHorizontal: 20,
        marginTop: "5%",
        height: 65,
        justifyContent: "center",
        width: 100,
    },
    title:{
        fontSize: 20,
    }
})

export default FilterButton;