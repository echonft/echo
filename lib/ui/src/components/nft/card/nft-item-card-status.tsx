import type { ListingState } from '@echo/model/types/listing-state'
import type { OfferState } from '@echo/model/types/offer-state'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  status: OfferState | ListingState
  expired?: boolean
}

export const NftItemCardStatus: FunctionComponent<Props> = ({ status, expired }) => {
  const t = useTranslations('nft.card.item.state')
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'items-center',
        'max-w-min',
        'rounded-lg',
        'py-0.25',
        'px-1.25',
        'z-10',
        !expired &&
          (status === 'OPEN' ||
            status === 'OFFERS_PENDING' ||
            status === 'PARTIALLY_FULFILLED' ||
            status === 'ACCEPTED') &&
          'bg-yellow-500',
        (status === 'CANCELLED' || status === 'REJECTED' || expired) && 'bg-red-400',
        !expired && (status === 'COMPLETED' || status === 'FULFILLED') && 'bg-green-300'
      )}
    >
      <span className={clsx('font-inter', 'text-[0.625rem]', 'font-medium', 'leading-[220%]', 'text-dark-500')}>
        {expired ? t('EXPIRED') : t(status)}
      </span>
    </div>
  )
}
