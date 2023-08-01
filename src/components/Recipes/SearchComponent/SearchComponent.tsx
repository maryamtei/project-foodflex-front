import React, { ChangeEvent } from 'react';
import { Search } from 'react-feather';

interface SearchProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

function SearchComponent({ name, value, onChange }: SearchProps) {
  // Defining the function to call when the value of the input field changes.
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    onChange(newValue);
  }

  return (
    <div className="flex flex-1 items-center">
      <div className="relative flex items-center w-full h-12 rounded-lg shadow-md focus-within:shadow-lg transition-all bg-white overflow-hidden ">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <Search
            className="h-6 w-6"
            fill="none"
            stroke="#9AA3B0"
            strokeWidth="2"
            color="red"
          />
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-bgff"
          type="text"
          id="search"
          placeholder="Search something.."
          onChange={handleChange}
          name={name}
          value={value}
        />
      </div>
    </div>
  );
}

export default SearchComponent;
