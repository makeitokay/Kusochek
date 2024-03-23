import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "../../../types/appState";


const defaultState: AppState = {
    error: null,
    loading: false
}

export const appStateSlice = createSlice({
    name: "appState",
    initialState: defaultState,
    reducers: {
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})
export const selectAppError = (state: { appState: AppState }) => state.appState.error
export const selectAppLoading = (state: { appState: AppState }) => state.appState.loading
export const {setError, setLoading} = appStateSlice.actions
export default appStateSlice.reducer