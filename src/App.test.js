
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Phonebook app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/phonebook/i); 
  expect(titleElement).toBeInTheDocument();
});
