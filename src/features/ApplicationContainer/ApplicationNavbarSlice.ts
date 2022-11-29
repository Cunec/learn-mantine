import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../store";

export interface NavbarState {
  navbarOpened: boolean,
}


const initialState: NavbarState = {
  navbarOpened: false, /// 네비게이션 바가 열렸는지 닫혔는지 확인하는 변수.
}

export const applicationNavbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setNavbar: (state) => {
      state.navbarOpened = !state.navbarOpened
      console.log("navbar ", state.navbarOpened);
    }
  }
})

export const {
  setNavbar: setNavbar
} = applicationNavbarSlice.actions

export const selectNavbar = (state: AppState) => state.navbar.navbarOpened

export default applicationNavbarSlice.reducer