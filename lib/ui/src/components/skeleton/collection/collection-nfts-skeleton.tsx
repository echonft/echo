import { NavigationPills } from '../../base/navigation/navigation-pills'
import { NAVIGATION_ITEM_IDS } from '../../collection/collection-nfts-and-filters-container'
import { CollectionNftsContainer } from '../../collection/collection-nfts-container'
import { CollectionOfferButton } from '../../collection/collection-offer-button'
import { PaddedContainer } from '../../layout/padded-container'
import { TraitFilterPanelSkeleton } from './filters/trait-filter-panel-skeleton'
import { NavigationItem } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  selectedNavigationItemId: (typeof NAVIGATION_ITEM_IDS)[number]
}

export const CollectionNftsSkeleton: FunctionComponent<Props> = ({ selectedNavigationItemId }) => {
  const t = useTranslations('collection.navigation')
  const navigationItems: NavigationItem[] = [
    {
      id: NAVIGATION_ITEM_IDS[0]!,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      name: t(NAVIGATION_ITEM_IDS[0]!),
      path: '#'
    },
    {
      id: NAVIGATION_ITEM_IDS[1]!,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      name: t(NAVIGATION_ITEM_IDS[1]!),
      path: '#'
    },
    {
      id: NAVIGATION_ITEM_IDS[2]!,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      name: t(NAVIGATION_ITEM_IDS[2]!),
      path: '#'
    }
  ]

  return (
    <PaddedContainer>
      <div className={'py-12'}>
        <NavigationPills items={navigationItems} selectedItemId={selectedNavigationItemId} />
      </div>
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'grow', 'gap-8')}>
        <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4')}>
          <CollectionOfferButton count={0} />
          <TraitFilterPanelSkeleton />
        </div>
        <CollectionNftsContainer nfts={[]} />
      </div>
    </PaddedContainer>
  )
}
