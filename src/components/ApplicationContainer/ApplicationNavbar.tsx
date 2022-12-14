import { Navbar, NavLink } from "@mantine/core";
import { IconApple, IconChevronRight, IconCircleOff, IconGauge, IconHome2 } from "@tabler/icons";
import Link from "next/link";
import { selectNavbar } from "../../features/ApplicationContainer/ApplicationNavbarSlice";
import {  useAppSelector } from "../../hooks";

export default function ApplicationNavbar() {
  const navbarOpened = useAppSelector(selectNavbar)

  return (
    <>
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
        icon={<IconApple size={16} stroke={1.5} />} disabled />
      <NavLink 
        component={Link}
        href="/test"
        label="Test"
        icon={<IconApple size={16} stroke={1.5} />} />
      <NavLink label="Disabled" icon={<IconCircleOff size={16} stroke={1.5} />} disabled />
    </Navbar>
    </>
  )
}