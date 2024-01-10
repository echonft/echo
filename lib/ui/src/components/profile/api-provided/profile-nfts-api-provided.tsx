'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Nft } from '@echo/model/types/nft'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { SelectableNftGroupsAndFiltersContainer } from '@echo/ui/components/nft/filters/layout/selectable-nft-groups-and-filters-container'
import { NewOfferDiscardModal } from '@echo/ui/components/offer/new/new-offer-discard-modal'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/layout/profile-navigation-layout'
import { ProfileNftsEmpty } from '@echo/ui/components/profile/nft/empty/profile-nfts-empty'
import { NAVIGATION_ITEMS } from '@echo/ui/constants/navigation-item'
import { NFT_ACTION_LISTING } from '@echo/ui/constants/nft-actions'
import { NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { mapNftToOfferItem } from '@echo/ui/mappers/to-api/map-nft-to-offer-item'
import { messages } from '@echo/ui/messages/en'
import { getTranslator } from '@echo/ui/messages/get-translator'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { NextIntlClientProvider } from 'next-intl'
import { useRouteChangeEvents } from 'nextjs-router-events'
import { assoc, dissoc, map, pipe } from 'ramda'
import { type FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useBeforeunload } from 'react-beforeunload'

interface Props {
  nfts: Nft[]
  user: AuthUser
}

export const ProfileNftsApiProvided: FunctionComponent<Props> = ({ nfts, user }) => {
  const t = getTranslator()
  const { hasNewOfferPending, clearOffer, setSenderItems, openModal } = useNewOfferStore()
  const [showDiscardModal, setShowDiscardModal] = useState(false)
  // Prevent user from navigating away from the page
  const onBeforeRouteChange = useCallback(() => {
    if (hasNewOfferPending()) {
      setShowDiscardModal(true)
      return false
    }
    return true
  }, [])

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange })
  // Prevent navigation (refresh, back, forward) if offer is pending. Doesn't work flawlessly but will do the trick for now.
  useBeforeunload(hasNewOfferPending() ? (event) => event.preventDefault() : undefined)

  const discardOffer = () => {
    allowRouteChange()
    clearOffer()
    setShowDiscardModal(false)
  }

  const selectableNfts = useMemo(() => {
    if (hasNewOfferPending()) {
      return map<Nft, SelectableNft>(assoc('actionDisabled', true), nfts)
    }
    return map<Nft, SelectableNft>(
      pipe<[Nft], SelectableNft, SelectableNft>(assoc('action', NFT_ACTION_LISTING), dissoc('actionDisabled')),
      nfts
    )
  }, [nfts, hasNewOfferPending])

  const onButtonClick = (nfts: SelectableNft[]) => {
    if (hasNewOfferPending()) {
      setSenderItems(map(mapNftToOfferItem, nfts))
      openModal()
    }
    // TODO Else listing
  }

  return (
    <>
      <ProfileNavigationLayout activeNavigationItem={NAVIGATION_ITEMS} user={user}>
        <HideIfEmpty
          checks={selectableNfts}
          render={(selectableNfts) => (
            <SelectableNftGroupsAndFiltersContainer
              nfts={selectableNfts}
              availableFilters={[NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS]}
              btnLabel={t(hasNewOfferPending() ? 'profile.offerButton.label' : 'profile.listingButton.label')}
              hideOwner={true}
              onButtonClick={onButtonClick}
            />
          )}
        />
        <ShowIfEmpty checks={selectableNfts}>
          <ProfileNftsEmpty user={user} />
        </ShowIfEmpty>
      </ProfileNavigationLayout>
      <NextIntlClientProvider messages={messages} locale={'en'}>
        <NewOfferDiscardModal
          open={showDiscardModal}
          onClose={() => setShowDiscardModal(false)}
          onDiscard={discardOffer}
        />
      </NextIntlClientProvider>
    </>
  )
}
