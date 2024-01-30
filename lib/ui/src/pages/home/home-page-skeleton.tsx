import { HomeCollectionsSkeleton } from '@echo/ui/pages/home/collection/skeleton/home-collections-skeleton'
import { DiscordTile } from '@echo/ui/pages/home/discord/discord-tile'
import { HomeHeroSkeleton } from '@echo/ui/pages/home/hero/skeleton/home-hero-skeleton'
import { HomeDiscordTileLayout } from '@echo/ui/pages/home/layout/home-discord-tile-layout'
import { HomeLayout } from '@echo/ui/pages/home/layout/home-layout'
import { HomeSectionsLayout } from '@echo/ui/pages/home/layout/home-sections-layout'
import { RecentSwapsSkeleton } from '@echo/ui/pages/home/swap/skeleton/recent-swaps-skeleton'
import { type FunctionComponent } from 'react'

export const HomePageSkeleton: FunctionComponent = () => {
  return (
    <HomeLayout>
      <HomeHeroSkeleton />
      <HomeSectionsLayout>
        <HomeCollectionsSkeleton />
        <RecentSwapsSkeleton />
        <HomeDiscordTileLayout>
          <DiscordTile />
        </HomeDiscordTileLayout>
      </HomeSectionsLayout>
    </HomeLayout>
  )
}
