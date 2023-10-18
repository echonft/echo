import { CollectionNavigationLayoutSkeleton } from '@echo/ui/components/collection/layout/skeleton/collection-navigation-layout-skeleton'
import { NftsAndFiltersContainerSkeleton } from '@echo/ui/components/nft/layout/container/skeleton/nfts-and-filters-container-skeleton'
import { NavigationItems } from '@echo/ui/constants/navigation-item'
import { NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { type FunctionComponent } from 'react'

export const CollectionNftsSkeleton: FunctionComponent = () => {
  const t = getTranslator()
  return (
    <CollectionNavigationLayoutSkeleton activeNavigationItem={NavigationItems}>
      <NftsAndFiltersContainerSkeleton availableFilters={[NftFilterTraits]} btnLabel={t('collection.button.create')} />
    </CollectionNavigationLayoutSkeleton>
  )
}
