'use client'
import { NftDetails } from '@echo/ui/components/nft/details/nft-details'
import { NewOfferSliderManager } from '@echo/ui/components/offer/new/new-offer-slider-manager'
import { messages } from '@echo/ui/messages/en'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { Listing } from '@echo/ui/types/model/listing'
import { Nft } from '@echo/ui/types/model/nft'
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
      <NewOfferSliderManager user={user} />
    </NextIntlClientProvider>
  )
}
