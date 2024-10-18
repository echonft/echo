import { Color } from '@echo/ui/constants/color'
import type { CardStatusColor } from '@echo/ui/types/card-status-color'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  label: string
  color: CardStatusColor
}

export const CardStatus: FunctionComponent<Props> = ({ label, color }) => {
  return (
    <div
      className={clsx(
        'h-max',
        'w-max',
        'rounded-lg',
        'py-0.25',
        'px-1.25',
        color === Color.Green && 'bg-green-300',
        color === Color.Red && 'bg-red-400',
        color === Color.Yellow && 'bg-yellow-500'
      )}
    >
      <span
        className={clsx(
          'font-inter',
          'text-[0.625rem]',
          'font-medium',
          'leading-[220%]',
          'text-dark-500',
          'select-none'
        )}
      >
        {label}
      </span>
    </div>
  )
}
