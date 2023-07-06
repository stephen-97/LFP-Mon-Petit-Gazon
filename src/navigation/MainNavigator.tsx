import React, {ReactElement} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import PlayerList from "../components/PlayerList";
import Filter from "../components/Filter";
import PlayerScreen from "../components/PlayerScreen";

/**
 * COMPOSANT PRINCIPAL REACT NAVIGATOR
 *
 * Nombre de page : 3
 * Liste des page :
 *  - Page de la liste des joueurs
 *  - Page du filtre (modal)
 *  - Page du joueur (modal)
 */

const MainNavigator = (): ReactElement => {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'PlayerPage'}
                screenOptions={{
                    headerShown: false,
                }}
            >
                    <Stack.Group
                        screenOptions={{
                            animation: "none",
                            gestureEnabled: false,

                        }}
                    >
                        <Stack.Screen name={"PlayerList"} component={PlayerList}/>
                    </Stack.Group>
                    <Stack.Group
                        screenOptions={{
                            gestureEnabled: false,
                            presentation: "modal",
                        }}
                    >
                        <Stack.Screen name={"Filter"} component={Filter}/>
                        <Stack.Screen name={"PlayerScreen"} component={PlayerScreen}/>
                    </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default (MainNavigator);


