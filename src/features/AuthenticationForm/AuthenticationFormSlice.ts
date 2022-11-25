import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../../store"

export interface AuthenticationFormState {
  noShadow?: boolean,
  //noPadding?: boolean,
  //noSubmit?: boolean,
  //style?: React.CSSProperties,
  //logincallback: (loggedIn : boolean, userId : string) => void,
  formType: 'register' | 'login', /// 모달 창 로그인, 회원가입   
  modal: boolean,                 /// 모달 창 켜짐/꺼짐
}

const initialState: AuthenticationFormState = {
  noShadow: false,
  formType: 'register',
  modal: false,
}

export const AuthenticationFormSlice = createSlice({
  name: 'authenticationForm',
  initialState,
  reducers: {
    setAuthenticationFormType: (state, action) => {
      state.formType = action.payload;
    },
    setAuthenticationFormModal: (state, action) => {
      state.modal = action.payload
    },
  }
})

export const { setAuthenticationFormType: setFormType, setAuthenticationFormModal: setFormModal } = AuthenticationFormSlice.actions

export const selectAuthenticationForm = (state: AppState) => state.authenticationForm

export default AuthenticationFormSlice.reducer