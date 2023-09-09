import { DirectionLeft, DirectionRight } from '../../constants/direction'
import { DirectionOut } from '../../constants/swap-direction'
import { SwapDirection } from '../../types/swap-direction'
import { SideCaretSvg } from '../base/svg/side-caret-svg'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  direction: SwapDirection
  title: string
}

export const SwapDirectionHeader: FunctionComponent<Props> = ({ direction, title }) => {
  const assetsOut = direction === DirectionOut
  return (
    <div className={clsx('flex', 'gap-2', 'items-center')}>
      <span
        className={clsx(
          'w-6',
          'h-6',
          assetsOut ? 'bg-red-500' : 'bg-green-500',
          'rounded-lg',
          'flex',
          'justify-center',
          'items-center',
          'text-dark-500'
        )}
      >
        <SideCaretSvg direction={assetsOut ? DirectionRight : DirectionLeft} />
      </span>
      <span className={clsx('prose-label-lg', 'text-white')}>{title}</span>
    </div>
  )
}
