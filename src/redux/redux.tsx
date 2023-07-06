import { configureStore } from '@reduxjs/toolkit'
import {filterSlice, playerSlice} from "./slices/filterSlice";


/**
 * Deux reduceurs:
 * - reducer des données du filtre
 * - reducer des données du joueur selectionné (après que l'utilisateur appuie sur un élément de la liste)
 */

export const { setFilterData} = filterSlice.actions
export const { setPlayer} = playerSlice.actions

export const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        player: playerSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch