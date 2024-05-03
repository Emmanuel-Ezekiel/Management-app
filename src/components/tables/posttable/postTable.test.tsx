import React from 'react';
import { render } from '@testing-library/react';
import PostTable from './PostTable';

describe('PostTable Component', () => {
  test('renders table headers correctly', () => {
    const { getByText } = render(<PostTable />);
    expect(getByText('Body')).toBeInTheDocument();
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Id')).toBeInTheDocument();
    expect(getByText('Actions')).toBeInTheDocument();
  });

  // Add more test cases for other functionalities as needed
});
