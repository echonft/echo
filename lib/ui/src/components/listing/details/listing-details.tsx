'use client'
import type { CancelListingArgs } from '@echo/api/types/fetchers/cancel-listing-args'
import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import type { ItemRequest } from '@echo/api/types/requests/item-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { listingContext } from '@echo/model/sentry/contexts/listing-context'
import { type AuthUser } from '@echo/model/types/auth-user'
import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { EmptyViewContent } from '@echo/ui/components/base/navigation/empty-view-content'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { ListingDetailsItemsContainerLayout } from '@echo/ui/components/listing/details/layout/listing-details-items-container-layout'
import { ListingDetailsItemsLayout } from '@echo/ui/components/listing/details/layout/listing-details-items-layout'
import { ListingDetailsLayout } from '@echo/ui/components/listing/details/layout/listing-details-layout'
import { ListingDetailsTargetsContainerLayout } from '@echo/ui/components/listing/details/layout/listing-details-targets-container-layout'
import { ListingDetailsUserNftsOrOffersLayout } from '@echo/ui/components/listing/details/layout/listing-details-user-nfts-or-offers-layout'
import { ListingDetailsUserStateLayout } from '@echo/ui/components/listing/details/layout/listing-details-user-state-layout'
import { ListingDetailsButtonsContainer } from '@echo/ui/components/listing/details/listing-details-buttons-container'
import { ListingDetailsItemsContainer } from '@echo/ui/components/listing/details/listing-details-items-container'
import { ListingDetailsState } from '@echo/ui/components/listing/details/listing-details-state'
import { ListingDetailsTargetCollectionOrOfferTitle } from '@echo/ui/components/listing/details/listing-details-target-collection-or-offer-title'
import { ListingDetailsTargetContainer } from '@echo/ui/components/listing/details/listing-details-target-container'
import { SelectableNftCardsContainer } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-cards-container'
import { OfferCardsContainer } from '@echo/ui/components/offer/card/layout/offer-cards-container'
import { CreateOfferConfirmedModal } from '@echo/ui/components/offer/create/confirmed/create-offer-confirmed-modal'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { classes } from '@echo/ui/helpers/classes'
import { enable } from '@echo/ui/helpers/disableable/enable'
import { isListingRoleCreator } from '@echo/ui/helpers/listing/is-listing-role-creator'
import { isListingRoleTarget } from '@echo/ui/helpers/listing/is-listing-role-target'
import { disableAction } from '@echo/ui/helpers/nft/disable-action'
import { setSelectableNftActionDisabledPropFromAuthUser } from '@echo/ui/helpers/nft/set-selectable-nft-action-disabled-prop-from-auth-user'
import { setSelectableNftDisabledPropFromOwner } from '@echo/ui/helpers/nft/set-selectable-nft-disabled-prop-from-owner'
import { getSelectionCount } from '@echo/ui/helpers/selectable/get-selection-count'
import { toggleSelectionInList } from '@echo/ui/helpers/selectable/toggle-selection-in-list'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { mapItemsToRequests } from '@echo/ui/mappers/to-api/map-items-to-requests'
import { mapNftToItem } from '@echo/ui/mappers/to-api/map-nft-to-item'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { assoc, filter, head, isEmpty, isNil, length, lte, map, mergeLeft, pipe, prop, propEq } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  listing: ListingWithRole
  user: Nullable<AuthUser>
  userTargetNfts: Nft[]
  offers: Offer[]
}

export const ListingDetails: FunctionComponent<Props> = ({ listing, user, userTargetNfts, offers }) => {
  const t = useTranslations('listing.details')
  const tError = useTranslations('error.listing')
  const { cancelListing, createOffer } = useDependencies()
  const [selectableNfts, setSelectableNfts] = useState(
    map<Nft, SelectableNft>(assoc('actionDisabled', true), userTargetNfts)
  )
  const [updatedListing, setUpdatedListing] = useState(listing)
  const [createdOffer, setCreatedOffer] = useState<Offer>()
  const { trigger: triggerCancel, isMutating: cancelIsMutating } = useSWRTrigger<ListingResponse, CancelListingArgs>({
    key: SWRKeys.listing.cancel(updatedListing),
    fetcher: cancelListing,
    onSuccess: (response) => {
      setUpdatedListing(mergeLeft({ ...response.listing }))
    },
    onError: {
      contexts: listingContext(updatedListing),
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('cancel') }
    }
  })

  const { trigger: triggerFill, isMutating: fillIsMutating } = useSWRTrigger<OfferResponse, CreateOfferRequest>({
    key: SWRKeys.offer.create,
    fetcher: createOffer,
    onSuccess: (response) => {
      setCreatedOffer(response.offer)
      resetNftSelection()
    },
    onError: {
      contexts: listingContext(updatedListing),
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
  const { creator, items, targets } = updatedListing
  // We only allow 1 target per listing atm
  const target = head(targets)!
  // We allow user to select more NFTs than the target amount if wanted
  const hasSelectedEnoughNfts = pipe<[SelectableNft[]], SelectableNft[], number, boolean>(
    filter(pipe(prop('selected'), Boolean)),
    length,
    lte(target.amount)
  )(selectableNfts)
  const isCreator = isListingRoleCreator(updatedListing)
  const isTarget = isListingRoleTarget(updatedListing)
  const isMutating = cancelIsMutating || fillIsMutating

  function onFill(listing: Listing) {
    const senderItems: ItemRequest[] = pipe(
      filter(pipe(prop('selected'), Boolean)),
      map(mapNftToItem),
      mapItemsToRequests
    )(selectableNfts)
    const receiverItems: ItemRequest[] = mapItemsToRequests(listing.items)
    void triggerFill({
      senderItems,
      receiverItems
    })
  }

  return (
    <ListingDetailsLayout>
      <ListingDetailsUserStateLayout role={updatedListing.role}>
        <HideIf condition={isCreator}>
          <UserDetails user={creator} />
        </HideIf>
        <ListingDetailsState listing={updatedListing} />
      </ListingDetailsUserStateLayout>
      <ListingDetailsItemsLayout>
        <ListingDetailsItemsContainerLayout>
          <ListingDetailsItemsContainer items={items} />
        </ListingDetailsItemsContainerLayout>
        <ItemsSeparator />
        <div className={classes('flex', 'flex-col', 'gap-14')}>
          <ListingDetailsTargetsContainerLayout>
            <ListingDetailsTargetContainer target={target} />
          </ListingDetailsTargetsContainerLayout>
          <ShowIf condition={isCreator || !isTarget || updatedListing.readOnly}>
            <ListingDetailsUserNftsOrOffersLayout>
              <ListingDetailsTargetCollectionOrOfferTitle title={t('offers.title')} />
              <ShowIf condition={isEmpty(offers)}>
                <EmptyViewContent message={t('offers.empty')} />
              </ShowIf>
              <ShowIf condition={!isEmpty(offers)}>
                <OfferCardsContainer
                  offers={map<Offer, OfferWithRole>(assoc('role', undefined), offers)}
                  options={{ asLink: true }}
                />
              </ShowIf>
            </ListingDetailsUserNftsOrOffersLayout>
          </ShowIf>
          <HideIf condition={!isTarget || updatedListing.readOnly}>
            <ListingDetailsUserNftsOrOffersLayout>
              <ListingDetailsTargetCollectionOrOfferTitle title={target.collection.name} />
              <SelectableNftCardsContainer
                nfts={selectableNfts}
                onToggleSelection={onNftToggleSelection}
                hideLink={true}
                hideOwner={true}
              />
            </ListingDetailsUserNftsOrOffersLayout>
          </HideIf>
        </div>
      </ListingDetailsItemsLayout>
      <ListingDetailsButtonsContainer
        listing={updatedListing}
        isMutating={isMutating}
        hasSelectedEnoughNfts={hasSelectedEnoughNfts}
        actions={{ onCancel: (listing) => void triggerCancel({ listingId: listing.id }), onFill: onFill }}
      />
      <CreateOfferConfirmedModal
        offer={createdOffer}
        open={!isNil(createdOffer)}
        onClose={() => setCreatedOffer(undefined)}
      />
    </ListingDetailsLayout>
  )
}
