'use client'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import { messages } from '@echo/ui/messages/en'
import type { AuthUser } from '@echo/ui/types/model/auth-user'
import { Offer } from '@echo/ui/types/model/offer'
import { NextIntlClientProvider } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  offer: Offer
  user: AuthUser
}

export const OfferDetailsApiProvided: FunctionComponent<Props> = ({ offer, user }) => {
  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      <PaddedContainer>
        <OfferDetails offer={offer} isCreator={user.username === offer.sender?.username} token={user.sessionToken} />
      </PaddedContainer>
    </NextIntlClientProvider>
  )
}
