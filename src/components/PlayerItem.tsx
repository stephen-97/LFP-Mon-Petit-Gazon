import React, {ReactElement } from "react";
import {StyleSheet, Text, TouchableOpacity, Image} from "react-native";
import {getPlayerFullName} from "../interfaces/Player";
import {useNavigation} from "@react-navigation/native";
import {AppDispatch, RootState, setFilterData} from "../redux/redux";
import {connect, useDispatch, useSelector} from "react-redux";
import {setPlayer} from "../redux/redux";
import { getPlayerPost} from "../interfaces/Player";
import constants from "../constants/constants";

// Typing des props
type PlayerItemProps = {
    playerItem: any,
    clubJersey: string,
    clubShortName: string,
}

// COMPOSANT DE L'ITEM DE LA FLATLIST, REPRESENTE LE JOUEUR

const PlayerItem = (props: PlayerItemProps): ReactElement => {

    // objet react navigation pour chanegr de page
    const navigation = useNavigation();
    //object redux pour dispatcher dans le store (lorsque l'utilisateur clique sur un PlayerItem, l'object player est envoyé dans le store)
    const dispatch: AppDispatch = useDispatch();

    //Méthode pour aller dans la page du joueur lorsque l'utilisateur appuie sur le composantn
    const goToPlayerScreen = (): void => {
        dispatch(setPlayer(props.playerItem))
        navigation.navigate("PlayerScreen" as never)
    }

    return (
        <TouchableOpacity style={styles.content} onPress={() => goToPlayerScreen()}>
            <Text style={styles.playerName}>{getPlayerFullName(props.playerItem)}</Text>
            <Text style={styles.playerQuotation}>{props.playerItem.quotation}</Text>
            <Text style={styles.playerPost}>{getPlayerPost(props.playerItem)}</Text>
            <Image source={{uri: props.clubJersey }}  style={styles.image}  />
            <Text style={styles.playerClubShortName}></Text>
            <Text style={styles.playerClubShortName}>{props.clubShortName}</Text>
        </TouchableOpacity>
    );
};


const mapStateToProps = (state: RootState) => {
    return {
        filter: state.filter,
        player: state.player
    }
}


export default connect (mapStateToProps) (PlayerItem)

// STYLE
const styles = StyleSheet.create({
    content: {
        height: 100,
        backgroundColor: '#dee6e4',
        margin: 20,
        borderRadius: 20,
    },
    image:{
        position: 'absolute',
        top:50,
        transform: [{translateY:  -35}],
        right: 20,
        height: 60,
        width: 60,
        zIndex: 1,
    },
    playerName : {
        fontSize: 22,
        fontWeight:"bold",
        position: 'absolute',
        top: 15,
        left: constants.playerItemMarginLeft,
    },
    playerClubShortName: {
        position: "absolute",
        fontWeight: 'bold',
        color: '#4a4a4a',
        fontSize: 17,
        bottom: 10,
        left: constants.playerItemMarginLeft,
    }   ,
    playerQuotation: {
        position: 'absolute',
        textAlign: 'center',
        width: 30,
        bottom: 5,
        fontSize: 20,
        right: 50,
        transform: [{translateX:  15}],
    },
    playerPost: {
        position: "absolute",
        fontWeight: 'bold',
        color: 'gray',
        fontSize: 17,
        top: 45,
        left: constants.playerItemMarginLeft,
    }
});
