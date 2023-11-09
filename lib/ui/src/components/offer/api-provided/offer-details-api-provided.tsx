'use client'
import { acceptOfferFetcher } from '@echo/api/services/fetcher/accept-offer-fetcher'
import { cancelOfferFetcher } from '@echo/api/services/fetcher/cancel-offer-fetcher'
import { getOfferSignatureFetcher } from '@echo/api/services/fetcher/get-offer-signature-fetcher'
import { rejectOfferFetcher } from '@echo/api/services/fetcher/reject-offer-fetcher'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Offer } from '@echo/model/types/offer'
import { CalloutManager } from '@echo/ui/components/layout/callout/callout-manager'
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
          getOfferSignatureFetcher={getOfferSignatureFetcher}
          acceptOfferFetcher={acceptOfferFetcher}
          rejectOfferFetcher={rejectOfferFetcher}
          cancelOfferFetcher={cancelOfferFetcher}
        />
      </PaddedContainer>
      <CalloutManager />
    </NextIntlClientProvider>
  )
}
