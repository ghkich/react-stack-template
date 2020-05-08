import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'

import authReducer from './auth/slice'
import registerReducer from './register/slice'
import uiReducer from './ui/slice'

const reducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  ui: uiReducer,
})

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, AppState, null, Action<string>>
export const useAppState: TypedUseSelectorHook<AppState> = useSelector

export default store
