import React, {ReactElement, useEffect, useState} from "react";
import {StyleSheet,  Text, View, FlatList, Alert} from "react-native";
import { Request } from "../request/requestFunctions";
import propTypes from "prop-types";


type SmallBlockProps = {
    filter: string,
}



const PlayerList = (props: SmallBlockProps): ReactElement => {

    const [dataPlayers, setDataPlayers] =  useState([]);

    useEffect(() => {
        Request('/api/data/championship-players-pool/1')
            .then(data => {
                const poolPlayer = data.poolPlayers;
                setDataPlayers(state => ({...state, ...data}))
                //console.log(typeof Object.values(JSON.parse(data.poolPlayers)))
            })
            .catch((err) => {
                setTimeout(() => {
                    Alert.alert("Erreur", "Pas de connexion au serveur")
                }, 500)
                console.log(err);
            })
    }, dataPlayers)

    const testData= [{id: "0", title: "test 1"}, {id: "2", title: "test 2"}, {id: "3", title: "test 3"}, {id: "4", title: "test 4"}, {id: "5", title: "test 5"}, {id: "5", title: "test 5"}, {id: "5", title: "test 5"}, {id: "5", title: "test 5"}, {id: "5", title: "test 5"}, {id: "5", title: "test 5"}, {id: "5", title: "test 5"}, ]


    return (
         <FlatList
             style={{ flex: 1}}
             data={testData}
             keyExtractor={(item: any, index: number) => {
                 return index.toString()
             }}
             showsHorizontalScrollIndicator={false}
             initialNumToRender={1}
             renderItem={({item: any, index: number}) => (
                 <View style={styles.content}>
                     <Text>HEY</Text>
                 </View>
             )}
         />
    );
};


export default PlayerList


const styles = StyleSheet.create({
    content: {
        height: 100,
        backgroundColor: '#cffff8',
        margin: 20,
        borderRadius: 20,
    },
    viewTitle: {
        height: 50,
        backgroundColor: '#494949',
    },
    title:{
        marginLeft: 20,
        fontSize: 22,
        fontWeight: "bold",
        color: "black",
        marginBottom: 10,
    },
    image:{
        height: 210,
        width: 180,
    },
    mangaTitle: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
    }
});
