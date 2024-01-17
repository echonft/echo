import { CalloutIcon } from '@echo/ui/components/layout/callout/callout-icon'
import {
  CALLOUT_SEVERITY_ERROR,
  CALLOUT_SEVERITY_INFO,
  CALLOUT_SEVERITY_SUCCESS,
  CALLOUT_SEVERITY_WARNING
} from '@echo/ui/constants/callout-severity'
import { CALLOUT_VARIANT_OUTLINE, CALLOUT_VARIANT_SOLID } from '@echo/ui/constants/callout-variant'
import type { CalloutSeverity } from '@echo/ui/types/callout-severity'
import type { CalloutVariant } from '@echo/ui/types/callout-variant'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  severity: CalloutSeverity
  variant?: CalloutVariant
  onClick?: MouseEventHandler
  children: string
}

export const Callout: FunctionComponent<Props> = ({ severity, variant = CALLOUT_VARIANT_SOLID, onClick, children }) => {
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
        variant === CALLOUT_VARIANT_SOLID && [
          severity === CALLOUT_SEVERITY_INFO && 'bg-purple-100',
          severity === CALLOUT_SEVERITY_WARNING && 'bg-yellow-100',
          severity === CALLOUT_SEVERITY_ERROR && 'bg-red-100',
          severity === CALLOUT_SEVERITY_SUCCESS && 'bg-green-100'
        ],
        variant === CALLOUT_VARIANT_OUTLINE && [
          'border',
          'border-solid',
          severity === CALLOUT_SEVERITY_INFO && 'border-purple-500',
          severity === CALLOUT_SEVERITY_WARNING && 'border-yellow-500',
          severity === CALLOUT_SEVERITY_ERROR && 'border-red-500',
          severity === CALLOUT_SEVERITY_SUCCESS && 'border-green-500'
        ],
        !isNil(onClick) && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <CalloutIcon severity={severity} variant={variant} />
      <p className={clsx('prose-label-sm', variant === CALLOUT_VARIANT_SOLID ? 'text-dark-500' : 'text-purple-100')}>
        {children}
      </p>
    </div>
  )
}
