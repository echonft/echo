import { Expiration } from '@echo/model/constants/expiration'
import type { Nft, OwnedNft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { ExpirationButtonsLayout } from '@echo/ui/components/base/expiration/expiration-buttons-layout'
import { ExpirationImage } from '@echo/ui/components/base/expiration/expiration-image'
import { ExpirationLayout } from '@echo/ui/components/base/expiration/expiration-layout'
import { ExpirationSelector } from '@echo/ui/components/base/expiration/expiration-selector'
import { ExpirationSelectorLayout } from '@echo/ui/components/base/expiration/expiration-selector-layout'
import { ExpirationSublayout } from '@echo/ui/components/base/expiration/expiration-sublayout'
import { ExpirationSubtitle } from '@echo/ui/components/base/expiration/expiration-subtitle'
import { ExpirationTitle } from '@echo/ui/components/base/expiration/expiration-title'
import { CreateOfferExpirationCreateButton } from '@echo/ui/components/offer/create/create-offer-expiration-create-button'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { head, type NonEmptyArray } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  senderItems: NonEmptyArray<OwnedNft>
  receiverItems: NonEmptyArray<OwnedNft>
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
  const [expiration, setExpiration] = useState<Expiration>(Expiration.OneDay)
  const firstNft = head(senderItems as NonEmptyArray<Nft>)
  return (
    <ExpirationLayout>
      <ExpirationImage alt={firstNft.tokenId.toString()} src={firstNft.pictureUrl} />
      <ExpirationSublayout>
        <ExpirationTitle>
          {t.rich('title', {
            yellow: (text) => <span className={clsx('text-yellow-500')}>{text}</span>
          })}
        </ExpirationTitle>
        <ExpirationSelectorLayout>
          <ExpirationSubtitle>{t('subtitle')}</ExpirationSubtitle>
          <ExpirationSelector selectedExpiration={expiration} onSelect={setExpiration} loading={loading} />
          <ExpirationButtonsLayout>
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
          </ExpirationButtonsLayout>
        </ExpirationSelectorLayout>
      </ExpirationSublayout>
    </ExpirationLayout>
  )
}
