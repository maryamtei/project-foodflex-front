import { Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronsDown } from 'react-feather';
import { useAppDispatch } from '../../../hooks/redux';

import { Category } from '../../../@types/recipe';
import { fetchRandomRecipes } from '../../../store/reducers/recipes';

const categories = [
  { id: 1, name: 'Beef', unavailable: false },
  { id: 2, name: 'Chicken', unavailable: false },
  { id: 3, name: 'Dessert', unavailable: false },
  { id: 4, name: 'Lamb', unavailable: false },
  { id: 5, name: 'Miscellaneous', unavailable: false },
  { id: 6, name: 'Pasta', unavailable: false },
  { id: 7, name: 'Pork', unavailable: false },
  { id: 8, name: 'Seafood', unavailable: false },
  { id: 9, name: 'Side', unavailable: false },
  { id: 10, name: 'Starter', unavailable: false },
  { id: 11, name: 'Vegan', unavailable: false },
  { id: 12, name: 'Vegetarian', unavailable: false },
  { id: 13, name: 'Breakfast', unavailable: false },
  { id: 14, name: 'Goat', unavailable: false },
];

function CategoriesListBox({
  value,
  onChange,
}: {
  value: Category | undefined;
  onChange: (value: Category | undefined) => void;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (value === undefined) {
      dispatch(fetchRandomRecipes({ count: 10 }));
    }
  }, [value, dispatch]);
  return (
    <Listbox
      value={value}
      onChange={(newValue) => {
        if (newValue.id === value?.id) {
          onChange(undefined);
        } else {
          onChange(newValue);
        }
      }}
    >
      <div className="relative flex ">
        <Listbox.Button className="w-48 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 shadow-md focus:outline-none focus-visible:border-gray-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm grid items-center justify-start text-gray-400 focus-within:shadow-lg">
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-left">
            <ChevronsDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
          {value?.name || 'Choose a Category'}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-10 absolute top-12 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {categories.map((category) => (
              <Listbox.Option
                key={category.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={category}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {category.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default CategoriesListBox;
