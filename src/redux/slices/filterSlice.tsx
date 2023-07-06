
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {defaultPlayer} from "../../interfaces/Player";

export const filterSlice = createSlice({
    name: 'button',
    initialState: {name: "", ultraPosition: ""},
    reducers: {
        setFilterData: (state, action) => state = action.payload,
    }
})

export const playerSlice = createSlice({
    name: 'player',
    initialState: defaultPlayer,
    reducers: {
        setPlayer: (state, action) => state = action.payload,
    }
})