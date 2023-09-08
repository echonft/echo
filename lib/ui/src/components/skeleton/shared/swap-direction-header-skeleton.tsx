import { SideCaretSvg } from '../../base/svg/side-caret-svg'
import { DirectionLeft, DirectionOut, DirectionRight, SwapDirection } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

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
          assetsOut ? 'bg-green-500' : 'bg-red-500',
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
