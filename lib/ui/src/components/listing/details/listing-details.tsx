'use client'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
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
import { AlignmentCenter } from '@echo/ui/constants/alignment'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { DirectionIn, DirectionOut } from '@echo/ui/constants/swap-direction'
import { getListingDetailsContainerBackground } from '@echo/ui/helpers/listing/get-listing-details-container-background'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { captureException } from '@sentry/nextjs'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, prop } from 'ramda'
import { type FunctionComponent, useMemo, useState } from 'react'
import useSWRMutation from 'swr/mutation'

interface Props {
  listing: Listing
  cancelListingFetcher: (listingId: string, token: string | undefined) => Promise<ListingResponse>
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

export const ListingDetails: FunctionComponent<Props> = ({ listing, cancelListingFetcher, user }) => {
  const t = useTranslations('listing.details')
  const tError = useTranslations('error.listing')
  const { show } = useAlertStore()
  const [updatedListing, setUpdatedListing] = useState(listing)
  const { trigger, isMutating } = useSWRMutation<
    ListingResponse,
    Error,
    string,
    { listingId: string; token: string | undefined }
  >(`cancel-listing-${listing.id}`, (_key, { arg: { listingId, token } }) => cancelListingFetcher(listingId, token), {
    onSuccess: (response) => {
      setUpdatedListing(response.listing)
    },
    onError: (err: Error) => {
      captureException(err, {
        contexts: listingContext(listing)
      })
      show({ severity: CalloutSeverity.ERROR, message: tError('cancel') })
    }
  })
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
              id={updatedListing.id}
              label={t('cancelBtn.label')}
              message={t('cancelBtn.message')}
              disabled={isMutating}
              onFinish={() => void trigger({ listingId: updatedListing.id, token: user?.sessionToken })}
            />
          </div>
        </ShowIf>
      </div>
    </div>
  )
}
