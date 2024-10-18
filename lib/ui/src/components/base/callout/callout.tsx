import { CalloutIcon } from '@echo/ui/components/base/callout/callout-icon'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { CalloutVariant } from '@echo/ui/constants/callout-variant'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent, type MouseEventHandler } from 'react'

export interface CalloutProps {
  severity: CalloutSeverity
  variant?: CalloutVariant
  onClick?: MouseEventHandler
  children: string
}

export const Callout: FunctionComponent<CalloutProps> = ({
  severity,
  variant = CalloutVariant.Solid,
  onClick,
  children
}) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'items-center',
        'py-3',
        'px-3.5',
        'rounded-md',
        'gap-2.5',
        'w-80',
        variant === CalloutVariant.Solid && [
          severity === CalloutSeverity.Info && 'bg-purple-100',
          severity === CalloutSeverity.Warning && 'bg-yellow-100',
          severity === CalloutSeverity.Error && 'bg-red-100',
          severity === CalloutSeverity.Success && 'bg-green-100'
        ],
        variant === CalloutVariant.Outline && [
          'border',
          'border-solid',
          severity === CalloutSeverity.Info && 'border-purple-500',
          severity === CalloutSeverity.Warning && 'border-yellow-500',
          severity === CalloutSeverity.Error && 'border-red-500',
          severity === CalloutSeverity.Success && 'border-green-500'
        ],
        !isNil(onClick) && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <CalloutIcon severity={severity} variant={variant} />
      <p className={clsx('prose-label-sm', variant === CalloutVariant.Solid ? 'text-dark-500' : 'text-purple-100')}>
        {children}
      </p>
    </div>
  )
}
