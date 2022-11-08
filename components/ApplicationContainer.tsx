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
} from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle';

type LayoutProps = {
  children: React.ReactNode;
};

export const ApplicationContainer = ({children}: LayoutProps) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Text>
            Application navbar
          </Text>
          {/* <Button style={{marginTop: '5px'}}>Test1</Button>
          <Button style={{marginTop: '5px'}}>Test2</Button>
          <Button style={{marginTop: '5px'}}>Test3</Button> */}
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
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
              Application header
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Button variant="outline" color="gray" radius="xl">
              Sign Up
            </Button>
            <Button color="gray" radius="xl">
              Log In
            </Button>
            <ColorSchemeToggle />
          </div>
        </Header>
      }
    >
      <Text>
        {children}
      </Text>
    </AppShell>
  );
}

export default ApplicationContainer;