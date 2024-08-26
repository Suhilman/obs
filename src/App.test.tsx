import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders User Management System header', () => {
  render(<App />);
  const headerElement = screen.getByText(/User Management System/i);
  expect(headerElement).toBeInTheDocument();
});
