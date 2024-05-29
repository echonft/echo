import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  selected?: boolean
}

const SelectedIcon: FunctionComponent<Props> = ({ selected }) => {
  if (selected) {
    return <span className={clsx('w-4', 'h-4', 'bg-yellow-500', 'rounded')} />
  }
  return null
}

export const NftFilterSelector: FunctionComponent<Props> = ({ selected }) => {
  return (
    <div
      className={clsx(
        'flex',
        'justify-center',
        'items-center',
        'flex-none',
        'w-[1.375rem]',
        'h-[1.375rem]',
        'rounded-lg',
        'border-solid',
        'border',
        'border-yellow-500',
        'bg-transparent'
      )}
    >
      <SelectedIcon selected={selected} />
    </div>
  )
}
