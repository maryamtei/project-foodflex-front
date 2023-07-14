import { useState, ChangeEvent } from 'react';
import { Search } from 'react-feather';
import { useDebounce } from 'react-use';
import { fetchSearchRecipe } from '../../store/reducers/recipes';
import { useAppDispatch } from '../../hooks/redux';

interface SearchProps {
  name: string;
}

function SearchComponent({ name }: SearchProps) {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setValue(newValue);
  }

  useDebounce(
    () => {
      dispatch(fetchSearchRecipe(value));
    },
    400,
    [dispatch, value]
  );
  return (
    <div className="flex max-w-md mx-auto items-center">
      <div className="relative flex items-center w-full h-12 rounded-lg shadow focus-within:shadow-lg transition-all bg-white overflow-hidden ">
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
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
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
