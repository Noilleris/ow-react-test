import { useState } from "react";

type ColumnSort = {
  id: string;
  desc: boolean;
};

type SortingState = ColumnSort[];

const useSorting = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return {
    sorting,
    setSorting,
  };
};

export default useSorting;