'use client'
import { cancelListingFetcher } from '@echo/api/services/fetcher/cancel-listing-fetcher'
import { type AuthUser } from '@echo/model/types/auth-user'
import type { Listing } from '@echo/model/types/listing'
import { CalloutManager } from '@echo/ui/components/layout/callout/callout-manager'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { ListingDetails } from '@echo/ui/components/listing/details/listing-details'
import { messages } from '@echo/ui/messages/en'
import { NextIntlClientProvider } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  listing: Listing
  user: AuthUser | undefined
}

export const ListingDetailsApiProvided: FunctionComponent<Props> = ({ listing, user }) => {
  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      <PaddedContainer>
        <ListingDetails listing={listing} user={user} cancelListingFetcher={cancelListingFetcher} />
        <CalloutManager />
      </PaddedContainer>
    </NextIntlClientProvider>
  )
}
