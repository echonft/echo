import { SearchIconSvg } from '../../base/svg/search-icon-svg'
import { SearchableObject } from '@echo/ui-model'
import { Combobox } from '@headlessui/react'
import { clsx } from 'clsx'

export interface NewListingSliderSearchComboboxInputProps {
  placeholder?: string
  onSearch?: (searchQuery: string) => unknown
}

export const NewListingSliderSearchComboboxInput = <T,>({
  placeholder,
  onSearch
}: NewListingSliderSearchComboboxInputProps) => (
  <div className={clsx('flex', 'flex-row', 'gap-2', 'px-2.5', 'items-center', 'bg-dark-400', 'rounded-lg', 'w-full')}>
    <span className={'text-yellow-500'}>
      <SearchIconSvg />
    </span>
    <Combobox.Input
      className={clsx(
        'h-9',
        'w-full',
        'prose-header-sm-semi',
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
