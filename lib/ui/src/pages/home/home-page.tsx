import { type Collection } from '@echo/model/types/collection'
import { HomeCollections } from '@echo/ui/pages/home/collection/home-collections'
import { DiscordTile } from '@echo/ui/pages/home/discord/discord-tile'
import { HomeHero } from '@echo/ui/pages/home/hero/home-hero'
import { HomeDiscordTileLayout } from '@echo/ui/pages/home/layout/home-discord-tile-layout'
import { HomeLayout } from '@echo/ui/pages/home/layout/home-layout'
import { HomeSectionsLayout } from '@echo/ui/pages/home/layout/home-sections-layout'
import { RecentSwaps } from '@echo/ui/pages/home/swap/recent-swaps'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { head, tail } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  collections: Collection[]
  offers: OfferWithRole[]
}

export const HomePage: FunctionComponent<Props> = ({ collections, offers }) => {
  return (
    <HomeLayout>
      <HomeHero collection={head<Collection, Collection>(collections as NonEmptyArray<Collection>)} />
      <HomeSectionsLayout>
        <HomeCollections collections={tail(collections)} />
        <RecentSwaps offers={offers} />
        <HomeDiscordTileLayout>
          <DiscordTile />
        </HomeDiscordTileLayout>
      </HomeSectionsLayout>
    </HomeLayout>
  )
}
