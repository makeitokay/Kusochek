import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./slices/user";
import modalReducer from "./slices/modal";
import storyIdReducer from "./slices/StorySlices/storyId"
import storyBlockIDReducer from "./slices/StorySlices/storyBlockID"
import appStateSlice from "./slices/appState";

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
            modal: modalReducer,
            storyIDArray: storyIdReducer,
            currentStoryBlockID: storyBlockIDReducer,
            appState: appStateSlice
        }
    })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch