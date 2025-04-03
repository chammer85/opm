import { Flex, TextInput } from '@mantine/core';
import { ReactElement } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps): ReactElement {
  return (
    <Flex h={60} justify="center" align="center" direction="column">
      <TextInput
        w="100%"
        placeholder="Search products..."
        onChange={e => onSearch(e.currentTarget.value)}
      />
    </Flex>
  );
}
