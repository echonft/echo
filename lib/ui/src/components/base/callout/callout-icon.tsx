import { CheckmarkIconSvg } from '@echo/ui/components/base/svg/checkmark-icon-svg'
import { QuestionMarkIconSvg } from '@echo/ui/components/base/svg/question-mark-icon-svg'
import { WarningSignIconSvg } from '@echo/ui/components/base/svg/warning-sign-icon-svg'
import { XIconSvg } from '@echo/ui/components/base/svg/x-icon-svg'
import {
  CALLOUT_SEVERITY_ERROR,
  CALLOUT_SEVERITY_INFO,
  CALLOUT_SEVERITY_SUCCESS,
  CALLOUT_SEVERITY_WARNING
} from '@echo/ui/constants/callout-severity'
import { CALLOUT_VARIANT_SOLID } from '@echo/ui/constants/callout-variant'
import type { CalloutSeverity } from '@echo/ui/types/callout-severity'
import type { CalloutVariant } from '@echo/ui/types/callout-variant'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  severity: CalloutSeverity
  variant: CalloutVariant
}

export const CalloutIcon: FunctionComponent<Props> = ({ severity, variant }) => {
  if (severity === CALLOUT_SEVERITY_INFO) {
    return (
      <div
        className={clsx(
          'flex',
          'justify-center',
          'items-center',
          'w-6',
          'h-6',
          variant === CALLOUT_VARIANT_SOLID ? 'text-purple-500' : 'text-purple-100'
        )}
      >
        <QuestionMarkIconSvg width={20} height={20} />
      </div>
    )
  }
  if (severity === CALLOUT_SEVERITY_ERROR) {
    return (
      <div className={clsx('flex', 'justify-center', 'items-center', 'w-6', 'h-6', 'text-red-500')}>
        <XIconSvg width={11} height={11} />
      </div>
    )
  }
  if (severity === CALLOUT_SEVERITY_SUCCESS) {
    return (
      <div className={clsx('flex', 'justify-center', 'items-center', 'w-6', 'h-6', 'text-green-500')}>
        <CheckmarkIconSvg width={13} height={10} />
      </div>
    )
  }
  if (severity === CALLOUT_SEVERITY_WARNING) {
    return (
      <div
        className={clsx(
          'flex',
          'justify-center',
          'items-center',
          'w-6',
          'h-6',
          variant === CALLOUT_VARIANT_SOLID ? 'text-yellow-700' : 'text-yellow-500'
        )}
      >
        <WarningSignIconSvg width={20} height={20} />
      </div>
    )
  }
  return null
}
