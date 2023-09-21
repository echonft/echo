'use client'
import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { CollectionNavigationLayout } from '@echo/ui/components/collection/layout/collection-navigation-layout'
import { SelectableNftsAndFiltersContainer } from '@echo/ui/components/nft/layout/container/selectable-nfts-and-filters-container'
import { NavigationItems } from '@echo/ui/constants/navigation-item'
import { NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { mapNftFromResponse } from '@echo/ui/mappers/from-api/map-nft-from-response'
import { mapNftToOfferItem } from '@echo/ui/mappers/map-nft-to-offer-item'
import type { Nft } from '@echo/ui/types/model/nft'
import { isIn } from '@echo/utils/fp/is-in'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { useTranslations } from 'next-intl'
import { filter, map, pipe, prop } from 'ramda'
import { type FunctionComponent, useCallback, useMemo } from 'react'

interface Props {
  collectionSlug: string
  responses: Array<Partial<NftResponse>>
}

export const CollectionNftsApiProvided: FunctionComponent<Props> = ({ collectionSlug, responses }) => {
  const t = useTranslations('collection.button')
  const mappedNfts = useMemo(() => map(mapNftFromResponse, responses), [responses]) as NonEmptyArray<Nft>
  const { setReceiverItems, hasNewOfferPending } = useNewOfferStore()

  const onMakeOffer = useCallback(
    (nftIds: string[]) =>
      setReceiverItems(pipe(filter(pipe(prop('id'), isIn(nftIds))), map(mapNftToOfferItem))(mappedNfts)),
    [mappedNfts, setReceiverItems]
  )

  return (
    <CollectionNavigationLayout slug={collectionSlug} activeNavigationItem={NavigationItems}>
      <SelectableNftsAndFiltersContainer
        nfts={mappedNfts}
        availableFilters={[NftFilterTraits]}
        btnLabel={t(hasNewOfferPending() ? 'edit' : 'create')}
        onMakeOffer={onMakeOffer}
      />
    </CollectionNavigationLayout>
  )
}
