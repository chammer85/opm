import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

interface SystemThemeColorProps {
  backgroundColor: string;
  textColor: string;
}

/**
 * useSystemThemeColor hook
 * This hook returns the background color and text color based on the user's system theme preference.
 * It uses Mantine's theme and media query hooks to determine the colors.
 * @returns {Object} An object containing backgroundColor and textColor properties.
 */
export function useSystemThemeColor(): SystemThemeColorProps {
  const theme = useMantineTheme();
  const prefersDarkScheme = useMediaQuery('(prefers-color-scheme: dark)');
  const backgroundColor = prefersDarkScheme ? theme.colors.dark[7] : theme.colors.blue[6];
  const textColor = prefersDarkScheme ? theme.colors.dark[0] : theme.colors.dark[9];
  return {
    backgroundColor,
    textColor,
  };
}
