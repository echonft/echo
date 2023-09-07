import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  selected?: boolean
  onToggleSelection?: (selected: boolean) => unknown
}

export const NftThumbnailSelector: FunctionComponent<Props> = ({ selected, onToggleSelection }) => {
  return (
    <button
      className={clsx(
        'flex',
        'justify-center',
        'items-center',
        'absolute',
        'top-2',
        'right-2',
        'z-10',
        'w-6',
        'h-6',
        'rounded-lg',
        'border-solid',
        'border',
        'border-yellow-500',
        'bg-transparent'
      )}
      onClick={(event) => {
        event.preventDefault()
        onToggleSelection?.(!selected)
      }}
    >
      {selected && <span className={clsx('w-4.5', 'h-4.5', 'bg-yellow-500', 'rounded')} />}
    </button>
  )
}
