'use client'
import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import { mapOfferFromResponse } from '@echo/ui/mappers/from-api/map-offer-from-response'
import { messages } from '@echo/ui/messages/en'
import type { AuthUser } from '@echo/ui/types/model/auth-user'
import { NextIntlClientProvider } from 'next-intl'
import type { FunctionComponent } from 'react'
import { useMemo } from 'react'

interface Props {
  offerResponse: OfferResponse
  user: AuthUser
}

export const OfferDetailsApiProvided: FunctionComponent<Props> = ({ offerResponse, user }) => {
  const offer = useMemo(() => mapOfferFromResponse(offerResponse), [offerResponse])
  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      <OfferDetails
        offer={offer}
        isReceiver={user.username === offerResponse.receiver?.username}
        token={user.sessionToken}
      />
    </NextIntlClientProvider>
  )
}
