import { SwapIconSvg } from '@echo/ui/components/base/svg/swap-icon-svg'
import { DIRECTION_LEFT } from '@echo/ui/constants/direction'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const OfferRowSwapIcon: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-row', 'grow', 'self-stretch', 'items-center', 'justify-center', 'px-4')}>
      <SwapIconSvg direction={DIRECTION_LEFT} />
    </div>
  )
}
