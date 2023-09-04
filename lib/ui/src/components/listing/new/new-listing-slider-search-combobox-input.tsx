import { SearchIconSvg } from '../../base/svg/search-icon-svg'
import { SearchableObject } from '@echo/ui-model'
import { Combobox } from '@headlessui/react'
import { clsx } from 'clsx'

interface Props {
  placeholder?: string
  onSearch?: (searchQuery: string) => unknown
}

export const NewListingSliderSearchComboboxInput = <T,>({ placeholder, onSearch }: Props) => (
  <div className={clsx('relative', 'items-center', 'bg-dark-400', 'rounded-lg', 'w-full')}>
    <span className={clsx('text-yellow-500', 'absolute', 'left-2.5', 'top-2')}>
      <SearchIconSvg />
    </span>
    <Combobox.Input
      className={clsx(
        'h-9',
        'pl-9',
        'pr-2.5',
        'w-full',
        'rounded-lg',
        'prose-label-sm-semi',
        'text-white',
        'bg-transparent',
        'placeholder:text-white/50'
      )}
      displayValue={(item: SearchableObject<T>) => item?.label}
      onChange={(event) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onSearch?.(event.target.value)
      }}
      placeholder={placeholder}
    />
  </div>
)
