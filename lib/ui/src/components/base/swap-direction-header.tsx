import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { DIRECTION_LEFT, DIRECTION_RIGHT } from '@echo/ui/constants/direction'
import { SWAP_DIRECTION_OUT } from '@echo/ui/constants/swap-direction'
import { type SwapDirection } from '@echo/ui/types/swap-direction'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  direction: SwapDirection
  title: string
  disabled?: boolean
}

export const SwapDirectionHeader: FunctionComponent<Props> = ({ direction, title, disabled }) => {
  return (
    <div className={clsx('flex', 'gap-2', 'items-center', disabled && 'opacity-40')}>
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
        <SideCaretSvg direction={direction === SWAP_DIRECTION_OUT ? DIRECTION_LEFT : DIRECTION_RIGHT} />
      </span>
      <span className={clsx('prose-label-lg', 'text-white')}>{title}</span>
    </div>
  )
}
