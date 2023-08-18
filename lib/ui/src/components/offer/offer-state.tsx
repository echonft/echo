import { OfferState as OfferStateModel } from '../../types/offer-state'
import { offerStateBackgroundColor } from './offer-state-background-color'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface OfferStateProps {
  state: OfferStateModel
}

export const OfferState: FunctionComponent<OfferStateProps> = ({ state }) => {
  const t = useTranslations('offer.state')
  return (
    <div
      className={clsx(
        'flex',
        'px-4',
        'py-1.5',
        'rounded-lg',
        offerStateBackgroundColor(state),
        'h-max',
        'w-max',
        'items-center'
      )}
    >
      <span className={clsx('prose-paragraph-lg', 'text-dark-500')}>{t(state)}</span>
    </div>
  )
}
