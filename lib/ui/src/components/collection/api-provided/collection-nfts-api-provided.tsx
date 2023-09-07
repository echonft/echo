'use client'
import { messages } from '../../../messages/en'
import { CollectionNftsAndFiltersContainer } from '../collection-nfts-and-filters-container'
import { NftResponse } from '@echo/api'
import { getTraitsForNfts, mapNft } from '@echo/ui-model'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { NextIntlClientProvider } from 'next-intl'
import { map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

dayjs.extend(timezone)

interface Props {
  collectionSlug: string
  responses: Array<Partial<NftResponse>>
}

export const CollectionNftsApiProvided: FunctionComponent<Props> = ({ collectionSlug, responses }) => {
  // TODO we might have to show the skeleton if this is slow
  const mappedNfts = useMemo(() => map(mapNft, responses), [responses])
  const traits = useMemo(() => getTraitsForNfts(mappedNfts), [mappedNfts])

  return (
    <NextIntlClientProvider timeZone={dayjs.tz.guess()} messages={messages} locale={'en'}>
      <CollectionNftsAndFiltersContainer
        collectionSlug={collectionSlug}
        nfts={mappedNfts}
        traits={traits}
        // TODO
        onMakeOfferForNft={() => undefined}
      />
    </NextIntlClientProvider>
  )
}
