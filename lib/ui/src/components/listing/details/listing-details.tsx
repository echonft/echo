'use client'
import type { CancelListingArgs } from '@echo/api/types/fetchers/cancel-listing-args'
import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { LISTING_STATE_EXPIRED } from '@echo/model/constants/listing-states'
import { listingContext } from '@echo/model/sentry/contexts/listing-context'
import { type AuthUser } from '@echo/model/types/auth-user'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ListingDetailsButtonsContainer } from '@echo/ui/components/listing/details/listing-details-buttons-container'
import { ListingDetailsItemsContainer } from '@echo/ui/components/listing/details/listing-details-items-container'
import { ListingDetailsState } from '@echo/ui/components/listing/details/listing-details-state'
import { ListingDetailsTargetCollectionTitle } from '@echo/ui/components/listing/details/listing-details-target-collection-title'
import { ListingDetailsTargetContainer } from '@echo/ui/components/listing/details/listing-details-target-container'
import { ListingDetailsUserNftsLayout } from '@echo/ui/components/listing/layout/listing-details-user-nfts-layout'
import { SelectableNftsContainer } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-cards-container'
import { ListingOfferUserDetails } from '@echo/ui/components/user/listing-offer/listing-offer-user-details'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { enable } from '@echo/ui/helpers/disableable/enable'
import { isListingRoleCreator } from '@echo/ui/helpers/listing/is-listing-role-creator'
import { disableAction } from '@echo/ui/helpers/nft/disable-action'
import { setSelectableNftActionDisabledPropFromAuthUser } from '@echo/ui/helpers/nft/set-selectable-nft-action-disabled-prop-from-auth-user'
import { setSelectableNftDisabledPropFromOwner } from '@echo/ui/helpers/nft/set-selectable-nft-disabled-prop-from-owner'
import { getSelectionCount } from '@echo/ui/helpers/selection/get-selection-count'
import { toggleSelectionInList } from '@echo/ui/helpers/selection/toggle-selection-in-list'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, head, map, mergeRight, pipe, propEq } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  listing: ListingWithRole
  fetcher: {
    cancelListing: Fetcher<ListingResponse, CancelListingArgs>
    createOffer: Fetcher<OfferResponse, CreateOfferRequest>
  }
  user: AuthUser
  userTargetNfts: Nft[] | undefined
  offers: Offer[] | undefined
}

export const ListingDetails: FunctionComponent<Props> = ({ listing, fetcher, user, userTargetNfts = [] }) => {
  const tError = useTranslations('error.listing')
  const [selectableNfts, setSelectableNfts] = useState(
    map<Nft, SelectableNft>(assoc('actionDisabled', true), userTargetNfts)
  )
  const [updatedListing, setUpdatedListing] = useState(listing)
  const { trigger, isMutating } = useSWRTrigger<ListingResponse, CancelListingArgs>({
    key: SWRKeys.listing.cancel(listing),
    fetcher: fetcher.cancelListing,
    onSuccess: (response) => {
      setUpdatedListing((prevState) => mergeRight({ ...prevState }, response.listing))
    },
    onError: {
      contexts: listingContext(listing),
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('cancel') }
    }
  })

  const onNftToggleSelection = (nft: Nft) => {
    const updatedNfts = toggleSelectionInList<SelectableNft>(propEq(nft.id, 'id'))(selectableNfts)
    const updatedSelectionCount = getSelectionCount(updatedNfts)
    if (updatedSelectionCount === 0) {
      setSelectableNfts(map(pipe(enable, setSelectableNftActionDisabledPropFromAuthUser(user)), updatedNfts))
    } else if (updatedSelectionCount === 1) {
      setSelectableNfts(map(pipe(setSelectableNftDisabledPropFromOwner(nft.owner), disableAction), updatedNfts))
    } else {
      setSelectableNfts(updatedNfts)
    }
  }
  useEffect(() => {
    setUpdatedListing(listing)
  }, [listing])
  const { state, readOnly, creator, expiresAt, items, targets } = updatedListing
  // TODO Validate this behaviour, we only allow 1 target per listing atm right?
  const target = head(targets)!
  // TODO Validate this behaviour, should we allow user to select more than amount or only amount?
  const hasSelectedEnoughNfts = selectableNfts.length >= target.amount
  const isCreator = isListingRoleCreator(listing)

  return (
    <div className={clsx('flex', 'flex-col', 'gap-20', 'p-4')}>
      <div
        className={clsx(
          'flex',
          'flex-row',
          !isCreator && 'justify-between',
          isCreator && 'justify-end',
          'items-center',
          'pb-5'
        )}
      >
        <HideIf condition={isCreator}>
          <ListingOfferUserDetails user={creator} />
        </HideIf>
        <ListingDetailsState expired={state === LISTING_STATE_EXPIRED} readOnly={readOnly} expiresAt={expiresAt} />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-6')}>
        <div className={clsx('pb-16')}>
          <ListingDetailsItemsContainer items={items} />
        </div>
        <ItemsSeparator />
        <div className={clsx('flex', 'flex-col', 'gap-14')}>
          <div className={clsx('flex', isCreator && 'justify-center', !isCreator && 'justify-end')}>
            <ListingDetailsTargetContainer target={target} />
          </div>
          <HideIf condition={isCreator}>
            <ListingDetailsUserNftsLayout>
              <ListingDetailsTargetCollectionTitle title={target.collection.name} />
              <SelectableNftsContainer
                nfts={selectableNfts}
                onToggleSelection={onNftToggleSelection}
                hideLink={true}
                hideOwner={true}
              />
            </ListingDetailsUserNftsLayout>
          </HideIf>
        </div>
      </div>
      {/* TODO Adjust props with all calls */}
      <ListingDetailsButtonsContainer
        listing={listing}
        isMutating={isMutating}
        hasSelectedEnoughNfts={hasSelectedEnoughNfts}
        actions={{ onCancel: (listing) => void trigger({ listingId: listing.id }) }}
      />
    </div>
  )
}
