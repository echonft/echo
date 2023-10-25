import { CheckmarkIconSvg } from '@echo/ui/components/base/svg/checkmark-icon-svg'
import { QuestionMarkIconSvg } from '@echo/ui/components/base/svg/question-mark-icon-svg'
import { XIconSvg } from '@echo/ui/components/base/svg/x-icon-svg'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  status: 'error' | 'loading' | 'success'
}

export const OfferDetailsAcceptModalIcon: FunctionComponent<Props> = ({ status }) => {
  if (status === 'loading') {
    return (
      <div className={clsx('flex', 'justify-center', 'items-center', 'w-6', 'h-6', 'text-purple-500')}>
        <QuestionMarkIconSvg width={20} height={20} />
      </div>
    )
  }
  if (status === 'success') {
    return (
      <div className={clsx('flex', 'justify-center', 'items-center', 'w-6', 'h-6', 'text-green-500')}>
        <CheckmarkIconSvg width={13} height={10} />
      </div>
    )
  }
  return (
    <div className={clsx('flex', 'justify-center', 'items-center', 'w-6', 'h-6', 'text-red-500')}>
      <XIconSvg width={11} height={11} />
    </div>
  )
}
