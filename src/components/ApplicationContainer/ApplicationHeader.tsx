import { useEffect, useState } from "react";
import { Burger, Button, Header, MediaQuery, Modal, Text, useMantineTheme } from "@mantine/core";
import { ColorSchemeToggle } from "../ColorSchemeToggle";
import { AuthenticationForm } from "../AuthenticationForm/AuthenticationForm";
import { CheckToken, Logout } from "../../pages/api/AuthenticationService";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectNavbar, setNavbar } from "../../features/ApplicationContainer/ApplicationNavbarSlice";
import { selectAuthenticationForm, setFormModal, setFormType } from "../../features/AuthenticationForm/AuthenticationFormSlice";
import { selectAuthenticationLogin, setAuthenticationLogin } from "../../features/AuthenticationForm/AuthenticationLoginSlice";

export default function ApplicationHeader() {
  const theme = useMantineTheme();

  useEffect(() => {
    async function checkUser() {
      const data = await CheckToken();

      if (data !== "null") {
        dispatch(setAuthenticationLogin({loggedIn: true, userId: data}));
      }
    }
    
    checkUser();
  })

  const logout = () => {
    dispatch(setAuthenticationLogin({loggedIn: false, payload: ""}));
    Logout();
  }

  //
  const dispatch = useAppDispatch()
  const navbarOpened = useAppSelector(selectNavbar)

  const authenticationLogin = useAppSelector(selectAuthenticationLogin)
  const authenticationForm = useAppSelector(selectAuthenticationForm)

  return (
    <>
      <Modal
        opened={authenticationForm.modal}
        onClose={() => dispatch(setFormModal(false))}
        closeOnClickOutside={false} /// 밖을 클릭해도 모달이 닫히지 않는다.
      >
        <AuthenticationForm />
      </Modal>

      <Header height={{ base: 50, md: 50 }} p="md" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={navbarOpened}
            onClick={() => {dispatch(setNavbar())}}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Text>
            Test...
        </Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {authenticationLogin.loggedIn === true && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Text>
                {authenticationLogin.userId}
              </Text>
              <Button
                onClick={() => {logout()}}
                color="gray"
                radius="xl">
                Logout
              </Button>
            </div>
          )}
          <>
          {authenticationLogin.loggedIn === false && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Button
                //component={Link}
                //href="/auth/register"
                // onClick={() => {setAuthenticationFormType('register'); setAuthenticationModalOpened(true);}}
                onClick={() => { dispatch(setFormType('register')); dispatch(setFormModal(true)); }}
                variant="outline"
                color="gray"
                radius="xl">
                Sign Up
              </Button>
              <Button
                //component={Link}
                //href="/auth/login"
                onClick={() => {dispatch(setFormType('login')); dispatch(setFormModal(true));}}
                color="gray"
                radius="xl">
                Log In
              </Button>
            </div>
          )}
          </>
        <ColorSchemeToggle />
      </div>
    </Header>
  </>
  );
}