import React from 'react';
import { render } from '@testing-library/react';
import UserTable from './userTable';

jest.mock("../../../hooks/useCustomData", () => ({
  __esModule: true,
  default: jest.fn(() => ({ users: [] })),
}));

describe('UserTable Component', () => {
  test('renders table headers correctly', () => {
    const { getByText } = render(<UserTable />);
    expect(getByText('No')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Username')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Address')).toBeInTheDocument();
  });

  test('displays "No User data...." when no users are available', () => {
    const { getByText } = render(<UserTable />);
    expect(getByText('No User data....')).toBeInTheDocument();
  });

  // Add more test cases for other functionalities as needed
});
