import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { Direction } from '@echo/ui/constants/direction'
import { SwapDirection } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  direction: SwapDirection
}

export const CreateOfferSwapDirectionHeader: FunctionComponent<Props> = ({ direction }) => {
  const t = useTranslations('offer.create.assets')
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
        <SideCaretSvg direction={direction === SwapDirection.Out ? Direction.Left : Direction.Right} />
      </span>
      <span className={clsx('prose-label-lg', 'text-white')}>{t(direction)}</span>
    </div>
  )
}
