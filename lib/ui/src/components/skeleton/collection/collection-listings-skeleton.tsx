import { PaddedContainer } from '../../layout/padded-container'
import { NavigationPillsSkeleton } from '../base/navigation-pills-skeleton'
import { ListingRowSkeleton } from '../listing/listing-row-skeleton'
import { NavigationItem } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const CollectionListingsSkeleton: FunctionComponent = () => {
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
        <NavigationPillsSkeleton items={navigationItems} selectedItemId={'listings'} />
      </div>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'w-full', 'gap-12')}>
        <ListingRowSkeleton />
      </div>
    </PaddedContainer>
  )
}
