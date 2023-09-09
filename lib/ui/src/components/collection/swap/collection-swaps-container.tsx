'use client'
import { links } from '../../../constants/links'
import { NavigationItem } from '../../../types/navigation-item'
import { NavigationPills } from '../../layout/navigation/navigation-pills'
import { PaddedContainer } from '../../layout/padded-container'
import { OfferCollectionRow } from '../../offer/row/offer-collection-row'
import { Offer } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  collectionSlug: string
  offers: Array<Offer>
}

export const CollectionSwapsContainer: FunctionComponent<Props> = ({ collectionSlug, offers }) => {
  const t = useTranslations('navigation')
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
        <NavigationPills items={navigationItems} activeItem={'swaps'} />
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
