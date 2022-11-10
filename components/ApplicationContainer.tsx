import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  NavLink,
  Modal,
} from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { IconApple, IconChevronRight, IconCircleOff, IconGauge, IconHome2 } from '@tabler/icons';
import Link from 'next/link';
import { AuthenticationForm } from './AuthenticationForm/AuthenticationForm';
import axios from 'axios';

type LayoutProps = {
  children: React.ReactNode;
};

export async function ThatIsCalled() {
  await axios.post(`http://localhost:8080/auth/signin`, {
    "username" : "abc", /// username backend에서 제거 할 것.
    "email" : "a@a.com",
    "password" : "1234567" 
  })
  .then((response) => {
    if (response.data.token) {
      console.log(response.data.token);
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem(`ACCESS_TOKEN`, response.data.token);
      // token이 존재하는 경우 Todo 화면으로 리디렉트
      window.location.href = "/";
    }
  })
}

export const ApplicationContainer = ({children}: LayoutProps) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
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

    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="sm" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <NavLink 
            component={Link}
            href="/"
            label="Home"
            icon={<IconHome2 size={16} stroke={1.5} />} />
          <NavLink
            component={Link}
            href="/board"
            label="Board"
            icon={<IconGauge size={16} stroke={1.5} />}
            rightSection={<IconChevronRight size={12} stroke={1.5} />}
          />
          <NavLink 
            component={Link}
            href="/about"
            label="About"
            icon={<IconApple size={16} stroke={1.5} />} />
          <NavLink 
            component={Link}
            href="/test/login"
            label="LoginTest"
            icon={<IconApple size={16} stroke={1.5} />} />
          <NavLink label="Disabled" icon={<IconCircleOff size={16} stroke={1.5} />} disabled />
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          footer
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 50 }} p="md" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
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
      }
    >
      <div>
        {children}
      </div>
    </AppShell>
    </>
  );
}

export default ApplicationContainer;