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
} from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { IconApple, IconChevronRight, IconCircleOff, IconGauge, IconHome2 } from '@tabler/icons';
import board from '../pages/board'
import Link from 'next/link';

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
      <div>
        {children}
      </div>
    </AppShell>
  );
}

export default ApplicationContainer;