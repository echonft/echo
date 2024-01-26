/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import type { CancelListingArgs } from '@echo/api/types/fetchers/cancel-listing-args'
import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import type { OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { LISTING_STATE_EXPIRED } from '@echo/model/constants/listing-states'
import { listingContext } from '@echo/model/sentry/contexts/listing-context'
import { type AuthUser } from '@echo/model/types/auth-user'
import type { Listing } from '@echo/model/types/listing'
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
import { SelectableNftCardsContainer } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-cards-container'
import { OfferCardsContainer } from '@echo/ui/components/offer/card/layout/offer-cards-container'
import { NewOfferConfirmedModal } from '@echo/ui/components/offer/new/new-offer-confirmed-modal'
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
import { mapItemsToRequests } from '@echo/ui/mappers/to-api/map-items-to-requests'
import { mapNftToItem } from '@echo/ui/mappers/to-api/map-nft-to-item'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, filter, head, isNil, length, lte, map, mergeLeft, pipe, prop, propEq } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  listing: ListingWithRole
  fetcher: {
    cancelListing: Fetcher<ListingResponse, CancelListingArgs>
    createOffer: Fetcher<OfferResponse, CreateOfferRequest>
  }
  user: AuthUser
  userTargetNfts: Nft[] | undefined
  offers: OfferWithRole[] | undefined
}

export const ListingDetails: FunctionComponent<Props> = ({
  listing,
  fetcher,
  user,
  userTargetNfts = [],
  offers = []
}) => {
  const tError = useTranslations('error.listing')
  const [selectableNfts, setSelectableNfts] = useState(
    map<Nft, SelectableNft>(assoc('actionDisabled', true), userTargetNfts)
  )
  const [updatedListing, setUpdatedListing] = useState(listing)
  const [createdOffer, setCreatedOffer] = useState<Offer>()
  const { trigger: triggerCancel, isMutating: cancelIsMutating } = useSWRTrigger<ListingResponse, CancelListingArgs>({
    key: SWRKeys.listing.cancel(listing),
    fetcher: fetcher.cancelListing,
    onSuccess: (response) => {
      setUpdatedListing(mergeLeft({ ...response.listing }))
    },
    onError: {
      contexts: listingContext(listing),
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('cancel') }
    }
  })

  const { trigger: triggerFill, isMutating: fillIsMutating } = useSWRTrigger<OfferResponse, CreateOfferRequest>({
    key: SWRKeys.offer.create,
    fetcher: fetcher.createOffer,
    onSuccess: (response) => {
      setCreatedOffer(response.offer)
      resetNftSelection()
    },
    onError: {
      contexts: listingContext(listing),
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('fill') }
    }
  })

  useEffect(() => {
    setUpdatedListing(listing)
  }, [listing])

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

  // Unselect all selected NFTs. Used after offer is created
  const resetNftSelection = () => {
    setSelectableNfts(toggleSelectionInList<SelectableNft>(pipe(prop('selected'), Boolean))(selectableNfts))
  }
  const { state, readOnly, creator, expiresAt, items, targets } = updatedListing
  // We only allow 1 target per listing atm
  const target = head(targets)!
  // We allow user to select more NFTs than the target amount if wanted
  const hasSelectedEnoughNfts = pipe<[SelectableNft[]], SelectableNft[], number, boolean>(
    filter(pipe(prop('selected'), Boolean)),
    length,
    lte(target.amount)
  )(selectableNfts)
  const isCreator = isListingRoleCreator(listing)
  const isMutating = cancelIsMutating || fillIsMutating

  function onFill(listing: Listing) {
    const senderItems: OfferItemRequest[] = pipe(
      filter(pipe(prop('selected'), Boolean)),
      map(mapNftToItem),
      mapItemsToRequests
    )(selectableNfts)
    const receiverItems: OfferItemRequest[] = mapItemsToRequests(listing.items)
    void triggerFill({
      senderItems,
      receiverItems
    })
  }

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
          <HideIf condition={!isCreator}>
            <OfferCardsContainer offers={offers} options={{ asLink: true }} />
          </HideIf>
          <HideIf condition={isCreator || listing.readOnly}>
            <ListingDetailsUserNftsLayout>
              <ListingDetailsTargetCollectionTitle title={target.collection.name} />
              <SelectableNftCardsContainer
                nfts={selectableNfts}
                onToggleSelection={onNftToggleSelection}
                hideLink={true}
                hideOwner={true}
              />
            </ListingDetailsUserNftsLayout>
          </HideIf>
        </div>
      </div>
      <ListingDetailsButtonsContainer
        listing={updatedListing}
        isMutating={isMutating}
        hasSelectedEnoughNfts={hasSelectedEnoughNfts}
        actions={{ onCancel: (listing) => void triggerCancel({ listingId: listing.id }), onFill: onFill }}
      />
      <NewOfferConfirmedModal
        offer={createdOffer}
        open={!isNil(createdOffer)}
        onClose={() => setCreatedOffer(undefined)}
      />
    </div>
  )
}
