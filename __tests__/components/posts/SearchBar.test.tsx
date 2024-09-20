import SearchBar from '@/components/posts/SearchBar';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Add this before your tests
beforeEach(() => {
  // Reset the mock before each test
  (useRouter as jest.Mock).mockReset();
  // Provide a default implementation
  (useRouter as jest.Mock).mockImplementation(() => ({
    push: jest.fn(),
    // Add any other router methods you use in your component
  }));
});

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

// Mock the router before each test
beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
  });
  
  (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
});

describe('SearchBar component', () => {
  it('should render the search component', () => {
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText('Search blog posts...');
    expect(searchInput).toBeInTheDocument();
  });
});
