import { XIconSvg } from '@echo/ui/components/base/svg/x-icon-svg'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  onRemove?: () => unknown
}

export const ItemThumbnailSelector: FunctionComponent<Props> = ({ onRemove }) => {
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
        'w-4',
        'h-4',
        'rounded-full',
        'bg-red-500'
      )}
      onClick={onRemove}
    >
      <span className={clsx('text-white')}>
        <XIconSvg width={7} height={7} />
      </span>
    </button>
  )
}
