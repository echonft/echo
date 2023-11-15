import { SwapIconSvg } from '@echo/ui/components/base/svg/swap-icon-svg'
import { DIRECTION_UP } from '@echo/ui/constants/direction'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ItemsDetailsSeparator: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-row', 'gap-7', 'items-center', 'min-w-max')}>
    <div className={clsx('flex', 'grow', 'h-0.5', 'bg-white/[0.08]')} />
    {/*  We force the height because we rotate the icon and doesn't use the height properly */}
    <span className={clsx('flex', 'flex-row', 'justify-center', 'items-center', 'h-16')}>
      <SwapIconSvg direction={DIRECTION_UP} />
    </span>
    <div className={clsx('flex', 'grow', 'h-0.5', 'bg-white/[0.08]')} />
  </div>
)
