import { CalloutIcon } from '@echo/ui/components/layout/callout/callout-icon'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { CalloutVariant } from '@echo/ui/constants/callout-variant'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  severity: CalloutSeverity
  variant?: CalloutVariant
  children: string
}

export const Callout: FunctionComponent<Props> = ({ severity, variant = CalloutVariant.SOLID, children }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'py-3',
        'px-3.5',
        'rounded-md',
        'gap-2.5',
        'w-80',
        variant === CalloutVariant.SOLID && [
          severity === CalloutSeverity.INFO && 'bg-purple-100',
          severity === CalloutSeverity.WARNING && 'bg-yellow-100',
          severity === CalloutSeverity.ERROR && 'bg-red-100',
          severity === CalloutSeverity.SUCCESS && 'bg-green-100'
        ],
        variant === CalloutVariant.OUTLINE && [
          'border',
          'border-solid',
          severity === CalloutSeverity.INFO && 'border-purple-500',
          severity === CalloutSeverity.WARNING && 'border-yellow-500',
          severity === CalloutSeverity.ERROR && 'border-red-500',
          severity === CalloutSeverity.SUCCESS && 'border-green-500'
        ]
      )}
    >
      <CalloutIcon severity={severity} variant={variant} />
      <p className={clsx('prose-label-sm', variant === CalloutVariant.SOLID ? 'text-dark-500' : 'text-purple-100')}>
        {children}
      </p>
    </div>
  )
}
