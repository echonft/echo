import { SearchIconSvg } from '../../base/svg/search-icon-svg'
import { Combobox } from '@headlessui/react'
import { clsx } from 'clsx'
import { forwardRef, ForwardRefRenderFunction } from 'react'

interface Props {
  placeholder?: string
  onSearch?: (searchQuery: string) => unknown
}

const Component: ForwardRefRenderFunction<HTMLButtonElement, Props> = ({ placeholder, onSearch }, ref) => (
  <Combobox.Button
    as={'div'}
    className={clsx('relative', 'items-center', 'bg-dark-400', 'rounded-lg', 'w-full')}
    ref={ref}
  >
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
      onChange={(event) => onSearch?.(event.target.value)}
      placeholder={placeholder}
    />
  </Combobox.Button>
)

export const NewListingSliderSearchComboboxInput = forwardRef(Component)
