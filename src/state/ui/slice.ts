import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authActions } from '../auth/slice'
import { useAppState } from '../store'
import { DropDownOverlayProps, Notification, UiState } from './types'

export const initialUiState: UiState = {
  notifications: [],
  dropdowns: [],
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
    addDropdown: (state, action: PayloadAction<DropDownOverlayProps>) => {
      state.dropdowns.push(action.payload)
    },
    removeDropdown: (state, action: PayloadAction<DropDownOverlayProps>) => {
      state.dropdowns.splice(state.dropdowns.indexOf(action.payload), 1)
    },
  },
  extraReducers: {
    [authActions.removeAuth.type]: () => initialUiState,
  },
})

export const uiActions = uiSlice.actions
export const useUiState = () => useAppState((state) => state.ui)

export default uiSlice.reducer
