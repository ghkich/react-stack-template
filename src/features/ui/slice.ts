import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authActions } from '../auth/slice'
import { useAppState } from '../store'
import { Notification, UiState } from './types'

export const initialUiState: UiState = {
  notifications: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload)
    },
    removeNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.splice(state.notifications.indexOf(action.payload), 1)
    },
  },
  extraReducers: {
    [authActions.removeAuth.type]: () => initialUiState,
  },
})

export const uiActions = uiSlice.actions
export const useUiState = () => useAppState((state) => state.ui)

export default uiSlice.reducer
