import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../../store"

export interface AuthenticationFormState {
  noShadow?: boolean,
  //noPadding?: boolean,
  //noSubmit?: boolean,
  //style?: React.CSSProperties,
  //logincallback: (loggedIn : boolean, userId : string) => void,
  formType: 'register' | 'login',
  modal: boolean,
}

const initialState: AuthenticationFormState = {
  noShadow: false,
  formType: 'register', /// 로그인, 회원가입 모달 창 타입.
  modal: false,         /// 모달 창 켜짐/꺼짐.
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