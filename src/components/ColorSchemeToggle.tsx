import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group align='center' position="center">
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        radius="xl"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
        })}
      >
        {colorScheme === 'dark' ? (
          <IconSun size={22} stroke={1.5} />
        ) : (
          <IconMoonStars size={22} stroke={1.5} />
        )}
      </ActionIcon>
    </Group>
  );
}
