import { Flex, TextInput } from '@mantine/core';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <Flex
      h={60}
      justify="center"
      align="center"
      direction="column"
    >
      <TextInput
        w="100%"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.currentTarget.value)}
      />
    </Flex>
  )
}

