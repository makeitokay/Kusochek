import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const defaultStoryBlockID: StoryBlockID = {
    id: 0
}

interface StoryBlockID {
    id: number
}

export const currentStoryBlockIDSlice = createSlice({
    name: "currentStoryBlockID",
    initialState: defaultStoryBlockID,
    reducers: {
        setID: (state, action: PayloadAction<number>) => {
            state.id = action.payload
        }
    }
})

export const selectCurrentStoryBlockID = (state: { currentStoryBlockID: StoryBlockID }) => state.currentStoryBlockID.id
export const {setID} = currentStoryBlockIDSlice.actions
export default currentStoryBlockIDSlice.reducer


