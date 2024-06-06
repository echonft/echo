import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { CreateOfferExpirationCreateButton } from '@echo/ui/components/offer/create/create-offer-expiration-create-button'
import { CreateOfferExpirationImage } from '@echo/ui/components/offer/create/create-offer-expiration-image'
import { CreateOfferExpirationSelector } from '@echo/ui/components/offer/create/create-offer-expiration-selector'
import { ONE_DAY } from '@echo/ui/constants/expiration'
import type { Expiration } from '@echo/ui/types/expiration'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { head, type NonEmptyArray } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  senderItems: Nft[]
  receiverItems: Nft[]
  onCancel?: VoidFunction
  onComplete?: (offer: Offer) => unknown
  loading?: boolean
}

export const CreateOfferExpiration: FunctionComponent<Props> = ({
  senderItems,
  receiverItems,
  onComplete,
  onCancel,
  loading
}) => {
  const t = useTranslations('offer.create.expiration')
  const [expiration, setExpiration] = useState<Expiration>(ONE_DAY)
  const firstNft = head(senderItems as NonEmptyArray<Nft>)
  return (
    <div className={clsx('flex', 'flex-row', 'gap-16', 'items-center', 'py-36', 'px-12')}>
      <CreateOfferExpirationImage alt={firstNft.tokenId.toString()} src={firstNft.pictureUrl} />
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
              className={clsx('btn-action', 'h-max', 'w-full', 'py-2.5', 'group', loading && 'animate-pulse')}
              onClick={onCancel}
            >
              <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('editBtn')}</span>
            </button>
            <CreateOfferExpirationCreateButton
              receiverItems={receiverItems}
              senderItems={senderItems}
              expiration={expiration}
              onComplete={onComplete}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
