import { PaddedContainer } from '../../layout/padded-container'
import { NavigationPillsSkeleton } from '../base/navigation-pills-skeleton'
import { OfferCollectionRowSkeleton } from '../offer/offer-collection-row-skeleton'
import { NavigationItem } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const CollectionSwapsSkeleton: FunctionComponent = () => {
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
        <NavigationPillsSkeleton items={navigationItems} selectedItemId={'swaps'} />
      </div>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'w-full', 'gap-12')}>
        <OfferCollectionRowSkeleton />
      </div>
    </PaddedContainer>
  )
}
