import { NavigationItems } from '../../../../constants/navigation-item'
import { NftFilterTraits } from '../../../../constants/nft-filter'
import { getTranslator } from '../../../../messages/get-translator'
import { NftsAndFiltersContainerSkeleton } from '../../../nft/layout/container/skeleton/nfts-and-filters-container-skeleton'
import { CollectionNavigationLayoutSkeleton } from '../../layout/skeleton/collection-navigation-layout-skeleton'
import { FunctionComponent } from 'react'

export const CollectionNftsSkeleton: FunctionComponent = () => {
  const t = getTranslator()
  return (
    <CollectionNavigationLayoutSkeleton activeNavigationItem={NavigationItems}>
      <NftsAndFiltersContainerSkeleton availableFilters={[NftFilterTraits]} btnLabel={t('collection.button.label')} />
    </CollectionNavigationLayoutSkeleton>
  )
}
