import { CheckmarkIconSvg } from '../svg/checkmark-icon-svg'
import { QuestionMarkIconSvg } from '../svg/question-mark-icon-svg'
import { WarningSignIconSvg } from '../svg/warning-sign-icon-svg'
import { XIconSvg } from '../svg/x-icon-svg'
import { CalloutSeverity, CalloutVariant } from './callout'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface CalloutIconProps {
  severity: CalloutSeverity
  variant: CalloutVariant
}

export const CalloutIcon: FunctionComponent<CalloutIconProps> = ({ severity, variant }) => {
  if (severity === CalloutSeverity.INFO) {
    return (
      <div
        className={clsx(
          'flex',
          'justify-center',
          'items-center',
          'w-6',
          'h-6',
          variant === CalloutVariant.SOLID ? 'text-purple-500' : 'text-purple-100'
        )}
      >
        <QuestionMarkIconSvg width={20} height={20} />
      </div>
    )
  }
  if (severity === CalloutSeverity.ERROR) {
    return (
      <div className={clsx('flex', 'justify-center', 'items-center', 'w-6', 'h-6', 'text-red-500')}>
        <XIconSvg width={11} height={11} />
      </div>
    )
  }
  if (severity === CalloutSeverity.SUCCESS) {
    return (
      <div className={clsx('flex', 'justify-center', 'items-center', 'w-6', 'h-6', 'text-green-500')}>
        <CheckmarkIconSvg width={13} height={10} />
      </div>
    )
  }
  if (severity === CalloutSeverity.WARNING) {
    return (
      <div
        className={clsx(
          'flex',
          'justify-center',
          'items-center',
          'w-6',
          'h-6',
          variant === CalloutVariant.SOLID ? 'text-yellow-700' : 'text-yellow-500'
        )}
      >
        <WarningSignIconSvg width={20} height={20} />
      </div>
    )
  }
  return null
}
