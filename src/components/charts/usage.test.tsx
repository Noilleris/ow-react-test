import React from 'react';
import { render, screen } from '@testing-library/react';
import UsageBarChart from "./usage";

test('check chart placeholder works', () => {
  render(<UsageBarChart data={[]} isLoading={true} />);
  const placeholder = screen.getByTestId("chart-placeholder");
  const table = screen.queryByTestId("chart-container");

  expect(placeholder).toBeInTheDocument();
  expect(table).not.toBeInTheDocument();
});

test('check chart works', () => {
  render(<UsageBarChart data={[]} isLoading={false} />);
  const placeholder = screen.queryByTestId("chart-placeholder");
  const table = screen.getByTestId("chart-container");

  expect(placeholder).not.toBeInTheDocument();
  expect(table).toBeInTheDocument();
});
