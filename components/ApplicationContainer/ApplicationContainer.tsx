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
import { ColorSchemeToggle } from '../ColorSchemeToggle';
import { IconApple, IconChevronRight, IconCircleOff, IconGauge, IconHome2 } from '@tabler/icons';
import { AuthenticationForm } from '../AuthenticationForm/AuthenticationForm';
import Link from 'next/link';
import HeaderRight from './HeaderRight';
import ApplicationHeader from './ApplicationHeader';
import ApplicationFooter from './ApplicationFooter';

type LayoutProps = {
  children: React.ReactNode;
};

export const ApplicationContainer = ({children}: LayoutProps) => {
  const theme = useMantineTheme();
  const [navbarOpened, setNavbarOpened] = useState(false);
  
  const openedCallback = (open : boolean) => {
    setNavbarOpened(open);
  }

  return (
    <>
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="sm" hiddenBreakpoint="sm" hidden={!navbarOpened} width={{ sm: 200, lg: 300 }}>
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
            href="/test"
            label="TestPage"
            icon={<IconApple size={16} stroke={1.5} />} />
          <NavLink label="Disabled" icon={<IconCircleOff size={16} stroke={1.5} />} disabled />
        </Navbar>
      }
      footer={
        <ApplicationFooter />
      }
      header={
        <ApplicationHeader burgerOpenedCallback={openedCallback}/>
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