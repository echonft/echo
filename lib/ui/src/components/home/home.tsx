import type { Offer } from '@echo/model/types/offer'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { HomeCollections } from '@echo/ui/components/home/collection/home-collections'
import { DiscordTile } from '@echo/ui/components/home/discord/discord-tile'
import { HomeHero } from '@echo/ui/components/home/hero/home-hero'
import { HomeDiscordTileLayout } from '@echo/ui/components/home/layout/home-discord-tile-layout'
import { HomeSectionsLayout } from '@echo/ui/components/home/layout/home-sections-layout'
import { RecentSwaps } from '@echo/ui/components/home/swap/recent-swaps'
import type { CollectionTileDetails } from '@echo/ui/types/collection-tile-details'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { clsx } from 'clsx'
import { head, tail } from 'ramda'
import type { FunctionComponent } from 'react'

export interface HomeProps {
  collections: NonEmptyArray<CollectionTileDetails>
  offers: Offer[]
}

export const Home: FunctionComponent<HomeProps> = ({ collections, offers }) => {
  return (
    <div className={clsx('min-h-full')}>
      <HomeHero collection={head(collections)} />
      <HomeSectionsLayout>
        <HomeCollections collections={tail(collections)} />
        <HideIfEmpty checks={offers} render={(offers) => <RecentSwaps offers={offers} />} />
        <HomeDiscordTileLayout>
          <DiscordTile />
        </HomeDiscordTileLayout>
      </HomeSectionsLayout>
    </div>
  )
}
