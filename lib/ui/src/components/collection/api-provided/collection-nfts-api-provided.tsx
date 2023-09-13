'use client'
import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { CollectionNavigationLayout } from '@echo/ui/components/collection/layout/collection-navigation-layout'
import { SelectableNftsAndFiltersContainer } from '@echo/ui/components/nft/layout/container/selectable-nfts-and-filters-container'
import { NavigationItems } from '@echo/ui/constants/navigation-item'
import { NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { mapNft } from '@echo/ui/mappers/from-api/map-nft'
import type { Nft } from '@echo/ui/types/model/nft'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  collectionSlug: string
  responses: Array<Partial<NftResponse>>
}

export const CollectionNftsApiProvided: FunctionComponent<Props> = ({ collectionSlug, responses }) => {
  const t = useTranslations('collection.button')
  const mappedNfts = useMemo(() => map(mapNft, responses), [responses]) as NonEmptyArray<Nft>

  return (
    <CollectionNavigationLayout slug={collectionSlug} activeNavigationItem={NavigationItems}>
      <SelectableNftsAndFiltersContainer nfts={mappedNfts} availableFilters={[NftFilterTraits]} btnLabel={t('label')} />
    </CollectionNavigationLayout>
  )
}
