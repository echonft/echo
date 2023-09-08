'use client'
import { links } from '../../constants/links'
import { NavigationPills } from '../base/navigation/navigation-pills'
import { PaddedContainer } from '../layout/padded-container'
import { ListingRow } from '../listing/row/listing-row'
import { Listing, NavigationItem } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  collectionSlug: string
  listings: Array<Listing>
}

export const CollectionListingsContainer: FunctionComponent<Props> = ({ collectionSlug, listings }) => {
  const t = useTranslations('collection.navigation')
  const navigationItems: NavigationItem[] = [
    {
      id: 'items',
      name: t('items'),
      path: links.collection.collectionItemsLink(collectionSlug)
    },
    {
      id: 'listings',
      name: t('listings'),
      path: links.collection.collectionListingsLink(collectionSlug)
    },
    {
      id: 'swaps',
      name: t('swaps'),
      path: links.collection.collectionSwapsLink(collectionSlug)
    }
  ]

  return (
    <PaddedContainer>
      <div className={'py-12'}>
        <NavigationPills items={navigationItems} selectedItemId={'listings'} />
      </div>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'w-full', 'gap-12')}>
        {map(
          (listing) => (
            <ListingRow key={listing.id} listing={listing} />
          ),
          listings
        )}
      </div>
    </PaddedContainer>
  )
}
