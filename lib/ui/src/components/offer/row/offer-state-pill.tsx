import { getOfferStateBackgroundColor } from '../../../helpers/offer/get-offer-state-background-color'
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
        'flex-row',
        'px-5',
        'py-2.5',
        'rounded-lg',
        getOfferStateBackgroundColor(state),
        'h-[2.625rem]',
        'w-max',
        'items-center'
      )}
    >
      <span className={clsx('prose-paragraph-sm', 'text-dark-500')}>{t(state)}</span>
    </div>
  )
}
