import { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { HomeCollections } from '@echo/ui/components/home/collection/home-collections'
import { DiscordTile } from '@echo/ui/components/home/discord/discord-tile'
import { HomeHero } from '@echo/ui/components/home/hero/home-hero'
import { HomeDiscordTileLayout } from '@echo/ui/components/home/layout/home-discord-tile-layout'
import { HomeLayout } from '@echo/ui/components/home/layout/home-layout'
import { RecentSwaps } from '@echo/ui/components/home/swap/recent-swaps'
import type { CollectionTileDetails } from '@echo/ui/types/model/collection-tile-details'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { head, tail } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  collections: NonEmptyArray<CollectionTileDetails>
  offers: OfferResponse[]
}

export const Home: FunctionComponent<Props> = ({ collections, offers }) => {
  return (
    <HomeLayout>
      <HomeHero collection={head(collections)} />
      <HomeCollections collections={tail(collections)} />
      <HideIfEmpty checks={offers} render={(offers) => <RecentSwaps offers={offers} />} />
      <HomeDiscordTileLayout>
        <DiscordTile />
      </HomeDiscordTileLayout>
    </HomeLayout>
  )
}
