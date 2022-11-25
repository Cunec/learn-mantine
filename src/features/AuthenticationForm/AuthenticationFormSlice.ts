import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../../store"

export interface AuthenticationFormState {
  noShadow?: boolean,
  //noPadding?: boolean,
  //noSubmit?: boolean,
  //style?: React.CSSProperties,
  formType: 'register' | 'login',
  //logincallback: (loggedIn : boolean, userId : string) => void,
}

const initialState: AuthenticationFormState = {
  noShadow: false,
  formType: 'register',
}

export const AuthenticationFormSlice = createSlice({
  name: 'authenticationForm',
  initialState,
  reducers: {
    setAuthenticationForm: (state, action) => {
      state.formType = action.payload
    }
  }
})

export const { setAuthenticationForm: setAuthenticationForm } = AuthenticationFormSlice.actions

export const selectAuthenticationForm = (state: AppState) => state.authenticationForm

export default AuthenticationFormSlice.reducer