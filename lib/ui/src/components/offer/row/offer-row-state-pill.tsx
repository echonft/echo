import { type OfferState } from '@echo/model/types/offer-state'
import { getOfferStateBackgroundColor } from '@echo/ui/helpers/offer/get-offer-state-background-color'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  state: OfferState
  expired?: boolean
}

export const OfferRowStatePill: FunctionComponent<Props> = ({ expired, state }) => {
  const t = useTranslations('offer')
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'px-5',
        'py-2.5',
        'rounded-lg',
        getOfferStateBackgroundColor(state, expired),
        'h-[2.625rem]',
        'w-max',
        'items-center'
      )}
    >
      <span className={clsx('prose-paragraph-sm', 'text-dark-500')}>
        {expired ? t('expired') : t(`state.${state}`)}
      </span>
    </div>
  )
}
