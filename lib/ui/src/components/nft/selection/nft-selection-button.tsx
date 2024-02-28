import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type MouseEventHandler } from 'react'

export interface NftSelectionButtonProps {
  label: string
  count: number
  onClick?: MouseEventHandler
}

export const NftSelectionButton: FunctionComponent<NftSelectionButtonProps> = ({ label, count, onClick }) => {
  return (
    <button
      disabled={count === 0}
      onClick={onClick}
      className={classes(
        'btn-gradient',
        'group',
        '!justify-between',
        'w-full',
        'p-2.5',
        'h-[2.875rem]',
        'items-center'
      )}
    >
      <span className={classes('prose-label-sm-semi', 'btn-label-gradient')}>{label}</span>
      <div className={classes('flex', 'items-center', 'justify-center', 'w-6', 'h-6', 'rounded-lg', 'bg-dark-300')}>
        <span
          className={classes(
            'text-[0.9375rem]',
            'font-medium',
            'leading-[155%]',
            'tracking-[0.00938rem]',
            'font-inter',
            'text-white/50'
          )}
        >
          {count}
        </span>
      </div>
    </button>
  )
}
