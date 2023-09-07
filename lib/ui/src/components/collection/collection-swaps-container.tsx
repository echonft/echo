'use client'
import { links } from '../../helpers/links'
import { NavigationPills } from '../base/navigation/navigation-pills'
import { PaddedContainer } from '../layout/padded-container'
import { OfferCollectionRow } from '../offer/offer-collection-row'
import { NavigationItem, Offer } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  collectionSlug: string
  offers: Array<Offer>
}

export const CollectionSwapsContainer: FunctionComponent<Props> = ({ collectionSlug, offers }) => {
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
        <NavigationPills items={navigationItems} selectedItemId={'swaps'} />
      </div>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'w-full', 'gap-12')}>
        {map(
          (offer) => (
            <OfferCollectionRow key={offer.id} offer={offer} />
          ),
          offers
        )}
      </div>
    </PaddedContainer>
  )
}
