import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchComponent from '../components/Recipes/SearchComponent/SearchComponent';

describe('SearchComponent', () => {
  it('Should render without crash', async () => {
    render(
      <SearchComponent name="RecipeSearch" value="search" onChange={() => {}} />
    );
  });

  it('Should render search chicken', async () => {
    // Mock the onChange function to capture the value passed to it
    const handleChange = jest.fn();

    render(
      <SearchComponent
        name="RecipeSearch"
        value="search"
        onChange={handleChange}
      />
    );

    // Find the input element by its "id" attribute
    const searchInput = screen.getByTestId('search');

    // Type "chickien" in the input field
    fireEvent.change(searchInput, { target: { value: 'chicken' } });

    // Ensure that the onChange function is called with the correct value "chickien"
    expect(handleChange).toHaveBeenCalledWith('chicken');
  });
});
