'use client'
import type { CancelListingArgs } from '@echo/api/types/fetchers/cancel-listing-args'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { LISTING_STATE_CANCELLED } from '@echo/model/constants/listing-states'
import { assertListingStateTransition } from '@echo/model/helpers/listing/assert/assert-listing-state-transition'
import { listingContext } from '@echo/model/sentry/contexts/listing-context'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Listing } from '@echo/model/types/listing'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { SwapDirectionHeader } from '@echo/ui/components/base/swap-direction-header'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { CollectionThumbnail } from '@echo/ui/components/collection/thumbnail/collection-thumbnail'
import { ItemsDetailsSeparator } from '@echo/ui/components/item/details/items-details-separator'
import { ListingDetailsState } from '@echo/ui/components/listing/details/listing-details-state'
import { NftCardsContainer } from '@echo/ui/components/nft/card/layout/nft-cards-container'
import { ListingOfferUserDetails } from '@echo/ui/components/user/listing-offer/listing-offer-user-details'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWAP_DIRECTION_IN, SWAP_DIRECTION_OUT } from '@echo/ui/constants/swap-direction'
import { getListingDetailsContainerBackground } from '@echo/ui/helpers/listing/get-listing-details-container-background'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, prop } from 'ramda'
import { type FunctionComponent, useEffect, useMemo, useState } from 'react'

interface Props {
  listing: Listing
  fetcher: {
    cancelListing: Fetcher<ListingResponse, CancelListingArgs>
  }
  user: AuthUser | undefined
}

function canCancel(listing: Listing, user: AuthUser | undefined) {
  if (listing.creator.username !== user?.username) {
    return false
  }
  try {
    assertListingStateTransition(listing, LISTING_STATE_CANCELLED)
    return true
  } catch (e) {
    return false
  }
}

export const ListingDetails: FunctionComponent<Props> = ({ listing, fetcher, user }) => {
  const t = useTranslations('listing.details')
  const tError = useTranslations('error.listing')
  const [updatedListing, setUpdatedListing] = useState(listing)
  const { trigger, isMutating } = useSWRTrigger<ListingResponse, CancelListingArgs>({
    key: SWRKeys.listing.cancel(listing),
    fetcher: fetcher.cancelListing,
    onSuccess: (response) => {
      setUpdatedListing(response.listing)
    },
    onError: {
      contexts: listingContext(listing),
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('cancel') }
    }
  })
  useEffect(() => {
    setUpdatedListing(listing)
  }, [listing])
  const { state, creator, expiresAt, items, targets } = updatedListing
  const nfts = useMemo(() => map(prop('nft'), items), [items])

  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'gap-16',
        'p-4',
        'rounded-lg',
        getListingDetailsContainerBackground(updatedListing),
        'bg-white/[0.05]'
      )}
    >
      <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center')}>
        <ListingOfferUserDetails user={creator} />
        <ListingDetailsState state={state} expiresAt={expiresAt} />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-5')}>
        <div className={clsx('flex', 'flex-col', 'gap-6')}>
          <SwapDirectionHeader direction={SWAP_DIRECTION_OUT} title={t('assets.title.out')} />
          <NftCardsContainer nfts={nfts} alignment={ALIGNMENT_CENTER} />
        </div>
        <div className={clsx('pb-4')}>
          <ItemsDetailsSeparator />
        </div>
        <div className={clsx('flex', 'flex-col', 'gap-6')}>
          <SwapDirectionHeader direction={SWAP_DIRECTION_IN} title={t('assets.title.in')} />
          <CardsLayout alignment={ALIGNMENT_CENTER}>
            {map(
              ({ amount, collection }) => (
                <CollectionThumbnail key={collection.id} collection={collection} count={amount} />
              ),
              targets
            )}
          </CardsLayout>
        </div>
        <ShowIf condition={canCancel(updatedListing, user)}>
          <div className={clsx('flex', 'justify-center', 'items-center', 'pt-10', 'pb-5')}>
            <LongPressButton
              id={updatedListing.id}
              label={t('cancelBtn.label')}
              message={t('cancelBtn.message')}
              loading={isMutating}
              onFinish={() => void trigger({ listingId: updatedListing.id })}
            />
          </div>
        </ShowIf>
      </div>
    </div>
  )
}
