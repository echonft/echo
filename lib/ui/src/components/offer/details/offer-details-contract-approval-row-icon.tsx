import { CheckmarkIconSvg } from '@echo/ui/components/base/svg/checkmark-icon-svg'
import { XIconSvg } from '@echo/ui/components/base/svg/x-icon-svg'
import { theme } from '@echo/ui/helpers/theme/theme'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'
import { RotatingLines } from 'react-loader-spinner'

interface Props {
  approved?: boolean
}

export const OfferDetailsContractApprovalRowIcon: FunctionComponent<Props> = ({ approved }) => {
  if (isNil(approved)) {
    return (
      <div className={clsx('flex', 'justify-center', 'items-center', 'w-6', 'h-6', 'text-purple-500')}>
        <RotatingLines
          strokeColor={theme.colors.yellow['500']}
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible={true}
        />
      </div>
    )
  }
  if (approved) {
    return (
      <div className={clsx('flex', 'justify-center', 'items-center', 'w-6', 'h-6', 'text-green-500')}>
        <CheckmarkIconSvg width={20} />
      </div>
    )
  }
  return (
    <div className={clsx('flex', 'justify-center', 'items-center', 'w-6', 'h-6', 'text-red-500')}>
      <XIconSvg width={20} />
    </div>
  )
}
