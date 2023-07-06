import React, {ReactElement, useEffect, useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Picker} from  "@react-native-picker/picker"
import {useNavigation} from "@react-navigation/native";
import {AppDispatch, RootState} from "../redux/redux";
import {connect, useDispatch, useSelector} from "react-redux";
import {setFilterData} from "../redux/redux";
import UltraPositionValues from "../interfaces/UltraPosition";
import {UltraPositionConfig} from "../interfaces/UltraPosition";


//COMPOSANT REPRESENTANT TOUTE LA PAGE DU FILTRE


const Filter = (): ReactElement => {

    // Méthode pour dispatch l'objet dans le storage redux
    const dispatch: AppDispatch = useDispatch();
    // Object react Navigation pour naviguer entre les pages
    const navigation = useNavigation();
    // State filter récupéré dans le storage
    const filter = useSelector((state: RootState) => state.filter)


    // State pour le poste du joueurs (récupéré dans le Picker), on l'initalise grâce au state "filter" du storage redux où l'initialState vaut {name: "", ultraPosition: ""}
    const [selectedPost, setSelectedPost] = useState<any>(filter.ultraPosition);
    // State pou récupérer le nom du joueur (dans le TextInput),  on l'initalise grâce au state "filter" du storage redux où l'initialState vaut {name: "", ultraPosition: ""}
    const [playerName, setPlayerName] = useState<string>(filter.name);


    return (
        <View style={styles.container}>
            <Text style={styles.closeButton} onPress={() => navigation.goBack()}>X</Text>
            <Text style={styles.title}>FILTRE</Text>
            <TextInput style={styles.input} placeholder={"Nom du joueur"} onChangeText={text=> setPlayerName(text)}>{playerName}</TextInput>
            <Picker
                selectedValue={selectedPost}
                style={styles.selectListPost}
                onValueChange={(itemValue: UltraPositionConfig, itemIndex: number) => setSelectedPost(itemValue) }
            >
                <Picker.Item label={"Tout les postes"} value={""} key={0}/>
                {UltraPositionValues.map(((item, index) =>
                    <Picker.Item label={item.post} value={item.ultraPoint} key={index+1}/>
                ))}
            </Picker>
            <TouchableOpacity
                style={styles.validButton}
                onPress={() => {
                    dispatch(setFilterData({"name": playerName, "ultraPosition": selectedPost}));
                    navigation.goBack()
                }}
            >
                <Text style={styles.titleValidButton}> Valider</Text>
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = (state: RootState) => {
    return {filter: state.filter}
}


export default connect (mapStateToProps) (Filter)


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: "100%",
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 20,
    },
    input: {
        marginTop: 50,
        width: '80%',
        height: 70,
        backgroundColor: '#e6e6e6',
        borderRadius: 20,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "gray",
        fontSize: 20,
        paddingHorizontal: 20
    },
    selectListPost: {
        marginTop: 50,
        minHeight : 70,
        width: 300,
        backgroundColor: '#e6e6e6',
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 10,
    },
    inputSelectList: {
        fontSize: 20,
        color: 'gray'
    },
    dropDownSelectList: {
        width: 300,
    },
    validButton:{
        position: "absolute",
        width: 130,
        height: 60,
        backgroundColor: "#76d4bc",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        bottom: 80
    },
    titleValidButton: {
        fontWeight: "bold",
        fontSize: 20,
    },
    closeButton: {
        position: "absolute",
        top:20,
        right: 25,
        fontSize: 30,
        fontWeight: "bold",
        color: "gray"
    }
});
