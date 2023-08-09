import { DirectionLeft, DirectionRight } from '../../types/direction'
import { SideCaretSvg } from '../base/svg/side-caret-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  counterparty: boolean
}

export const OfferBottomSliderAssetsTitle: FunctionComponent<Props> = ({ counterparty }) => {
  const t = useTranslations('offer.bottomSlider')
  return (
    <div className={clsx('flex', 'gap-2', 'items-center')}>
      <span
        className={clsx(
          'w-6',
          'h-6',
          counterparty ? 'bg-green-500' : 'bg-red-500',
          'rounded-lg',
          'flex',
          'justify-center',
          'items-center'
        )}
      >
        <SideCaretSvg direction={counterparty ? DirectionRight : DirectionLeft} />
      </span>
      <span className={clsx('prose-label-lg', 'text-white')}>{t(counterparty ? 'assetsIn' : 'assetsOut')}</span>
    </div>
  )
}
