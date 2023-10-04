import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { DirectionLeft, DirectionRight } from '@echo/ui/constants/direction'
import { DirectionOut } from '@echo/ui/constants/swap-direction'
import type { SwapDirection } from '@echo/ui/types/swap-direction'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  direction: SwapDirection
  title: string
}

export const SwapDirectionHeaderSkeleton: FunctionComponent<Props> = ({ direction, title }) => {
  const assetsOut = direction === DirectionOut
  return (
    <div className={clsx('flex', 'gap-2', 'items-center')}>
      <span
        className={clsx(
          'w-6',
          'h-6',
          'bg-yellow-500',
          'rounded-lg',
          'flex',
          'justify-center',
          'items-center',
          'text-dark-500'
        )}
      >
        <SideCaretSvg direction={assetsOut ? DirectionRight : DirectionLeft} />
      </span>
      <span className={clsx('prose-label-lg', 'text-white', 'w-max')}>{title}</span>
    </div>
  )
}
