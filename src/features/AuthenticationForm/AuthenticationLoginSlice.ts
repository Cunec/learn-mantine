import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../../store"

export interface AuthenticationLoginState {
  loggedIn: boolean,
}

const initialState: AuthenticationLoginState = {
  loggedIn: false,
}

export const AuthenticationLoginSlice = createSlice({
  name: 'authenticationLogin',
  initialState,
  reducers: {
    setAuthenticationLogin: (state, action) => {
      state.loggedIn = action.payload
    }
  }
})

export const { setAuthenticationLogin: setAuthenticationLogin } = AuthenticationLoginSlice.actions

export const selectAuthenticationLogin = (state: AppState) => state.authenticationLogin

export default AuthenticationLoginSlice.reducer