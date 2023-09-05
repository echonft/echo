import { CollectionNftsContainer } from '../../collection/collection-nfts-container'
import { CollectionOfferButton } from '../../collection/collection-offer-button'
import { PaddedContainer } from '../../layout/padded-container'
import { NavigationPillsSkeleton } from '../base/navigation-pills-skeleton'
import { TraitFilterPanelSkeleton } from './filters/trait-filter-panel-skeleton'
import { NavigationItem } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  selectedNavigationItemId: 'items' | 'listings' | 'swaps'
}

export const CollectionNftsSkeleton: FunctionComponent<Props> = ({ selectedNavigationItemId }) => {
  const t = useTranslations('collection.navigation')
  const navigationItems: NavigationItem[] = [
    {
      id: 'items',
      name: t('items'),
      path: '#'
    },
    {
      id: 'listings',
      name: t('listings'),
      path: '#'
    },
    {
      id: 'swaps',
      name: t('swaps'),
      path: '#'
    }
  ]

  return (
    <PaddedContainer>
      <div className={'py-12'}>
        <NavigationPillsSkeleton items={navigationItems} selectedItemId={selectedNavigationItemId} />
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
