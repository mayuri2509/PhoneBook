import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactList from '../components/ContactList';

const mockContacts = [
  { id: 1, name: 'Alice', phone_no: '1234567890', label: 'Friends', isBookmarked: false },
  { id: 2, name: 'Bob', phone_no: '9876543210', label: 'Work', isBookmarked: true },
];

const setup = (overrideProps = {}) => {
  const props = {
    contacts: mockContacts,
    searchQuery: '',
    filterLabel: '',
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    onToggleBookmark: jest.fn(),
    ...overrideProps,
  };

  render(<ContactList {...props} />);
  return props;
};

test('renders all contacts', () => {
  setup();
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('Bob')).toBeInTheDocument();
});

test('filters contacts by label', () => {
  setup({ filterLabel: 'Work' });
  expect(screen.getByText('Bob')).toBeInTheDocument();
  expect(screen.queryByText('Alice')).not.toBeInTheDocument();
});

test('filters contacts by search query', () => {
  setup({ searchQuery: 'ali' });
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.queryByText('Bob')).not.toBeInTheDocument();
});

test('edits a contact and calls onEdit', () => {
  const { onEdit } = setup();

  fireEvent.click(screen.getByTestId('edit-btn-1'));

  const nameInput = screen.getByDisplayValue('Alice');
  fireEvent.change(nameInput, { target: { value: 'Alicia' } });

  fireEvent.click(screen.getByTestId('save-btn-1'));

  expect(onEdit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Alicia' }));
});

test('deletes a contact when delete button is clicked', () => {
  const { onDelete } = setup();

  fireEvent.click(screen.getByTestId('delete-btn-1'));

  expect(onDelete).toHaveBeenCalledWith(1);
});

test('toggles bookmark when bookmark button is clicked', () => {
  const { onToggleBookmark } = setup();

  fireEvent.click(screen.getByTestId('bookmark-btn-2'));

  expect(onToggleBookmark).toHaveBeenCalledWith(2);
});
