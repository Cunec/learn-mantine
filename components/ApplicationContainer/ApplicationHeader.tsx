import { useState } from "react";
import { Burger, Button, Header, MediaQuery, Modal, Text, useMantineTheme } from "@mantine/core";
import { ColorSchemeToggle } from "../ColorSchemeToggle";
import { AuthenticationForm } from "../AuthenticationForm/AuthenticationForm";

interface IProps {
  burgerOpenedCallback: (value : boolean) => void
}

export default function ApplicationHeader({ burgerOpenedCallback } : IProps) {
  const theme = useMantineTheme();
  const [burgerOpened, setBurgerOpened] = useState(false);
  const [authenticationModalOpened, setAuthenticationModalOpened] = useState(false);
  const [authenticationFormType, setAuthenticationFormType] = useState<'register' | 'login'>('register');

  return (
    <>
      <Modal
        opened={authenticationModalOpened}
        onClose={() => setAuthenticationModalOpened(false)}
      >
        <AuthenticationForm formtype={authenticationFormType} />
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
        <ColorSchemeToggle />
      </div>
    </Header>
  </>
  );
}