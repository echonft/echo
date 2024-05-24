import type { Nft } from '@echo/model/types/nft'
import { CreateOfferExpirationImage } from '@echo/ui/components/offer/create/create-offer-expiration-image'
import { CreateOfferExpirationSelector } from '@echo/ui/components/offer/create/create-offer-expiration-selector'
import { ONE_DAY } from '@echo/ui/constants/expiration'
import type { Expiration } from '@echo/ui/types/expiration'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { head } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  receiverItems: NonEmptyArray<Nft>
  onCancel?: VoidFunction
  onComplete?: VoidFunction
  loading?: boolean
}

export const CreateOfferExpiration: FunctionComponent<Props> = ({ receiverItems, onComplete, onCancel, loading }) => {
  const t = useTranslations('offer.create.expiration')
  const [expiration, setExpiration] = useState<Expiration>(ONE_DAY)
  const firstNft = head(receiverItems)
  return (
    <div className={clsx('flex', 'flex-row', 'gap-16', 'items-center', 'py-36', 'px-12')}>
      <CreateOfferExpirationImage alt={firstNft.tokenId.toString()} src={firstNft.pictureUrl ?? ''} />
      <div className={clsx('flex', 'flex-col', 'gap-12')}>
        <span className={clsx('prose-display-lg-bold', 'text-white', 'whitespace-pre-line')}>
          {t.rich('title', {
            yellow: (text) => <span className={clsx('text-yellow-500')}>{text}</span>
          })}
        </span>
        <div className={clsx('flex', 'flex-col', 'gap-10')}>
          <span className={clsx('prose-header-sm', 'text-white')}>{t('subtitle')}</span>
          <CreateOfferExpirationSelector selectedExpiration={expiration} onSelect={setExpiration} loading={loading} />
          <div className={clsx('flex', 'flex-col', 'gap-5')}>
            <button
              className={clsx('btn-gradient', 'h-max', 'w-full', 'py-2.5', 'group', loading && 'animate-pulse')}
              disabled={loading}
              onClick={onComplete}
            >
              <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('finalizeBtn')}</span>
            </button>
            <button
              className={clsx('btn-action', 'h-max', 'w-full', 'py-2.5', 'group', loading && 'animate-pulse')}
              disabled={loading}
              onClick={onCancel}
            >
              <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('editBtn')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
