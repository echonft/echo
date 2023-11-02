'use client'
import { createOfferFetcher } from '@echo/api/services/fetcher/create-offer-fetcher'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Listing } from '@echo/model/types/listing'
import { type Nft } from '@echo/model/types/nft'
import { CalloutManager } from '@echo/ui/components/layout/callout/callout-manager'
import { NftDetails } from '@echo/ui/components/nft/details/nft-details'
import { NewOfferSliderManager } from '@echo/ui/components/offer/new/new-offer-slider-manager'
import { messages } from '@echo/ui/messages/en'
import { NextIntlClientProvider } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
  listings: Listing[]
  user: AuthUser | undefined
}

export const NftDetailsApiProvided: FunctionComponent<Props> = ({ nft, listings, user }) => {
  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      <NftDetails nft={nft} listings={listings} />
      <NewOfferSliderManager createOfferFetcher={createOfferFetcher} user={user} />
      <CalloutManager />
    </NextIntlClientProvider>
  )
}
