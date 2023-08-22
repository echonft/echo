import { DirectionUp } from '../../../types/direction'
import { SwapIconSvg } from '../../base/svg/swap-icon-svg'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const OfferDetailsAssetsSeparator: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-row', 'gap-7', 'items-center', 'min-w-max')}>
    <div className={clsx('flex', 'grow', 'h-0.5', 'bg-white/[0.08]')} />
    {/*  We force the height because we rotate the icon and doesn't use the height properly */}
    <span className={clsx('flex', 'flex-row', 'justify-center', 'items-center', 'h-16')}>
      <SwapIconSvg direction={DirectionUp} />
    </span>
    <div className={clsx('flex', 'grow', 'h-0.5', 'bg-white/[0.08]')} />
  </div>
)
