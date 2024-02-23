import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

interface Props {
  count: number
}

export const NftsFiltersButtonCount: FunctionComponent<Props> = ({ count }) => {
  return (
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
  )
}
