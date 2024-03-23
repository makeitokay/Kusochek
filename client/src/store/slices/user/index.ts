import {User} from "../../../types/user";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {appStateSlice} from "../appState";

interface userState {
    user: User
}

const defaultState: userState = {
    user: {
        firstName: "",
        lastName: "",
        email: "",
        mobilePhone: 0,
        profilePicture: "",
        isAdmin: false
    }
}
export const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        }
    }
})
export const {setUser} = userSlice.actions
export const selectUser = (state: { user: userState; }) => state.user.user
export default userSlice.reducer
