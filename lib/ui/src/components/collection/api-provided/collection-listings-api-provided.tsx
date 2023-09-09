'use client'
import { NavigationListings } from '../../../constants/navigation-item'
import { messages } from '../../../messages/en'
import { ListingRowsContainer } from '../../listing/layout/container/listing-rows-container'
import { CollectionNavigationLayout } from '../layout/collection-navigation-layout'
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
        <ListingRowsContainer listings={mappedListings} />
      </CollectionNavigationLayout>
    </NextIntlClientProvider>
  )
}
