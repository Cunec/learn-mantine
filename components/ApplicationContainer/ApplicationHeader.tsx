import { useEffect, useState } from "react";
import { Burger, Button, Header, MediaQuery, Modal, Text, useMantineTheme } from "@mantine/core";
import { ColorSchemeToggle } from "../ColorSchemeToggle";
import { AuthenticationForm } from "../AuthenticationForm/AuthenticationForm";
import { CheckToken, Logout } from "../../pages/api/AuthenticationService";

interface IProps {
  burgerOpenedCallback: (value : boolean) => void
}

export default function ApplicationHeader({ burgerOpenedCallback } : IProps) {
  const theme = useMantineTheme();
  const [burgerOpened, setBurgerOpened] = useState(false);
  const [authenticationModalOpened, setAuthenticationModalOpened] = useState(false);
  const [authenticationFormType, setAuthenticationFormType] = useState<'register' | 'login'>('register');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function checkUser() {
      const data = await CheckToken();

      if (data !== "null") {
        setLoggedIn(true);
        setUserId(data);
      }
    }
    
    checkUser();
  })

  const loginCallback = (loggedIn : boolean, userId : string) => {
    /// 로그인 라벨 띄우기.
    setLoggedIn(loggedIn);
    /// 유저 아이디 세팅.
    setUserId(userId);
    /// 로그인 모달 닫기.
    setAuthenticationModalOpened(false);
  }

  const logout = () => {
    setLoggedIn(false);
    setUserId("");
    Logout();
  }

  return (
    <>
      <Modal
        opened={authenticationModalOpened}
        onClose={() => setAuthenticationModalOpened(false)}
      >
        <AuthenticationForm formtype={authenticationFormType} loginCallback={loginCallback} />
      </Modal>

      <Header height={{ base: 50, md: 50 }} p="md" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={burgerOpened}
            onClick={() => {setBurgerOpened((o) => !o); burgerOpenedCallback(!burgerOpened); }}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Text>
            Test...
        </Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {loggedIn === true && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Text>
                {userId}
              </Text>
              <Button
                onClick={() => {logout()}}
                color="gray"
                radius="xl">
                Logout
              </Button>
            </div>
          )}
          {loggedIn === false && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Button
                //component={Link}
                //href="/auth/register"
                onClick={() => {setAuthenticationFormType('register'); setAuthenticationModalOpened(true);}}
                variant="outline"
                color="gray"
                radius="xl">
                Sign Up
              </Button>
              <Button
                //component={Link}
                //href="/auth/login"
                onClick={() => {setAuthenticationFormType('login'); setAuthenticationModalOpened(true);}}
                color="gray"
                radius="xl">
                Log In
              </Button>
            </div>
          )}
        <ColorSchemeToggle />
      </div>
    </Header>
  </>
  );
}