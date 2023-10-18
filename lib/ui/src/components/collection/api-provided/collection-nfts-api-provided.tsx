'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Nft } from '@echo/model/types/nft'
import { CollectionNavigationLayout } from '@echo/ui/components/collection/layout/collection-navigation-layout'
import { SelectableNftsAndFiltersContainer } from '@echo/ui/components/nft/layout/container/selectable-nfts-and-filters-container'
import { NavigationItems } from '@echo/ui/constants/navigation-item'
import { NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { mapNftToOfferItem } from '@echo/ui/mappers/map-nft-to-offer-item'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { any, equals, head, map, path, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  collectionSlug: string
  nfts: Nft[]
  user: AuthUser | undefined
}

export const CollectionNftsApiProvided: FunctionComponent<Props> = ({ collectionSlug, nfts, user }) => {
  const t = getTranslator()
  const { setReceiverItems, setSenderItems, hasNewOfferPending } = useNewOfferStore()

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
    <CollectionNavigationLayout slug={collectionSlug} activeNavigationItem={NavigationItems} user={user}>
      <SelectableNftsAndFiltersContainer
        nfts={nfts}
        availableFilters={[NftFilterTraits]}
        btnLabel={t(hasNewOfferPending() ? 'collection.button.edit' : 'collection.button.create')}
        onButtonClick={onMakeOffer}
      />
    </CollectionNavigationLayout>
  )
}
