import React, {ReactElement, useEffect, useState} from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";

type SmallBlockProps = {
    title: string,
}

const FilterButton = (props: SmallBlockProps) : ReactElement => {
    return(
        <TouchableOpacity
            style={styles.button}
            onPress={() => null}
        >
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        alignItems: "center",
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