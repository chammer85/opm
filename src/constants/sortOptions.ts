export const SORT_ORDERS = {
  ASCENDING: "ascending",
  DESCENDING: "descending",
} as const;

export type SortOrderType = (typeof SORT_ORDERS)[keyof typeof SORT_ORDERS];

export const SORT_OPTIONS = [
  { value: SORT_ORDERS.DESCENDING, label: "Price: High to Low" },
  { value: SORT_ORDERS.ASCENDING, label: "Price: Low to High" },
];
