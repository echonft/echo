import { XIconSvg } from '@echo/ui/components/base/svg/x-icon-svg'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  className?: string
  onClick?: MouseEventHandler
}

export const CollectionSearchComboboxInputClearButton: FunctionComponent<Props> = ({ className, onClick }) => {
  return (
    <button className={classes('flex', 'justify-center', 'items-center', 'w-8', 'h-8', className)} onClick={onClick}>
      <span
        className={classes(
          'flex',
          'justify-center',
          'items-center',
          'w-5',
          'h-5',
          'rounded-full',
          'border-solid',
          'border-2',
          'border-yellow-500',
          'text-yellow-500'
        )}
      >
        <XIconSvg width={10} height={10} />
      </span>
    </button>
  )
}
