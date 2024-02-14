import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

interface Props {
  label: string
}

export const CardTitle: FunctionComponent<Props> = ({ label }) => {
  return (
    <p
      className={classes(
        'font-inter',
        'text-[0.875rem]',
        'font-medium',
        'leading-[0.9375rem]',
        'tracking-[0.0175rem]',
        'text-white',
        'truncate'
      )}
    >
      {label}
    </p>
  )
}
