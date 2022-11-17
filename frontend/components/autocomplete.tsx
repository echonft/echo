import { Combobox, Transition } from '@headlessui/react'
import { SearchableObject } from '@lib/view-models/object'
import { isEmpty, isNil } from 'ramda'
import React, { ReactNode } from 'react'

interface Props<T> {
  placeholder: string
  searchQuery?: string
  options?: SearchableObject<T>[]
  selectedOption?: SearchableObject<T>
  onSearch?: (searchQuery: string) => void
  onSelected?: (selected: SearchableObject<T>) => void
  renderLoading?: () => ReactNode
  renderNewOption?: (query: string) => ReactNode
  name?: string
}

export const Autocomplete = <T extends unknown>({
  placeholder,
  searchQuery,
  options,
  selectedOption,
  onSearch,
  onSelected,
  renderLoading,
  renderNewOption,
  name
}: Props<T>) => {
  return (
    <Combobox value={selectedOption} onChange={onSelected} name={name}>
      <Combobox.Input
        onChange={(event) => onSearch?.(event.target.value)}
        displayValue={(item: SearchableObject<T>) => item?.label}
        className={'focus:ring-white/[0.32] text-sm font-normal text-black focus:outline-none focus:ring-1'}
        placeholder={placeholder}
      />
      <Transition
        enter={'transition ease-in duration-100'}
        enterFrom={'opacity-0'}
        enterTo={'opacity-100'}
        leave={'transition ease-in duration-100'}
        leaveFrom={'opacity-100'}
        leaveTo={'opacity-0'}
      >
        <Combobox.Options className={'options w-96'}>
          {isNil(options)
            ? renderLoading?.()
            : isEmpty(options)
            ? searchQuery && renderNewOption?.(searchQuery)
            : options.map((item) => (
                <Combobox.Option key={`${item.id}-${item.label}`} value={item} className={'option'}>
                  {item.label}
                </Combobox.Option>
              ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  )
}
