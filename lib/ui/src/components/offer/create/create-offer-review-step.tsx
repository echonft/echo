import { Expiration } from '@echo/model/constants/expiration'
import type { OwnedNft } from '@echo/model/types/nft'
import type { UserWithWallet } from '@echo/model/types/user'
import { CreateTradeReviewTitle } from '@echo/ui/components/trade/create-trade-review-title'
import { ExpirationSelector } from '@echo/ui/components/trade/expiration-selector/expiration-selector'
import { CreateTradeExpirationLayout } from '@echo/ui/components/trade/layout/create-trade-expiration-layout'
import { CreateTradeReviewStepLayout } from '@echo/ui/components/trade/layout/create-trade-review-step-layout'
import { TradeDetailsItems } from '@echo/ui/components/trade/trade-details-items'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  selectedExpiration: Expiration
  onSelectExpiration?: (selected: Expiration) => void
  loading?: boolean
  sender: UserWithWallet
  senderNftsSelection: OwnedNft[]
  receiver: UserWithWallet
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
          isSender={true}
          isReceiver={false}
        />
      </div>
    </CreateTradeReviewStepLayout>
  )
}
