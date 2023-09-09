'use client'
import { NavigationListings } from '../../../constants/navigation-item'
import { messages } from '../../../messages/en'
import { ListingRowsContainer } from '../../listing/layout/container/listing-rows-container'
import { UserNavigationLayout } from '../layout/user-navigation-layout'
import { ListingResponse } from '@echo/api'
import { mapListing } from '@echo/ui-model'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { NextIntlClientProvider } from 'next-intl'
import { map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

dayjs.extend(timezone)

interface Props {
  username: string
  responses: Array<Partial<ListingResponse>>
}

export const UserListingsApiProvided: FunctionComponent<Props> = ({ username, responses }) => {
  const mappedListings = useMemo(() => map(mapListing, responses), [responses])

  return (
    <NextIntlClientProvider timeZone={dayjs.tz.guess()} messages={messages} locale={'en'}>
      <UserNavigationLayout username={username} activeNavigationItem={NavigationListings}>
        <ListingRowsContainer listings={mappedListings} />
      </UserNavigationLayout>
    </NextIntlClientProvider>
  )
}
