'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Nft } from '@echo/model/types/nft'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { CollectionNavigationLayout } from '@echo/ui/components/collection/layout/collection-navigation-layout'
import { CollectionNftsEmpty } from '@echo/ui/components/collection/nft/empty/collection-nfts-empty'
import { SelectableNftsAndFiltersContainer } from '@echo/ui/components/nft/layout/container/selectable-nfts-and-filters-container'
import { NAVIGATION_ITEMS } from '@echo/ui/constants/navigation-item'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import { NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { setSelectableNftActionDisabledPropFromAuthUser } from '@echo/ui/helpers/nft/set-selectable-nft-action-disabled-prop-from-auth-user'
import { setSelectableNftSelectionDisabledPropFromAuthUser } from '@echo/ui/helpers/nft/set-selectable-nft-selection-disabled-prop-from-auth-user'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { mapNftToOfferItem } from '@echo/ui/mappers/to-api/map-nft-to-offer-item'
import { getTranslator } from '@echo/ui/messages/get-translator'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { any, assoc, equals, head, map, path, pipe } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  collectionSlug: string
  nfts: Nft[]
  user: AuthUser | undefined
}

export const CollectionNftsApiProvided: FunctionComponent<Props> = ({ collectionSlug, nfts, user }) => {
  const t = getTranslator()
  const { setReceiverItems, setSenderItems, hasNewOfferPending } = useNewOfferStore()
  const selectableNfts = useMemo(() => {
    if (hasNewOfferPending()) {
      return map<Nft, SelectableNft>(
        pipe<[Nft], SelectableNft, SelectableNft>(
          assoc('actionDisabled', true),
          setSelectableNftSelectionDisabledPropFromAuthUser(user)
        ),
        nfts
      )
    }
    return map<Nft, SelectableNft>(
      pipe<[Nft], SelectableNft, SelectableNft, SelectableNft>(
        assoc('action', NFT_ACTION_OFFER),
        setSelectableNftSelectionDisabledPropFromAuthUser(user),
        setSelectableNftActionDisabledPropFromAuthUser(user)
      ),
      nfts
    )
  }, [nfts, user, hasNewOfferPending])

  const onMakeOffer = (nfts: Nft[]) => {
    if (isNonEmptyArray(nfts)) {
      const ownerWallet = pipe(head, path(['owner', 'wallet']))(nfts)
      // TODO We allow selection from multiple users right now, this should change
      if (any(equals(ownerWallet), user?.wallets ?? [])) {
        setSenderItems(map(mapNftToOfferItem, nfts))
      } else {
        setReceiverItems(map(mapNftToOfferItem, nfts))
      }
    }
  }

  return (
    <CollectionNavigationLayout slug={collectionSlug} activeNavigationItem={NAVIGATION_ITEMS} user={user}>
      <HideIfEmpty
        checks={selectableNfts}
        render={(selectableNfts) => (
          <SelectableNftsAndFiltersContainer
            nfts={selectableNfts}
            availableFilters={[NFT_FILTER_TRAITS]}
            btnLabel={t(hasNewOfferPending() ? 'collection.button.edit' : 'collection.button.create')}
            user={user}
            onButtonClick={onMakeOffer}
          />
        )}
      />
      <ShowIfEmpty checks={selectableNfts}>
        <CollectionNftsEmpty />
      </ShowIfEmpty>
    </CollectionNavigationLayout>
  )
}
