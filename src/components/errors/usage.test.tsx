import React from 'react';
import { render, screen } from '@testing-library/react';
import UsageErrorMessage from "./usage";

test('render usage error message', () => {
  render(<UsageErrorMessage message={"test error message"} />);
  const message = screen.getByText(/test error message/i);
  const button = screen.getByText(/Reload Page/i);
  expect(message).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
