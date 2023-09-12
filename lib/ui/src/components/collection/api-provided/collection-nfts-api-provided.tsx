'use client'
import { NavigationItems } from '../../../constants/navigation-item'
import { NftFilterTraits } from '../../../constants/nft-filter'
import { SelectableNftsAndFiltersContainer } from '../../nft/layout/container/selectable-nfts-and-filters-container'
import { CollectionNavigationLayout } from '../layout/collection-navigation-layout'
import type { NftResponse } from '@echo/api/types'
import { mapNft, Nft } from '@echo/ui-model'
import type { NonEmptyArray } from '@echo/utils/types'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

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
