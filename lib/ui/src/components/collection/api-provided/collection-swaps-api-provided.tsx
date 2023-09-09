'use client'
import { NavigationSwaps } from '../../../constants/navigation-item'
import { messages } from '../../../messages/en'
import { CollectionNavigationLayout } from '../layout/collection-navigation-layout'
import { CollectionSwapsContainer } from '../swap/collection-swaps-container'
import { OfferResponse } from '@echo/api'
import { mapOffer } from '@echo/ui-model'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { NextIntlClientProvider } from 'next-intl'
import { map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

dayjs.extend(timezone)

interface Props {
  collectionSlug: string
  responses: Array<Partial<OfferResponse>>
}

export const CollectionSwapsApiProvided: FunctionComponent<Props> = ({ collectionSlug, responses }) => {
  const mappedOffers = useMemo(() => map(mapOffer, responses), [responses])

  return (
    <NextIntlClientProvider timeZone={dayjs.tz.guess()} messages={messages} locale={'en'}>
      <CollectionNavigationLayout slug={collectionSlug} activeNavigationItem={NavigationSwaps}>
        <CollectionSwapsContainer collectionSlug={collectionSlug} offers={mappedOffers} />
      </CollectionNavigationLayout>
    </NextIntlClientProvider>
  )
}
