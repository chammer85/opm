import {useMantineTheme} from '@mantine/core';
import {useMediaQuery} from '@mantine/hooks';

export function useSystemThemeColor() {
  const theme = useMantineTheme();
  const prefersDarkScheme = useMediaQuery('(prefers-color-scheme: dark)');
  const backgroundColor = prefersDarkScheme ? theme.colors.dark[7] : theme.colors.blue[6];
  const textColor = prefersDarkScheme ? theme.colors.dark[0] : theme.colors.dark[9];
  return {
    backgroundColor,
    textColor
  };
}
