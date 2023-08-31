import { getOfferStateBackgroundColor } from '../../helpers/get-offer-state-background-color'
import { OfferState } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  state: OfferState
}

export const OfferStatePill: FunctionComponent<Props> = ({ state }) => {
  const t = useTranslations('offer.state')
  return (
    <div
      className={clsx(
        'flex',
        'px-4',
        'py-1.5',
        'rounded-lg',
        getOfferStateBackgroundColor(state),
        'h-max',
        'w-max',
        'items-center'
      )}
    >
      <span className={clsx('prose-paragraph-lg', 'text-dark-500')}>{t(state)}</span>
    </div>
  )
}
