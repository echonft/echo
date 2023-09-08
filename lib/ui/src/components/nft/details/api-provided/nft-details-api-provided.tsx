'use client'
import { messages } from '../../../../messages/en'
import { NftDetails } from '../nft-details'
import { ListingResponse, NftResponse } from '@echo/api'
import { mapListing, mapNft } from '@echo/ui-model'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { NextIntlClientProvider } from 'next-intl'
import { map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

dayjs.extend(timezone)

interface Props {
  nftResponse: Partial<NftResponse>
  listingsResponses: Array<Partial<ListingResponse>>
}

export const NftDetailsApiProvided: FunctionComponent<Props> = ({ nftResponse, listingsResponses }) => {
  const nft = useMemo(() => mapNft(nftResponse), [nftResponse])
  const listings = useMemo(() => map(mapListing, listingsResponses), [listingsResponses])

  return (
    <NextIntlClientProvider timeZone={dayjs.tz.guess()} messages={messages} locale={'en'}>
      <section className={clsx('w-full', 'pt-12')}>
        <NftDetails nft={nft} listings={listings} />
      </section>
    </NextIntlClientProvider>
  )
}
