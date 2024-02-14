import { SwapIconSvg } from '@echo/ui/components/base/svg/swap-icon-svg'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

export const ItemsDetailsSeparator: FunctionComponent = () => (
  <div className={classes('flex', 'flex-row', 'gap-7', 'items-center', 'min-w-max')}>
    <div className={classes('flex', 'grow', 'h-0.5', 'bg-white/[0.08]')} />
    {/*  We force the height because we rotate the icon and doesn't use the height properly */}
    <span className={classes('flex', 'flex-row', 'justify-center', 'items-center', 'h-16')}>
      <SwapIconSvg />
    </span>
    <div className={classes('flex', 'grow', 'h-0.5', 'bg-white/[0.08]')} />
  </div>
)
