import { SwapIconSvg } from '@echo/ui/components/base/svg/swap-icon-svg'
import { DirectionLeft } from '@echo/ui/constants/direction'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const OfferRowSwapIcon: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-row', 'grow', 'self-stretch', 'items-center', 'justify-center', 'px-4')}>
      <SwapIconSvg direction={DirectionLeft} />
    </div>
  )
}
