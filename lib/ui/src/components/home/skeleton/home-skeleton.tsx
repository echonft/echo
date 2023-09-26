import { HomeCollectionsSkeleton } from '@echo/ui/components/home/collection/skeleton/home-collections-skeleton'
import { DiscordTile } from '@echo/ui/components/home/discord/discord-tile'
import { HomeHeroSkeleton } from '@echo/ui/components/home/hero/skeleton/home-hero-skeleton'
import { HomeDiscordTileLayout } from '@echo/ui/components/home/layout/home-discord-tile-layout'
import { HomeLayout } from '@echo/ui/components/home/layout/home-layout'
import { RecentSwapsSkeleton } from '@echo/ui/components/home/swap/skeleton/recent-swaps-skeleton'
import type { FunctionComponent } from 'react'

export const HomeSkeleton: FunctionComponent = () => {
  return (
    <HomeLayout>
      <HomeHeroSkeleton />
      <HomeCollectionsSkeleton />
      <RecentSwapsSkeleton />
      <HomeDiscordTileLayout>
        <DiscordTile />
      </HomeDiscordTileLayout>
    </HomeLayout>
  )
}
