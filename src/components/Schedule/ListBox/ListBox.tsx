import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Check, ChevronsDown } from 'react-feather';

function ListBox({
  value,
  onChange,
}: {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}) {
  return (
    <Listbox
      value={value || null}
      onChange={(newValue) => {
        onChange(newValue || undefined);
      }}
    >
      <div className="relative flex ">
        <Listbox.Button className="w-24 cursor-default rounded-lg bg-white py-2 pl-3 pr-12  text-2xl sm:text-4xl font-bold grid items-center justify-start text-titleff ">
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-left">
            <ChevronsDown
              className="h-5 w-5 text-titleff "
              aria-hidden="true"
            />
          </span>
          {value}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-10 absolute top-12 mt-1 max-h-60 w-24 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm sm:text-md">
            {Array.from({ length: 52 }).map((_, index) => (
              <Listbox.Option
                // eslint-disable-next-line react/no-array-index-key
                key={index + 1}
                className={({ active }) =>
                  `relative font-bold text-center cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-titleff text-bgff' : 'text-titleff'
                  }`
                }
                value={index + 1}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {index + 1}
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

export default ListBox;
