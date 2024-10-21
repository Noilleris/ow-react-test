import React from 'react';
import { render, screen } from '@testing-library/react';
import UsageTable from "./Table";

test('check placeholder works', () => {
  render(<UsageTable data={[]} isLoading={true} />);
  const placeholder = screen.getByTestId("skeleton-placeholder");
  const table = screen.queryByTestId("table-container");

  expect(placeholder).toBeInTheDocument();
  expect(table).not.toBeInTheDocument();
});

test('check table works', () => {
  render(<UsageTable data={[]} isLoading={false} />);
  const placeholder = screen.queryByTestId("skeleton-placeholder");
  const table = screen.getByTestId("table-container");

  expect(placeholder).not.toBeInTheDocument();
  expect(table).toBeInTheDocument();
});
