import React, {ReactElement, useEffect, useState} from "react";
import {Alert, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { RootState } from "../redux/redux";
import {connect, useSelector} from "react-redux";
import {Request} from "../request/requestFunctions";
import {getPlayerFullName, getPlayerPost} from "../interfaces/Player";

//COMPOSANT PAGE DU JOUEUR

const PlayerScreen = (): ReactElement => {

    //object pour la navigation
    const navigation = useNavigation();

    //State servant à récupérer l'object du joueur après la requête
    const [playerObject, setPlayerObject] =  useState< any>([]);

    //On récupère le state player envoyé par Redux
    const player = useSelector((state: RootState) => state.player)

    //Initialisation du compoantn -> requête -> set le state playerObject
    useEffect(() => {
        Request(`/api/data/championship-player-stats/${player.id}/2022`)
            .then(data => {
                setPlayerObject(data)
            })
            .catch((err) => {
                setTimeout(() => {
                    Alert.alert("Erreur", "Pas de connexion au serveur")
                }, 500)
                console.log(err);
            })
    }, [player])

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.closeButton} onPress={() => navigation.goBack()}>X</Text>
                <Text style={styles.title}>DONNEES JOUEUR</Text>
                {playerObject &&
                    <View style={styles.playerInfoContainer}>
                      <Text style={styles.text}>{` Prénom et nom :  ${getPlayerFullName(player)}`}</Text>
                      <Text style={styles.text}>{` Poste actuel :  ${getPlayerPost(player)}`}</Text>
                      <Text style={styles.text}>{` Position:  ${playerObject.position}`}</Text>
                    </View>
                }
            </View>
        </>
    );
};

const mapStateToProps = (state: RootState) => {
    return {filter: state.filter, player: state.player}
}


export default connect (mapStateToProps) (PlayerScreen)


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
    closeButton: {
        position: "absolute",
        top:20,
        right: 25,
        fontSize: 30,
        fontWeight: "bold",
        color: "gray"
    },
    playerInfoContainer: {
        padding: 30,
        backgroundColor: "#e2e2e2",
        borderRadius: 10,
    },
    text: {
        fontSize: 17,
        marginVertical: 10
    }
});
