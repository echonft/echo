import { CollectionOfferButton } from '../../collection/collection-offer-button'
import { PaddedContainer } from '../../layout/padded-container'
import { NavigationPillsSkeleton } from '../base/navigation-pills-skeleton'
import { NftThumbnailSkeleton } from '../nft/nft-thumbnail-skeleton'
import { TraitFilterPanelSkeleton } from './filters/trait-filter-panel-skeleton'
import { NavigationItem } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const CollectionNftsSkeleton: FunctionComponent = () => {
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
        <NavigationPillsSkeleton items={navigationItems} selectedItemId={'items'} />
      </div>
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'grow', 'gap-8')}>
        <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4')}>
          <CollectionOfferButton count={0} />
          <TraitFilterPanelSkeleton />
        </div>
        <div className={clsx('flex', 'flex-row', 'self-stretch', 'grow', 'flex-wrap', 'gap-6', 'relative')}>
          <NftThumbnailSkeleton />
          <NftThumbnailSkeleton />
          <NftThumbnailSkeleton />
          <NftThumbnailSkeleton />
        </div>
      </div>
    </PaddedContainer>
  )
}
