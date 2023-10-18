'use client'
import { getOfferFetcher } from '@echo/api/services/fetcher/get-offer-fetcher'
import { updateOfferFetcher } from '@echo/api/services/fetcher/update-offer-fetcher'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Offer } from '@echo/model/types/offer'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import { messages } from '@echo/ui/messages/en'
import { NextIntlClientProvider } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  offer: Offer
  user: AuthUser
}

export const OfferDetailsApiProvided: FunctionComponent<Props> = ({ offer, user }) => {
  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      <PaddedContainer>
        <OfferDetails
          offer={offer}
          isCreator={user.username === offer.sender?.username}
          token={user.sessionToken}
          getOfferFetcher={getOfferFetcher}
          updateOfferFetcher={updateOfferFetcher}
        />
      </PaddedContainer>
    </NextIntlClientProvider>
  )
}
