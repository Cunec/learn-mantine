import { configureStore } from '@reduxjs/toolkit'
import navbarReducer from './features/ApplicationContainer/ApplicationNavbarSlice'
import authenticationFormReducer from './features/AuthenticationForm/AuthenticationFormSlice'
import authenticationLoginReducer from './features/AuthenticationForm/AuthenticationLoginSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      navbar: navbarReducer,
      authenticationForm: authenticationFormReducer,
      //authenticationFormModal: authenticationFormReducer,
      authenticationLogin: authenticationLoginReducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store