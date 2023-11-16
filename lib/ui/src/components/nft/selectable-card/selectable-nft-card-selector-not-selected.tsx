import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  onToggleSelection?: (selected: boolean) => unknown
}

export const SelectableNftCardSelectorNotSelected: FunctionComponent<Props> = ({ onToggleSelection }) => {
  return (
    <button
      className={clsx('h-6', 'w-6')}
      onClick={() => {
        onToggleSelection?.(true)
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="8" fill="#121212" />
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="#EFF427" />
      </svg>
    </button>
  )
}
