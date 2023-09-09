'use client'
import { NavigationItems } from '../../../constants/navigation-item'
import { NftFilterTraits } from '../../../constants/nft-filter'
import { messages } from '../../../messages/en'
import { SelectableNftsAndFiltersContainer } from '../../nft/layout/container/selectable-nfts-and-filters-container'
import { CollectionNavigationLayout } from '../layout/collection-navigation-layout'
import { NftResponse } from '@echo/api'
import { mapNft, Nft } from '@echo/ui-model'
import { NonEmptyArray } from '@echo/utils'
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
  const mappedNfts = useMemo(() => map(mapNft, responses), [responses]) as NonEmptyArray<Nft>

  return (
    <NextIntlClientProvider timeZone={dayjs.tz.guess()} messages={messages} locale={'en'}>
      <CollectionNavigationLayout slug={collectionSlug} activeNavigationItem={NavigationItems}>
        <SelectableNftsAndFiltersContainer nfts={mappedNfts} availableFilters={[NftFilterTraits]} />
      </CollectionNavigationLayout>
    </NextIntlClientProvider>
  )
}
