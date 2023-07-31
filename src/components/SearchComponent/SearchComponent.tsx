import { ChangeEvent } from 'react';
import { Search } from 'react-feather';

interface SearchProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

function SearchComponent({ name, value, onChange }: SearchProps) {
  // Définition de la fonction à appeler quand la valeur du champ de saisie change.
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    // Appel de la fonction onChange passée en prop avec la nouvelle valeur.
    onChange(newValue);
  }

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
          className="peer h-full w-full outline-none text-sm text-gray-500 pr-2"
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
