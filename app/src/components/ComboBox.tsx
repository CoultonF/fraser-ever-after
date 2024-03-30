import { useEffect, useRef, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { useFormContext, useWatch } from 'react-hook-form';
import {autoPlacement, flip, shift, useFloating} from '@floating-ui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export const ComboBox2 = ({
  options = [
    'None',
    'Gluten Free',
    'Vegan',
    'Vegetarian',
  ],
  disabled = false,
  name,
}) => {
  const {refs, floatingStyles, update} = useFloating({
    middleware: [flip(), shift()]
  });
  const buttonRef = useRef<HTMLInputElement | null>(null);
  const { control, getValues, setValue } = useFormContext();
  const selectedPersonDefaults = getValues(name).split(', ');
  const selectedPersonWatch = useWatch({ control, name });
  const optionsRef = useRef<HTMLElement | null>(null);
  const selectedPerson = selectedPersonWatch
    ? selectedPersonWatch.split(', ').filter(v => v.length > 0)
    : selectedPersonDefaults.filter(v => v.length > 0);
  const setSelectedPerson = value => {
    if(value.join(', ').startsWith('None, ')) {
      setValue(name, value.filter(v=>v!=='None').join(', '), { shouldDirty: true });
    }else if (value.join(', ').endsWith(', None')) {
      setValue(name, 'None', { shouldDirty: true });
    }else{
      setValue(name, value.filter(v => v.length !== 0).join(', '), { shouldDirty: true });
    }
  };
  const allOptions = options
    .concat(selectedPerson)
    .reduce((acc:string[], curr:string) => (!acc.includes(curr) ? [...acc, curr] : acc), []);

  return (
    <Listbox multiple as="div" value={selectedPerson} onChange={setSelectedPerson} disabled={disabled}>
      <div className="relative focus:outline-none">
        <Listbox.Button
        ref={refs.setReference}
          className="text-ellipsis focus:outline-none overflow-hidden w-full flex h-8 rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-rosette-300 sm:text-sm sm:leading-6"
        >
          <span className="block truncate" title={selectedPersonWatch}>
            {selectedPersonWatch}
          </span>
        </Listbox.Button>
        {allOptions.length > 0 && (
          <Listbox.Options ref={(el) => {refs.setFloating(el); 
            optionsRef.current = el;
          }} style={floatingStyles} className="divide-y-reverse divide-y-slate-500 overflow-hidden flex flex-col w-full rounded-md  bg-white  text-base shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {allOptions.map((person, index, arr) => (
              <Listbox.Option
                key={person}
                onClick={() => {update()}}
                value={person}
                className={({ selected,active, disabled }) =>
                  classNames(
                    'relative flex cursor-pointer bg-white border  select-none py-2 pl-3 pr-9 hover:bg-rosette-100',
                    disabled && 'opacity-50 cursor-not-allowed',
                    active && 'outline-rosette-300 border-rose-300 border',
                    index === 0 && 'rounded-t-md',
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold' )}>{person}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-rosette-800' : 'text-rosette-600',
                        )}
                      >
                        <svg className="h-5 w-5 stroke-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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

                <div className="flex w-full flex-row gap-x-1 relative focus-within:outline-none  ring-1 ring-opacity-5 ring-black">
                  <input
                    title="Create a new tag"
                    placeholder="Specify other..."
                    ref={buttonRef}
                    onKeyDown={e => {
                      if (e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        buttonRef.current.value += ' ';
                      }
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        const value = buttonRef.current?.value.replace(', ', ' ');
                        if (value && !selectedPerson.includes(value)) {
                          setSelectedPerson([...selectedPerson, value]);
                          buttonRef.current.value = '';
                        }
                      }
                    }}
                    className={classNames(
                       'outline-none focus:ring-0 ring-1 ring-black ring-opacity-5 flex rounded-b-md w-full py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:border-rosette-300 border-slate-200  sm:text-sm sm:leading-6',
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const value = buttonRef.current?.value.replace(', ', ' ');
                      if (value && !selectedPerson.includes(value)) {
                        setSelectedPerson([...selectedPerson, value]);
                        update()
                        buttonRef.current.value = '';
                      }
                    }}
                    className="absolute right-1 top-1.5  rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Add Option
                  </button>
                </div>
          </Listbox.Options>
        )}
      </div>
    </Listbox>
  );
};
