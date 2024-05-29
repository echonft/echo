'use client'
import type { CancelListingArgs } from '@echo/api/types/fetchers/cancel-listing-args'
import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { DEFAULT_EXPIRATION_TIME } from '@echo/model/constants/default-expiration-time'
import { getListingItemsIndexes } from '@echo/model/helpers/listing/get-listing-items-indexes'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
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
import { OfferCardsContainer } from '@echo/ui/components/offer/card/layout/offer-cards-container'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { isListingRoleCreator } from '@echo/ui/helpers/listing/is-listing-role-creator'
import { isListingRoleTarget } from '@echo/ui/helpers/listing/is-listing-role-target'
import { toggleSelectionInList } from '@echo/ui/helpers/selectable/toggle-selection-in-list'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Selectable } from '@echo/ui/types/selectable'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { assoc, filter, isEmpty, length, lte, map, mergeLeft, pipe, prop } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  listing: ListingWithRole
  user: Nullable<AuthUser>
  userTargetNfts: Nft[]
  offers: Offer[]
}

export const ListingDetails: FunctionComponent<Props> = ({ listing, userTargetNfts, offers }) => {
  const t = useTranslations('listing.details')
  const tError = useTranslations('error.listing')
  const { cancelListing, createOffer } = useDependencies()
  const [selectableNfts, setSelectableNfts] = useState(
    map<Nft, Selectable<Nft>>(assoc('actionDisabled', true), userTargetNfts)
  )
  const [updatedListing, setUpdatedListing] = useState(listing)
  const [, setCreatedOffer] = useState<Offer>()
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onNftToggleSelection = (nft: Nft) => {
    // TODO
  }

  // Unselect all selected NFTs. Used after offer is created
  const resetNftSelection = () => {
    setSelectableNfts(toggleSelectionInList<Selectable<Nft>>(pipe(prop('selected'), Boolean))(selectableNfts))
  }
  const { creator, items, target } = updatedListing
  // We only allow 1 target per listing atm
  // We allow user to select more NFTs than the target amount if wanted
  const hasSelectedEnoughNfts = pipe<[Selectable<Nft>[]], Selectable<Nft>[], number, boolean>(
    filter(pipe(prop('selected'), Boolean)),
    length,
    lte(target.amount)
  )(selectableNfts)
  const isCreator = isListingRoleCreator(updatedListing)
  const isTarget = isListingRoleTarget(updatedListing)
  const isMutating = cancelIsMutating || fillIsMutating

  function onFill(listing: Listing) {
    const senderItems = pipe(filter(pipe(prop('selected'), Boolean)), map(getNftIndex))(selectableNfts)
    const receiverItems = getListingItemsIndexes(listing)
    void triggerFill({
      senderItems,
      receiverItems,
      // FIXME expiration should be set
      expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day').unix()
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
        <div className={clsx('flex', 'flex-col', 'gap-14')}>
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
          {/*FIXME why are these selectable cards?!*/}
          {/*<HideIf condition={!isTarget || updatedListing.readOnly}>*/}
          {/*  <ListingDetailsUserNftsOrOffersLayout>*/}
          {/*    <ListingDetailsTargetCollectionOrOfferTitle title={target.collection.name} />*/}
          {/*    <SelectableNftCards*/}
          {/*      nfts={selectableNfts}*/}
          {/*      onToggleSelection={onNftToggleSelection}*/}
          {/*      options={{*/}
          {/*        owner: {*/}
          {/*          hide: true*/}
          {/*        }*/}
          {/*      }}*/}
          {/*      hideLink={true}*/}
          {/*      hideOwner={true}*/}
          {/*    />*/}
          {/*  </ListingDetailsUserNftsOrOffersLayout>*/}
          {/*</HideIf>*/}
        </div>
      </ListingDetailsItemsLayout>
      <ListingDetailsButtonsContainer
        listing={updatedListing}
        isMutating={isMutating}
        hasSelectedEnoughNfts={hasSelectedEnoughNfts}
        actions={{ onCancel: (listing) => void triggerCancel({ slug: listing.slug }), onFill: onFill }}
      />
    </ListingDetailsLayout>
  )
}
