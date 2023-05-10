import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailSelectorProps {
  selected?: boolean
  onToggleSelection?: (selected: boolean) => unknown
}

export const NftThumbnailSelector: FunctionComponent<NftThumbnailSelectorProps> = ({ selected, onToggleSelection }) => {
  return (
    <button
      className={clsx(
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
        'p-[3px]',
        'bg-clip-content',
        selected ? 'bg-yellow-500' : 'bg-transparent'
      )}
      onClick={() => {
        onToggleSelection?.(!selected)
      }}
    />
  )
}
