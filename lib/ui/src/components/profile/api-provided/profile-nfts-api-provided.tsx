'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Nft } from '@echo/model/types/nft'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { NewListingDiscardModal } from '@echo/ui/components/listing/new/new-listing-discard-modal'
import { SelectableNftGroupsAndFiltersContainer } from '@echo/ui/components/nft/filters/layout/selectable-nft-groups-and-filters-container'
import { NewOfferDiscardModal } from '@echo/ui/components/offer/new/new-offer-discard-modal'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/navigation/profile-navigation-layout'
import { ProfileNftsEmpty } from '@echo/ui/components/profile/nft/empty/profile-nfts-empty'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { NFT_ACTION_LISTING } from '@echo/ui/constants/nft-actions'
import { NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { useNewListingStore } from '@echo/ui/hooks/use-new-listing-store'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { mapNftToItem } from '@echo/ui/mappers/to-api/map-nft-to-item'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { useTranslations } from 'next-intl'
import { useRouteChangeEvents } from 'nextjs-router-events'
import { assoc, dissoc, map, pipe } from 'ramda'
import { type FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useBeforeunload } from 'react-beforeunload'

interface Props {
  nfts: Nft[]
  user: AuthUser
}

export const ProfileNftsApiProvided: FunctionComponent<Props> = ({ nfts, user }) => {
  const t = useTranslations('profile')
  const { hasNewOfferPending, clearOffer, setSenderItems, openModal: openNewOfferModal } = useNewOfferStore()
  const { hasNewListingPending, openModal: openNewListingModal, setItems, clearListing } = useNewListingStore()
  const [showDiscardOfferModal, setShowDiscardOfferModal] = useState(false)
  const [showDiscardListingModal, setShowDiscardListingModal] = useState(false)

  // Prevent user from navigating away from the page
  const onBeforeRouteChange = useCallback(() => {
    if (hasNewOfferPending) {
      setShowDiscardOfferModal(true)
      return false
    }
    if (hasNewListingPending) {
      setShowDiscardListingModal(true)
      return false
    }
    return true
  }, [hasNewListingPending, hasNewOfferPending])

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange })
  // Prevent navigation (refresh, back, forward) if offer or listing is pending. Doesn't work flawlessly but will do the trick for now.
  useBeforeunload(hasNewOfferPending || hasNewListingPending ? (event) => event.preventDefault() : undefined)

  const discardOffer = () => {
    allowRouteChange()
    clearOffer()
    setShowDiscardOfferModal(false)
  }

  const discardListing = () => {
    allowRouteChange()
    clearListing()
    setShowDiscardListingModal(false)
  }

  const selectableNfts = useMemo(() => {
    if (hasNewOfferPending) {
      return map<Nft, SelectableNft>(assoc('actionDisabled', true), nfts)
    }
    return map<Nft, SelectableNft>(
      pipe<[Nft], SelectableNft, SelectableNft>(assoc('action', NFT_ACTION_LISTING), dissoc('actionDisabled')),
      nfts
    )
  }, [nfts, hasNewOfferPending])

  const onButtonClick = (nfts: SelectableNft[]) => {
    if (hasNewOfferPending) {
      setSenderItems(map(mapNftToItem, nfts))
      openNewOfferModal()
    } else {
      setItems(map(mapNftToItem, nfts))
      openNewListingModal()
    }
  }

  return (
    <>
      <ProfileNavigationLayout activeNavigationItem={NAVIGATION_NFTS}>
        <HideIfEmpty
          checks={selectableNfts}
          render={(selectableNfts) => (
            <SelectableNftGroupsAndFiltersContainer
              nfts={selectableNfts}
              availableFilters={[NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS]}
              btnLabel={t(
                hasNewOfferPending
                  ? 'offerButton.label'
                  : hasNewListingPending
                    ? 'finalizeListingButton.label'
                    : 'listingButton.label'
              )}
              hideOwner={true}
              onButtonClick={onButtonClick}
            />
          )}
        />
        <ShowIfEmpty checks={selectableNfts}>
          <ProfileNftsEmpty user={user} />
        </ShowIfEmpty>
      </ProfileNavigationLayout>
      <NewOfferDiscardModal
        open={showDiscardOfferModal}
        onClose={() => setShowDiscardOfferModal(false)}
        onDiscard={discardOffer}
      />
      <NewListingDiscardModal
        open={showDiscardListingModal}
        onClose={() => setShowDiscardListingModal(false)}
        onDiscard={discardListing}
      />
    </>
  )
}
