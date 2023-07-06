import React, {ReactElement, useEffect, useState} from "react";
import {StyleSheet,  Text, View, FlatList, Alert, Image} from "react-native";
import { Request } from "../request/requestFunctions";
import FilterButton from "../FilterButton";
import {connect, useSelector} from "react-redux";
import {RootState} from "../redux/redux";
import PlayerItem from "./PlayerItem";

// COMPOSANT LISTE DES JOUEURS + BOUTON FILTRE

const PlayerList = (): ReactElement => {

    // state  |  liste des joueurs
    const [dataPlayers, setDataPlayers] =  useState< Array<any>>([]);
    //state | liste des clubs
    const [dataClubs, setDataClubs] = useState<Array<any>>([]);

    //state redux données filtre
    const filter = useSelector((state: RootState) => state.filter)

    //méthode pour filter liste des joueurs
    const filteredData = (): Array<any> => {
        let filteredData = dataPlayers;
        if(filter.ultraPosition !==  ""){
            filteredData = dataPlayers.filter(item => item.ultraPosition === filter.ultraPosition )
        }
        filteredData = filteredData.filter(item => (item.firstName + ' ' + item.lastName).includes(filter.name) );
        return filteredData;
    }

    /**
     * Use Effect :
     * Requete 1 : récupéère liste des joueurs
     * Requête 2 : récupère liste des clubs
     */
    useEffect(() => {
        Request('/api/data/championship-players-pool/1')
            .then(data => {
                const poolPlayer = data.poolPlayers;
                // On injecte l'object poolPlayers contenant tout les joueurs, au state
                setDataPlayers(state => poolPlayer)
            })
            .catch((err) => {
                setTimeout(() => {
                    Alert.alert("Erreur", "Pas de connexion au serveur")
                }, 500)
                console.log(err);
            })
        Request('/api/data/championship-clubs')
            .then(data => {
                //Contrairement à l'API "championship-players-pool", championship-club possède des "key" => "values" aux clubs, donc on fait cette manip
                // Object.entries(data)[0][1] pour récupérer les objets
                setDataClubs(state =>  Object.entries(data)[0][1])
            })
            .catch((err) => {
                setTimeout(() => {
                    Alert.alert("Erreur", "Pas de connexion au serveur")
                }, 500)
                console.log(err);
            })
    }, [])


    /**
     * Dans le render, nous avons une condition "dataPlayers.length > 0 && Object.keys(dataClubs).length > 0 &&" car il faut
     * attendre l'initialisation des states dans le useEffect (représentant la liste des clubs et des joueurs), avant d'appeller la flatlist.
     */
    return (
        <>
            <View style={styles.filterButtonContainer}>
                <FilterButton title={"Filtre"} />
            </View>
            {dataPlayers.length > 0 && Object.keys(dataClubs).length > 0 &&
                <FlatList
                    style={{ flex: 1}}
                    data={filteredData()}
                    keyExtractor={(item: any, index: number) => {
                        return index.toString()
                    }}
                    showsHorizontalScrollIndicator={false}
                    initialNumToRender={30}
                    renderItem={({item , index: number}) => (
                        <PlayerItem
                            playerItem={item}
                            clubJersey={dataClubs[item.clubId].defaultJerseyUrl}
                            clubShortName={dataClubs[item.clubId].shortName}
                        />
                    )}
                />
            }
        </>
    );
};

// STYLE
const styles = StyleSheet.create({
    filterButtonContainer: {
        shadowColor: '#000',
        width: '100%',
        height: 100,
        shadowOffset: {width: 3, height: 1},
        shadowOpacity: 0.4,
    },
});

const mapStateToProps = (state: RootState) => {
    return {page: state.filter}
}

export default connect(mapStateToProps)(PlayerList)

