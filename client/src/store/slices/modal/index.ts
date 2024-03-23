import {Modal} from "../../../types/modal";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import React from "react";

const defaultModal: Modal = {
    children: undefined,
    active: false
}

export const modalSlice = createSlice({
    name: "modal",
    initialState: defaultModal,
    reducers: {
        addElements: (state, action: PayloadAction<React.ReactNode>) => {
            state.children = action.payload
        },
        hide: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload
        }
    }
})
export const selectModalDom = (state: { modal: Modal }) => state.modal.children
export const selectModalActive = (state: { modal: Modal }) => state.modal.active
export const {addElements,hide} = modalSlice.actions
export default modalSlice.reducer