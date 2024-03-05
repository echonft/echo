import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: SelectableNft
}

export const SelectableNftCardSelector: FunctionComponent<Props> = ({ nft }) => {
  const { disabled, selectionDisabled, selected } = nft
  if (!disabled && !selectionDisabled) {
    if (selected) {
      return (
        <div className={clsx('absolute', 'top-2', 'right-2', 'h-max', 'w-max', 'h-6', 'w-6')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="8" fill="#121212" />
            <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="#EFF427" stroke="#EFF427" />
            <path
              d="M10.1963 16L6 12.2079L7.04908 11.2599L10.1963 14.104L16.9509 8L18 8.94803L10.1963 16Z"
              fill="#121212"
            />
          </svg>
        </div>
      )
    }
    return (
      <div
        className={clsx(
          'absolute',
          'top-2',
          'right-2',
          'h-6',
          'w-6',
          'h-max',
          'w-max',
          'transition-opacity ease-in-out',
          'opacity-0',
          'group-hover:opacity-100'
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="8" fill="#121212" />
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="#EFF427" />
        </svg>
      </div>
    )
  }
  return null
}
