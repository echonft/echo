'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Nft } from '@echo/model/types/nft'
import { CreateListingDiscardModal } from '@echo/ui/components/listing/create/discard/create-listing-discard-modal'
import { SelectableNftGroupsAndFiltersContainer } from '@echo/ui/components/nft/filters/layout/selectable-nft-groups-and-filters-container'
import { CreateOfferDiscardModal } from '@echo/ui/components/offer/create/discard/create-offer-discard-modal'
import { NFT_ACTION_LISTING } from '@echo/ui/constants/nft-actions'
import { NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { useNewListingStore } from '@echo/ui/hooks/use-new-listing-store'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { mapNftToItem } from '@echo/ui/mappers/to-api/map-nft-to-item'
import { ProfileNftsEmpty } from '@echo/ui/pages/profile/nfts/profile-nfts-empty'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { useTranslations } from 'next-intl'
import { useRouteChangeEvents } from 'nextjs-router-events'
import { assoc, dissoc, isEmpty, map, pipe } from 'ramda'
import { type FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useBeforeunload } from 'react-beforeunload'

interface Props {
  nfts: Nft[]
  user: AuthUser
}

export const ProfileNfts: FunctionComponent<Props> = ({ nfts, user }) => {
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

  if (isEmpty(nfts)) {
    return <ProfileNftsEmpty user={user} />
  }
  return (
    <>
      <SelectableNftGroupsAndFiltersContainer
        nfts={selectableNfts}
        availableFilters={[NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS]}
        btnLabel={t(
          hasNewOfferPending ? 'offerButton' : hasNewListingPending ? 'listingButton.finalize' : 'listingButton.create'
        )}
        hideOwner={true}
        onButtonClick={onButtonClick}
      />
      <CreateOfferDiscardModal
        open={showDiscardOfferModal}
        onClose={() => setShowDiscardOfferModal(false)}
        onDiscard={discardOffer}
      />
      <CreateListingDiscardModal
        open={showDiscardListingModal}
        onClose={() => setShowDiscardListingModal(false)}
        onDiscard={discardListing}
      />
    </>
  )
}
