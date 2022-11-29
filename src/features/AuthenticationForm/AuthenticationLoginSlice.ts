import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../../store"

export interface AuthenticationLoginState {
  loggedIn: boolean,
  userId: String,
}

const initialState: AuthenticationLoginState = {
  loggedIn: false,  /// 로그인이 되어 있는지 여부.
  userId: "",       /// 로그인 된 사용자 아이디.
}

export const AuthenticationLoginSlice = createSlice({
  name: 'authenticationLogin',
  initialState,
  reducers: {
    setAuthenticationLogin: (state, action) => {
      state.loggedIn = action.payload.loggedIn
      state.userId = action.payload.userId

      console.log("payload ? ", action.payload.loggedIn, action.payload.userId);
    },
  }
})

export const { setAuthenticationLogin: setAuthenticationLogin } = AuthenticationLoginSlice.actions

export const selectAuthenticationLogin = (state: AppState) => state.authenticationLogin

export default AuthenticationLoginSlice.reducer