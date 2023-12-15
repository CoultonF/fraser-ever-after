import { useEffect, useRef, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { set, useFormContext, useWatch } from 'react-hook-form';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const ComboBox = ({
  options = [
    'None',
    'Gluten Free',
    'Vegan',
    'Vegetarian',
    'Halal',
    'Egg Allergy',
    'Shellfish Allergy',
    'Fish Allergy',
    'Dairy Allergy',
  ],
  name,
}) => {
  const buttonRef = useRef<HTMLInputElement | null>(null);
  const { control, getValues, setValue } = useFormContext();
  const selectedPersonDefaults = getValues(name).split(', ');
  const selectedPersonWatch = useWatch({ control, name });
  const selectedPerson = selectedPersonWatch
    ? selectedPersonWatch.split(', ').filter(v => v.length > 0)
    : selectedPersonDefaults.filter(v => v.length > 0);
  const setSelectedPerson = value => {
    setValue(name, value.filter(v => v.length !== 0).join(', '), { shouldDirty: true });
  };
  // const [selectedPerson, setSelectedPerson] = useState<string[]>(getValues(name).split(', '));

  const allOptions = options
    .concat(selectedPerson)
    .reduce((acc, curr) => (!acc.includes(curr) ? [...acc, curr] : acc), []);

  useEffect(() => {
    if (selectedPersonWatch.includes('None')) {
      setSelectedPerson(['None']);
    }
  }, [selectedPersonWatch]);

  return (
    <Listbox multiple as="div" value={selectedPerson} onChange={setSelectedPerson}>
      <div className="relative">
        <Listbox.Button
          className="text-ellipsis overflow-hidden w-full flex h-8 rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          // displayValue={option => option.join(', ')}
        >
          <span className="block truncate" title={selectedPersonWatch}>
            {selectedPersonWatch}
          </span>
        </Listbox.Button>
        {/* <Listbox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Listbox.Button> */}
        {allOptions.length > 0 && (
          <Listbox.Options className="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {allOptions.map(person => (
              <Listbox.Option
                key={person}
                disabled={person !== 'None' && selectedPerson.includes('None')}
                value={person}
                className={({ active, disabled }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                    disabled && 'opacity-50 cursor-not-allowed',
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{person}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600',
                        )}
                      >
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}

            {!selectedPerson.includes('None') && (
              <div className="flex w-full flex-row gap-x-1 absolute">
                <input
                  title="Create a new tag"
                  placeholder="Specify other..."
                  ref={buttonRef}
                  className={classNames(
                    'flex w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                  )}
                />
                <button
                  type="button"
                  onClick={() => {
                    const value = buttonRef.current?.value.replace(', ', ' ');
                    if (value && !selectedPerson.includes(value)) {
                      setSelectedPerson([...selectedPerson, value]);
                      buttonRef.current.value = '';
                    }
                  }}
                  className="absolute right-1 top-1.5  rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Add Option
                </button>
              </div>
            )}
          </Listbox.Options>
        )}
      </div>
    </Listbox>
  );
};
