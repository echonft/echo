'use client'
import { messages } from '../../../messages/en'
import { CollectionListingsContainer } from '../collection-listings-container'
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
  // TODO we might have to show the skeleton if this is slow
  const mappedListings = useMemo(() => map(mapListing, responses), [responses])

  return (
    <NextIntlClientProvider timeZone={dayjs.tz.guess()} messages={messages} locale={'en'}>
      <CollectionListingsContainer collectionSlug={collectionSlug} listings={mappedListings} />
    </NextIntlClientProvider>
  )
}
