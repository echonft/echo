import { Expiration } from '@echo/model/constants/expiration'
import { ListingRole } from '@echo/model/constants/listing-role'
import type { Listing } from '@echo/model/types/listing'
import type { OwnedNft } from '@echo/model/types/nft'
import { ListingDetailsItems } from '@echo/ui/components/listing/details/listing-details-items'
import { CreateTradeReviewTitle } from '@echo/ui/components/trade/create/create-trade-review-title'
import { ExpirationSelector } from '@echo/ui/components/trade/create/expiration-selector/expiration-selector'
import { CreateTradeExpirationLayout } from '@echo/ui/components/trade/create/layout/create-trade-expiration-layout'
import { CreateTradeReviewStepLayout } from '@echo/ui/components/trade/create/layout/create-trade-review-step-layout'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import type { NonEmptyArray } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  creator: Listing['creator']
  items: NonEmptyArray<OwnedNft>
  target: Listing['target']
  selectedExpiration: Expiration
  onSelectExpiration?: (selected: Expiration) => void
  loading?: boolean
}

export const CreateListingReviewStep: FunctionComponent<Props> = ({
  selectedExpiration,
  onSelectExpiration,
  loading,
  creator,
  items,
  target
}) => {
  const t = useTranslations('listing.create')
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
        <ListingDetailsItems creator={creator} nfts={items} target={target} role={ListingRole.Creator} />
      </div>
    </CreateTradeReviewStepLayout>
  )
}
