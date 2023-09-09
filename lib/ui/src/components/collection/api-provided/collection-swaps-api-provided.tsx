'use client'
import { NavigationSwaps } from '../../../constants/navigation-item'
import { messages } from '../../../messages/en'
import { CollectionOfferRowsContainer } from '../../offer/layout/container/collection-offer-rows-container'
import { CollectionNavigationLayout } from '../layout/collection-navigation-layout'
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
        <CollectionOfferRowsContainer offers={mappedOffers} />
      </CollectionNavigationLayout>
    </NextIntlClientProvider>
  )
}
