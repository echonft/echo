'use client'
import type { CancelListingArgs } from '@echo/api/services/fetcher/cancel-listing'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { LISTING_STATE_CANCELLED } from '@echo/model/constants/listing-states'
import { assertListingState } from '@echo/model/helpers/listing/assert/assert-listing-state'
import { listingContext } from '@echo/model/sentry/contexts/listing-context'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Listing } from '@echo/model/types/listing'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { CollectionThumbnail } from '@echo/ui/components/collection/thumbnail/collection-thumbnail'
import { ItemsDetailsSeparator } from '@echo/ui/components/item/details/items-details-separator'
import { ListingDetailsState } from '@echo/ui/components/listing/details/listing-details-state'
import { NftsContainer } from '@echo/ui/components/nft/layout/nfts-container'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { UserDetailsContainer } from '@echo/ui/components/shared/user-details-container'
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
    assertListingState(listing, LISTING_STATE_CANCELLED)
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
  const { state, creator, expired, expiresAt, items, targets } = updatedListing
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
        <UserDetailsContainer user={creator} />
        <ListingDetailsState state={state} expired={expired} expiresAt={expiresAt} />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-5')}>
        <div className={clsx('flex', 'flex-col', 'gap-6')}>
          <SwapDirectionHeader direction={SWAP_DIRECTION_OUT} title={t('assets.title.out')} />
          <NftsContainer nfts={nfts} alignment={ALIGNMENT_CENTER} />
        </div>
        <div className={clsx('pb-4')}>
          <ItemsDetailsSeparator />
        </div>
        <div className={clsx('flex', 'flex-col', 'gap-6')}>
          <SwapDirectionHeader direction={SWAP_DIRECTION_IN} title={t('assets.title.in')} />
          <NftsLayout alignment={ALIGNMENT_CENTER}>
            {map(
              ({ amount, collection }) => (
                <CollectionThumbnail key={collection.id} collection={collection} count={amount} />
              ),
              targets
            )}
          </NftsLayout>
        </div>
        <ShowIf condition={canCancel(updatedListing, user)}>
          <div className={clsx('flex', 'justify-center', 'items-center', 'pt-10', 'pb-5')}>
            <LongPressButton
              id={updatedListing.id}
              label={t('cancelBtn.label')}
              message={t('cancelBtn.message')}
              loading={isMutating}
              onFinish={() => void trigger({ listingId: updatedListing.id, token: user?.sessionToken })}
            />
          </div>
        </ShowIf>
      </div>
    </div>
  )
}
