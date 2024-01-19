import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  label: string
}

export const CardSubtitle: FunctionComponent<Props> = ({ label }) => {
  return (
    <p
      className={clsx(
        'font-inter',
        'text-[0.875rem]',
        'font-normal',
        'leading-[0.9375rem]',
        'tracking-[0.0175rem]',
        'text-white/70',
        'truncate'
      )}
    >
      {label}
    </p>
  )
}
