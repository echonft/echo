'use client'
import { NavigationListings } from '../../../constants/navigation-item'
import { messages } from '../../../messages/en'
import { CollectionNavigationLayout } from '../layout/collection-navigation-layout'
import { CollectionListingsContainer } from '../listing/collection-listings-container'
import { ListingResponse } from '@echo/api'
import { mapListing } from '@echo/ui-model'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { NextIntlClientProvider } from 'next-intl'
import { map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

dayjs.extend(timezone)

interface Props {
  collectionSlug: string
  responses: Array<Partial<ListingResponse>>
}

export const CollectionListingsApiProvided: FunctionComponent<Props> = ({ collectionSlug, responses }) => {
  const mappedListings = useMemo(() => map(mapListing, responses), [responses])

  return (
    <NextIntlClientProvider timeZone={dayjs.tz.guess()} messages={messages} locale={'en'}>
      <CollectionNavigationLayout slug={collectionSlug} activeNavigationItem={NavigationListings}>
        <CollectionListingsContainer collectionSlug={collectionSlug} listings={mappedListings} />
      </CollectionNavigationLayout>
    </NextIntlClientProvider>
  )
}
