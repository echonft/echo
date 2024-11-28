import { EchoIconSvg } from '@echo/ui/components/base/svg/echo-icon-svg'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const TradeDetailsBottomBarCenterItemsLogo: FunctionComponent = () => {
  return (
    <span className={clsx('text-yellow-500')}>
      <EchoIconSvg width={32} />
    </span>
  )
}
