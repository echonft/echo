import { Expiration } from '@echo/model/constants/expiration'
import { OfferRole } from '@echo/model/constants/offer-role'
import type { OwnedNft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { CreateTradeReviewTitle } from '@echo/ui/components/trade/create/create-trade-review-title'
import { ExpirationSelector } from '@echo/ui/components/trade/create/expiration-selector/expiration-selector'
import { CreateTradeExpirationLayout } from '@echo/ui/components/trade/create/layout/create-trade-expiration-layout'
import { CreateTradeReviewStepLayout } from '@echo/ui/components/trade/create/layout/create-trade-review-step-layout'
import { TradeDetailsItems } from '@echo/ui/components/trade/details/trade-details-items'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  selectedExpiration: Expiration
  onSelectExpiration?: (selected: Expiration) => void
  loading?: boolean
  sender: Offer['sender']
  senderNftsSelection: OwnedNft[]
  receiver: Offer['receiver']
  receiverNftsSelection: OwnedNft[]
}

export const CreateOfferReviewStep: FunctionComponent<Props> = ({
  selectedExpiration,
  onSelectExpiration,
  loading,
  sender,
  senderNftsSelection,
  receiver,
  receiverNftsSelection
}) => {
  const t = useTranslations('offer.create')
  return (
    <CreateTradeReviewStepLayout>
      <CreateTradeExpirationLayout>
        <CreateTradeReviewTitle>{t('reviewTitle')}</CreateTradeReviewTitle>
        <ExpirationSelector
          selectedExpiration={selectedExpiration}
          onSelectExpiration={onSelectExpiration}
          loading={loading}
        />
      </CreateTradeExpirationLayout>
      <div className={clsx('w-full', 'px-32')}>
        <TradeDetailsItems
          sender={sender}
          senderNfts={senderNftsSelection}
          receiver={receiver}
          receiverNfts={receiverNftsSelection}
          role={OfferRole.Sender}
        />
      </div>
    </CreateTradeReviewStepLayout>
  )
}
