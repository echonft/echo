import { SearchIconSvg } from '../../base/svg/search-icon-svg'
import { Combobox } from '@headlessui/react'
import { clsx } from 'clsx'
import { ChangeEvent, FunctionComponent } from 'react'

interface Props {
  onSearchQueryChange?: (searchQuery: string) => unknown
}

export const TraitFilterSearchQuery: FunctionComponent<Props> = ({ onSearchQueryChange }) => {
  return (
    <Combobox
      className={clsx('relative', 'w-full', 'h-max', 'flex', 'flex-row', 'items-center')}
      as={'div'}
      defaultValue={''}
    >
      <SearchIconSvg
        className={clsx('absolute', 'top-[0.4375rem]', 'left-3', 'z-10', 'text-yellow-500')}
        width={16}
        height={16}
      />
      <Combobox.Input
        className={clsx(
          'bg-white/[0.08]',
          'rounded-lg',
          'pl-10',
          'pr-4',
          'py-2',
          'h-max',
          'w-full',
          'prose-label-xs-semi',
          'focus-visible:outline-0',
          'focus-visible:bg-white/50',
          'focus-visible:text-dark-300',
          'focus-visible:placeholder:text-dark-300'
        )}
        onChange={(event: ChangeEvent<HTMLInputElement> & { target: { value: string } }) => {
          onSearchQueryChange?.(event.target.value)
        }}
      />
    </Combobox>
  )
}
