'use client'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { assertListingState } from '@echo/model/helpers/listing/assert/assert-listing-state'
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
import { AlignmentCenter } from '@echo/ui/constants/alignment'
import { DirectionIn, DirectionOut } from '@echo/ui/constants/swap-direction'
import { getListingDetailsContainerBackground } from '@echo/ui/helpers/listing/get-listing-details-container-background'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, prop } from 'ramda'
import { type FunctionComponent, useCallback, useMemo } from 'react'
import useSWRMutation from 'swr/mutation'

interface Props {
  listing: Listing
  getListingFetcher: (listingId: string) => Promise<ListingResponse>
  cancelListingFetcher: (listingId: string, token: string | undefined) => Promise<EmptyResponse>
  user: AuthUser | undefined
}

function canCancel(listing: Listing, user: AuthUser | undefined) {
  if (listing.creator.username !== user?.username) {
    return false
  }
  try {
    assertListingState(listing, 'CANCELLED')
    return true
  } catch (e) {
    return false
  }
}

export const ListingDetails: FunctionComponent<Props> = ({
  listing,
  getListingFetcher,
  cancelListingFetcher,
  user
}) => {
  const t = useTranslations('listing.details')
  const getListing = useCallback(() => {
    return getListingFetcher(listing.id)
  }, [getListingFetcher, listing])
  const cancelListing = useCallback(() => {
    return cancelListingFetcher(listing.id, user?.sessionToken)
  }, [cancelListingFetcher, listing, user])
  const {
    trigger: getListingTrigger,
    isMutating: getMutating,
    data
  } = useSWRMutation<ListingResponse, Error, string>(`get-listing-${listing.id}`, getListing)
  const { trigger: cancelListingTrigger, isMutating: cancelMutating } = useSWRMutation<EmptyResponse, Error, string>(
    `cancel-listing-${listing.id}`,
    cancelListing,
    {
      onSuccess: () => {
        void getListingTrigger()
      }
    }
  )
  const updatedListing = useMemo(() => data?.listing ?? listing, [listing, data])
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
          <SwapDirectionHeader direction={DirectionOut} title={t('assets.title.out')} />
          <NftsContainer nfts={nfts} alignment={AlignmentCenter} />
        </div>
        <div className={clsx('pb-4')}>
          <ItemsDetailsSeparator />
        </div>
        <div className={clsx('flex', 'flex-col', 'gap-6')}>
          <SwapDirectionHeader direction={DirectionIn} title={t('assets.title.in')} />
          <NftsLayout alignment={AlignmentCenter}>
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
              id={listing.id}
              label={t('cancelBtn.label')}
              message={t('cancelBtn.message')}
              disabled={getMutating || cancelMutating}
              onFinish={() => void cancelListingTrigger()}
            />
          </div>
        </ShowIf>
      </div>
    </div>
  )
}
