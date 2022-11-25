import {
  AppShell,
  useMantineTheme,
} from '@mantine/core';
import ApplicationHeader from './ApplicationHeader';
import ApplicationFooter from './ApplicationFooter';
import ApplicationNavbar from './ApplicationNavbar';

type LayoutProps = {
  children: React.ReactNode;
};

export const ApplicationContainer = ({children}: LayoutProps) => {
  const theme = useMantineTheme();

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
        <ApplicationNavbar />
      }
      footer={
        <ApplicationFooter />
      }
      header={
        <ApplicationHeader />
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